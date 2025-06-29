import React, { useEffect, useState } from 'react';
import {
  LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import dayjs, { Dayjs } from 'dayjs';

type Props = {
  dateRange?: [Dayjs | null, Dayjs | null];
  category?: string;
  status?: string;
};

const LineChartComponent: React.FC<Props> = ({ dateRange, category, status }) => {
  const [chartData, setChartData] = useState<any[]>([]);
  const navigate = useNavigate();

  const fetchTransactions = async () => {
    try {
      const res = await api.get('/transactions', {
        params: {
          limit: 1000,
          startDate: dateRange?.[0]?.toISOString(),
          endDate: dateRange?.[1]?.toISOString(),
          category,
          status,
        },
      });

      const transactions = res.data.data;

      const monthly: Record<string, { revenue: number; expense: number }> = {};
      for (let i = 0; i < 12; i++) {
        const m = dayjs().month(i).format('MMM');
        monthly[m] = { revenue: 0, expense: 0 };
      }

      transactions.forEach((txn: any) => {
        const txnMonth = dayjs(txn.date).format('MMM');
        if (!monthly[txnMonth]) monthly[txnMonth] = { revenue: 0, expense: 0 };

        if (txn.category === 'Revenue') {
          monthly[txnMonth].revenue += txn.amount;
        } else if (txn.category === 'Expense') {
          monthly[txnMonth].expense += txn.amount;
        }
      });

      const formatted = Object.entries(monthly).map(([month, values]) => ({
        month,
        ...values,
      }));

      setChartData(formatted);
    } catch (err) {
      console.error('Chart data fetch failed:', err);
    }
  };

  useEffect(() => {
    fetchTransactions();
  }, [dateRange, category, status]);

  return (
    <Card sx={{ mb: 4, backgroundColor: '#1A1C22', borderRadius: '15px' }}>
      <CardContent sx={{ height: '289px', p: 2 }}>
        <Typography
          variant="h6"
          mb={2}
          sx={{ fontWeight: 'bold', color: '#FFFFFF', textDecoration: 'underline', cursor: 'pointer' }}
          onClick={() => navigate('/insights')}
        >
          Overview
        </Typography>
        <ResponsiveContainer width="100%" height={240}>
          <LineChart data={chartData}>
            <CartesianGrid stroke="#282C35" strokeDasharray="5 5" />
            <XAxis dataKey="month" stroke="#8884d8" />
            <YAxis stroke="#8884d8" />
            <Tooltip contentStyle={{ backgroundColor: '#1A1C22' }} />
            <Legend />
            <Line type="natural" dataKey="revenue" stroke="#1FCB4F" strokeWidth={1.67} />
            <Line type="natural" dataKey="expense" stroke="#FFC01E" strokeWidth={1.67} />
          </LineChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default LineChartComponent;
