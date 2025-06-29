import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../layouts/DashboardLayout';
import SummaryCard from '../components/SummaryCard';
import { Grid } from '@mui/material';
import api from '../services/api';
import LineChartComponent from '../components/LineChartComponent';
import TransactionTable from '../components/TransactionTable';
import RecentTransactions from '../components/RecentTransactions';


// Import icons
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import TrendingDownIcon from '@mui/icons-material/TrendingDown';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import MoneyOffIcon from '@mui/icons-material/MoneyOff';

const Dashboard = () => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [revenue, setRevenue] = useState(0);
  const [expense, setExpense] = useState(0);

  const fetchSummary = async () => {
    try {
      const res = await api.get('/transactions/summary');
      setRevenue(res.data.revenue || 0);
      setExpense(res.data.expense || 0);
    } catch (error) {
      console.error('Error fetching summary:', error);
    }
  };

  useEffect(() => {
    fetchSummary();
  }, []);

  const profit = revenue - expense;
  const loss = profit < 0 ? Math.abs(profit) : 0;

  return (
    <DashboardLayout>
      <Grid container spacing={3} mb={4}>
        <Grid spacing={{ xs: 12, sm: 6, md: 3 }} sx={{ position: 'absolute', left: '238px', borderRadius: '15px' }}>
          <SummaryCard
            title="Total Revenue"
            amount={`$${revenue.toLocaleString()}`}
            icon={<AccountBalanceWalletIcon sx={{ color: '#22C55E', fontSize: 28 }} />}
            amountColor="#22C55E"
          />
        </Grid>
        <Grid spacing={{ xs: 12, sm: 6, md: 3 }} sx={{ position: 'absolute', left: '478px', borderRadius: '15px' }}>
          <SummaryCard
            title="Total Expenses"
            amount={`$${expense.toLocaleString()}`}
            icon={<TrendingDownIcon sx={{ color: '#F59E0B', fontSize: 28 }} />}
            amountColor="#F59E0B"
          />
        </Grid>
        <Grid spacing={{ xs: 12, sm: 6, md: 3 }} sx={{ position: 'absolute', left: '718px', borderRadius: '15px' }}>
          <SummaryCard
            title="Profit"
            amount={`$${profit.toLocaleString()}`}
            icon={<TrendingUpIcon sx={{ color: '#06B6D4', fontSize: 28 }} />}
            amountColor="#06B6D4"
          />
        </Grid>
        <Grid spacing={{ xs: 12, sm: 6, md: 3 }} sx={{ position: 'absolute', left: '958px', borderRadius: '15px' }}>
          <SummaryCard
            title="Loss"
            amount={`$${loss.toLocaleString()}`}
            icon={<MoneyOffIcon sx={{ color: '#EF4444', fontSize: 28 }} />}
            amountColor="#EF4444"
          />
        </Grid>
        {/* Charts */}
        <Grid spacing={{ xs: 12, md: 8 }} sx={{ width: '710px', height: '298px',
          position: 'absolute', top: '185px', left: '238px', borderRadius: '15px' }}>
          <LineChartComponent/>
        </Grid>
        <Grid spacing={{ xs: 12, md: 8 }} sx={{ width: '570px', height: '298px',
          position: 'absolute', top: '185px', left: '958px', borderRadius: '15px' }}>
          <RecentTransactions/>
        </Grid>
        <Grid spacing={{ xs: 12 }} sx={{ width: '100%', maxWidth: 1250, position: 'absolute', top: '490px', left: '238px', borderRadius: '15px', margin: '0 auto' }}>
          <TransactionTable maxHeight={190} width={1200} showFilters={false} heading='Transactions'/>
        </Grid>
      </Grid>
    </DashboardLayout>
  );
};

export default Dashboard;
