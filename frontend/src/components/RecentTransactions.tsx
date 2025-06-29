import React, { useEffect, useState } from 'react';
import {
  Box,
  Avatar,
  Typography,
  Divider,
  Link,
} from '@mui/material';
import api from '../services/api';

type Transaction = {
  id: number;
  user_id: string;
  user_profile?: string;
  amount: number;
  date: string;
  category: string;
  status: string;
};

const RecentTransactions = () => {
  const [transactions, setTransactions] = useState<Transaction[]>([]);

  useEffect(() => {
    const fetchLatest = async () => {
      try {
        const res = await api.get('/transactions', {
          params: { page: 1, limit: 3 },
        });
        setTransactions(res.data.data);
      } catch (err) {
        console.error('Failed to fetch recent transactions', err);
      }
    };

    fetchLatest();
  }, []);

  return (
    <Box
      sx={{
        backgroundColor: '#1A1C22',
        borderRadius: 3,
        p: 3,
        width: '100%',
        maxWidth: 480,
        height: 284,
      }}
    >
      {/* Header */}
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
        <Typography sx={{ color: 'white', fontWeight: 'bold', fontSize: '18px' }}>
          Recent Transaction
        </Typography>
        <Link href="/transactions" underline="none" sx={{ color: '#22C55E', fontWeight: 500, fontSize: '14px' }}>
          See all
        </Link>
      </Box>

      {/* Transactions */}
      {transactions.map((tx, index) => {
        const isIncome = tx.category === 'Revenue';
        const amountColor = isIncome ? '#22C55E' : '#F59E0B';
        const directionText = isIncome ? 'Transfers from' : 'Transfers to';

        return (
          <Box key={tx.id}>
            <Box display="flex" alignItems="center" gap={2} mb={2}>
              <Avatar
                src='frontend\src\utils\userlogo.png'
                sx={{ width: 40, height: 40 }}
              />
              <Box flex="1">
                <Typography variant="body2" sx={{ color: '#8C89B4' }}>
                  {directionText}
                </Typography>
                <Typography sx={{ color: 'white', fontWeight: 500 }}>
                  {tx.user_id}
                </Typography>
              </Box>
              <Typography sx={{ color: amountColor, fontWeight: 600 }}>
                {isIncome ? '+' : '-'}${Math.abs(tx.amount).toFixed(2)}
              </Typography>
            </Box>
            {index !== transactions.length - 1 && (
              <Divider sx={{ borderColor: '#2E2E36', mb: 2 }} />
            )}
          </Box>
        );
      })}
    </Box>
  );
};

export default RecentTransactions;
