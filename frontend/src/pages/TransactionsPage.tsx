import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import TransactionTable from '../components/TransactionTable';
import { Grid } from '@mui/material';

const TransactionsPage = () => (
  <DashboardLayout>
    <Grid spacing={{ xs: 12 }} sx={{ width: '100%', maxWidth: 1250, position: 'absolute', top: '50px', left: '238px', borderRadius: '15px', margin: '0 auto' }}>
      <TransactionTable maxHeight={620} width={1200} showFilters={true} />
    </Grid>
  </DashboardLayout>
);

export default TransactionsPage;