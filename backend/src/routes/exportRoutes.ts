import express from 'express';
import { exportTransactions } from '../controllers/exportController';
import { verifyToken } from '../middlewares/auth';

const router = express.Router();

router.get('/export', verifyToken, exportTransactions);

export default router;
