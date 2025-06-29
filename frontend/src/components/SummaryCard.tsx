import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';

type SummaryCardProps = {
  title: string;
  amount: string | number;
  icon: React.ReactNode;
  amountColor?: string;
};

const SummaryCard = ({ title, amount, icon, amountColor }: SummaryCardProps) => {
  return (
    <Card
      sx={{
        backgroundColor: '#1A1C22',
        color: 'white',
        borderRadius: '12px',
        px: 2,
        py: 2,
        boxShadow: 'none',
        width: '200px', height: '60px', position: 'absolute', top: '85px'
      }}
    >
      <CardContent sx={{ display: 'flex', alignItems: 'center', gap: 2, p: 0 }}>
        {/* Icon container */}
        <Box
          sx={{
            backgroundColor: '#2B2E34',
            p: 1.2,
            borderRadius: 2,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {icon}
        </Box>

        {/* Text */}
        <Box>
          <Typography
            variant="subtitle2"
            sx={{ fontSize: '12px', color: '#A0A3A7', mb: 0.5 }}
          >
            {title}
          </Typography>
          <Typography
            variant="h6"
            sx={{ fontWeight: 'bold', fontSize: '20px', color: amountColor || 'white' }}
          >
            {amount}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SummaryCard;
