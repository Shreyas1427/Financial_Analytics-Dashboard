import React, { useState } from 'react';
import DashboardLayout from '../layouts/DashboardLayout';
import LineChartComponent from '../components/LineChartComponent';
import CalendarHeatmapComponent from '../components/CalendarHeatmap';
import PieChartComponent from '../components/PieChartComponent';
import {
  Box,
  MenuItem,
  TextField,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { LocalizationProvider, DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';
import CalendarMonthIcon from '@mui/icons-material/CalendarMonth';
import CancelIcon from '@mui/icons-material/Close';

type DateRange<TDate> = [TDate | null, TDate | null];

const Insights = () => {
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');

  const clearDate = () => setDateRange([null, null]);

  return (
    <DashboardLayout>
      {/* Container with no scroll */}
      <Box
        sx={{
          position: 'fixed',
          top: '75px',
          left: '213px',
          right: 0,
          bottom: 0,
          backgroundColor: '#282C35',
          overflow: 'hidden',
        }}
      >
        {/* Filters */}
        <Box
          sx={{
            position: 'absolute',
            top: '20px',
            left: '25px',
            display: 'flex',
            gap: 2,
            alignItems: 'center',
            zIndex: 10,
          }}
        >
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateRangePicker
              calendars={1}
              value={dateRange}
              onChange={(newRange) => setDateRange(newRange)}
              slotProps={{
                textField: {
                  size: 'small',
                  placeholder: 'Select date range',
                  sx: {
                    width: 270,
                    backgroundColor: '#1A1C22',
                    borderRadius: '10px',
                    '& input': { color: '#8C89B4' },
                    '& label': { color: '#8C89B4' },
                  },
                  InputProps: {
                    startAdornment: (
                      <InputAdornment position="start">
                        <CalendarMonthIcon sx={{ color: '#8C89B4' }} />
                      </InputAdornment>
                    ),
                    endAdornment: dateRange[0] || dateRange[1] ? (
                      <IconButton onClick={clearDate} sx={{ color: '#8C89B4' }}>
                        <CancelIcon fontSize="small" />
                      </IconButton>
                    ) : null,
                  },
                },
              }}
            />
          </LocalizationProvider>

          <TextField
            select
            label="Category"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            size="small"
            sx={{
              width: 180,
              backgroundColor: '#1A1C22',
              borderRadius: '10px',
              '& .MuiInputBase-input': { color: '#8C89B4' },
              '& .MuiInputLabel-root': { color: '#8C89B4' },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Revenue">Revenue</MenuItem>
            <MenuItem value="Expense">Expense</MenuItem>
          </TextField>

          <TextField
            select
            label="Status"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            size="small"
            sx={{
              width: 180,
              backgroundColor: '#1A1C22',
              borderRadius: '10px',
              '& .MuiInputBase-input': { color: '#8C89B4' },
              '& .MuiInputLabel-root': { color: '#8C89B4' },
            }}
          >
            <MenuItem value="">All</MenuItem>
            <MenuItem value="Paid">Paid</MenuItem>
            <MenuItem value="Pending">Pending</MenuItem>
          </TextField>
        </Box>

        {/* Charts */}
        <Box
          sx={{
            position: 'absolute',
            top: '80px',
            left: '25px',
            display: 'flex',
            gap: 4,
          }}
        >
          <Box sx={{ width: '680px', height: '300px' }}>
            <LineChartComponent
              dateRange={dateRange}
              category={category}
              status={status}
            />
          </Box>

          <Box sx={{ width: '550px', height: '300px' }}>
            <PieChartComponent
              dateRange={dateRange}
              category={category}
              status={status}
            />
          </Box>
        </Box>

        {/* Heatmap */}
        <Box
          sx={{
            position: 'absolute',
            top: '420px',
            left: '25px',
            width: '1265px',
            height: '500px',
          }}
        >
          <CalendarHeatmapComponent
            dateRange={dateRange}
            category={category}
            status={status}
          />
        </Box>
      </Box>
    </DashboardLayout>
  );
};

export default Insights;
