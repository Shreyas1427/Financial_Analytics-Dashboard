import { Request, Response } from 'express';
import Transaction from '../models/Transaction';
import { generateCSV } from '../utils/csvExporter';

export const exportTransactions = async (req: Request, res: Response): Promise<void> => {
  try {
    const { fields } = req.query;

    if (!fields) {
      res.status(400).json({ message: 'Fields are required' });
      return;
    }

    const fieldArray = (fields as string).split(',');

    const transactions = await Transaction.find({}, fieldArray.join(' '));

    const csv = generateCSV(transactions, fieldArray);

    res.setHeader('Content-Disposition', 'attachment; filename=transactions.csv');
    res.setHeader('Content-Type', 'text/csv');
    res.status(200).send(csv);
  } catch (err) {
    res.status(500).json({ message: 'Failed to export CSV' });
  }
};
