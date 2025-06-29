// src/pages/Message.tsx
import React from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import { Box, Typography } from '@mui/material';

const Message = () => {
  return (
    <DashboardLayout>
      <Box sx={{ p: 4, textAlign: 'center' }}>
        <Typography variant="h5" sx={{ color: '#8C89B4' }}>
          No new messages
        </Typography>
      </Box>
    </DashboardLayout>
  );
};

export default Message;
