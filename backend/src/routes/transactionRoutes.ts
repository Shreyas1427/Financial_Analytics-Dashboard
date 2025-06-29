import express from 'express';
import { getTransactions, getTransactionSummary } from '../controllers/transactionController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/', verifyToken, getTransactions);
router.get('/summary', verifyToken, getTransactionSummary); // ✅ NEW ROUTE

export default router;
