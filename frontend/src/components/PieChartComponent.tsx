import React, { useEffect, useState } from 'react';
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from 'recharts';
import { Card, CardContent, Typography } from '@mui/material';
import api from '../services/api';
import { Dayjs } from 'dayjs';

type Props = {
  dateRange: [Dayjs | null, Dayjs | null];
  category: string;
  status: string;
};

const COLORS = ['#1FCB4F', '#FFC01E', '#1976d2', '#d32f2f'];

const PieChartComponent: React.FC<Props> = ({ dateRange, category, status }) => {
  const [pieData, setPieData] = useState<any[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await api.get('/transactions', {
          params: {
            limit: 1000,
            startDate: dateRange[0]?.toISOString(),
            endDate: dateRange[1]?.toISOString(),
            category,
            status,
          },
        });

        const transactions = res.data.data;

        // Group by status and category
        type SummaryKey = 'Revenue - Paid' | 'Revenue - Pending' | 'Expense - Paid' | 'Expense - Pending';
        const summary: Record<SummaryKey, number> = {
          'Revenue - Paid': 0,
          'Revenue - Pending': 0,
          'Expense - Paid': 0,
          'Expense - Pending': 0,
        };

        transactions.forEach((txn: any) => {
          if ((txn.status === 'Paid' || txn.status === 'Pending') && (txn.category === 'Revenue' || txn.category === 'Expense')) {
            const key = `${txn.category} - ${txn.status}` as SummaryKey;
            summary[key] += txn.amount;
          }
        });

        setPieData([
          { name: 'Revenue - Paid', value: summary['Revenue - Paid'] },
          { name: 'Revenue - Pending', value: summary['Revenue - Pending'] },
          { name: 'Expense - Paid', value: summary['Expense - Paid'] },
          { name: 'Expense - Pending', value: summary['Expense - Pending'] },
        ]);
      } catch (err) {
        console.error('Failed to fetch pie chart data:', err);
      }
    };
    fetchData();
  }, [dateRange, category, status]);

  return (
    <Card sx={{ mb: 4, backgroundColor: '#1A1C22',borderRadius: '15px' }}>
      <CardContent sx={{ height: '289px', p: 2 }}>
        <Typography variant="h6" mb={2} color="#FFFFFF" sx={{ fontWeight: 'bold', fontSize: '20px' }}>
          Paid vs Pending (Revenue & Expense)
        </Typography>
        <ResponsiveContainer width="100%" height={250}>
          <PieChart>
            <Pie
              data={pieData}
              dataKey="value"
              nameKey="name"
              cx="50%"
              cy="50%"
              outerRadius={80}
              label
            >
              {pieData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </CardContent>
    </Card>
  );
};

export default PieChartComponent;
