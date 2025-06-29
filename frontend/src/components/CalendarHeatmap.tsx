import React, { useEffect, useState } from 'react';
import CalendarHeatmap from 'react-calendar-heatmap';
import 'react-calendar-heatmap/dist/styles.css';
import { Card, CardContent, Typography, Box } from '@mui/material';
import api from '../services/api';
import dayjs, { Dayjs } from 'dayjs';
import minMax from 'dayjs/plugin/minMax';
dayjs.extend(minMax);

type Transaction = {
  date: string;
  amount: number;
  category: string;
  status: string;
};

type Props = {
  dateRange: [Dayjs | null, Dayjs | null];
  category: string;
  status: string;
};

const CalendarHeatmapComponent: React.FC<Props> = ({ dateRange, category, status }) => {
  const [heatmapData, setHeatmapData] = useState<any[]>([]);

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
        const transactions: Transaction[] = res.data.data;

        const dateMap: Record<string, { date: string; count: number; total: number }> = {};
        transactions.forEach(txn => {
          const date = dayjs(txn.date).format('YYYY-MM-DD');
          if (!dateMap[date]) {
            dateMap[date] = { date, count: 0, total: 0 };
          }
          dateMap[date].count += 1;
          dateMap[date].total += txn.amount;
        });

        const data = Object.values(dateMap);
        setHeatmapData(data);
      } catch (err) {
        console.error('Failed to fetch heatmap data:', err);
      }
    };
    fetchData();
  }, [dateRange, category, status]);

  const allDates = heatmapData.map(d => dayjs(d.date));
  const minDayjs = allDates.length ? dayjs.min(allDates) : null;
  const maxDayjs = allDates.length ? dayjs.max(allDates) : null;
  const minDate = minDayjs ? minDayjs.format('YYYY-MM-DD') : dayjs().startOf('year').format('YYYY-MM-DD');
  const maxDate = maxDayjs ? maxDayjs.format('YYYY-MM-DD') : dayjs().endOf('year').format('YYYY-MM-DD');

  return (
    <Card sx={{ backgroundColor: '#1A1C22', color: 'white', mb: 4 }}>
      <CardContent>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: '#FFFFFF', mb: 2 }}>
          Transaction Activity Heatmap
        </Typography>
        <Box sx={{ overflowX: 'auto' }}>
          <CalendarHeatmap
            startDate={minDate}
            endDate={maxDate}
            values={heatmapData}
            classForValue={value => {
              if (!value || value.count === 0) return 'color-empty';
              if (value.count > 10) return 'color-github-4';
              if (value.count > 5) return 'color-github-3';
              if (value.count > 2) return 'color-github-2';
              return 'color-github-1';
            }}
            tooltipDataAttrs={(value): { [key: string]: string } =>
              value && value.date
                ? { 'data-tip': `${value.date}: ${value.count} transactions, $${value.total.toFixed(2)}` }
                : { 'data-tip': 'No transactions' }
            }
            showWeekdayLabels
          />
        </Box>
      </CardContent>
    </Card>
  );
};

export default CalendarHeatmapComponent;
