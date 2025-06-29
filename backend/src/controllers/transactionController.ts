import { Request, Response } from 'express';
import Transaction from '../models/Transaction';

export const getTransactions = async (req: Request, res: Response) => {
  try {
    const { page = 1, limit = 10, category, status, search } = req.query;

    const query: any = {};

    if (category) query.category = category;
    if (status) query.status = status;

    if (search) {
      const searchRegex = new RegExp(search.toString(), 'i');
      query.$or = [
        { category: searchRegex },
        { status: searchRegex },
        { user_id: searchRegex }
      ];
    }

    const transactions = await Transaction.find(query)
      .skip((+page - 1) * +limit)
      .limit(+limit)
      .sort({ date: -1 });

    const total = await Transaction.countDocuments(query);

    res.status(200).json({
      data: transactions,
      page: +page,
      limit: +limit,
      total
    });
  } catch (err) {
    res.status(500).json({ message: 'Failed to fetch transactions', error: err });
  }
};
export const getTransactionSummary = async (req: Request, res: Response) => {
  try {
    const revenueAgg = await Transaction.aggregate([
      { $match: { category: 'Revenue' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const expenseAgg = await Transaction.aggregate([
      { $match: { category: 'Expense' } },
      { $group: { _id: null, total: { $sum: '$amount' } } },
    ]);

    const revenue = revenueAgg[0]?.total || 0;
    const expense = expenseAgg[0]?.total || 0;

    res.status(200).json({ revenue, expense });
  } catch (err) {
    console.error('Summary fetch error:', err);
    res.status(500).json({ message: 'Failed to fetch summary', error: err });
  }
};
