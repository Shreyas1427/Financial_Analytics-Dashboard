import React, { useEffect, useState } from 'react';
import {
  Table, TableBody, TableCell, TableContainer,
  TableHead, TableRow, Paper, TablePagination,
  TextField, InputAdornment, MenuItem,
  Box, Button
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import { DateRangePicker } from '@mui/x-date-pickers-pro';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import dayjs, { Dayjs } from 'dayjs';
import api from '../services/api';
import ExportCSVModal from '../components/ExportCSV';
import { useNavigate } from 'react-router-dom';

type Transaction = {
  id: number;
  date: string;
  amount: number;
  category: string;
  status: string;
  user_id: string;
  user_profile?: string;
};

const categories = ['Revenue', 'Expense'];
const statuses = ['Paid', 'Pending', 'Failed'];

type DateRange<TDate> = [TDate | null, TDate | null];

type TransactionTableProps = {
  maxHeight?: number | string;
  width?: number | string;
  containerSx?: object;
  showFilters?: boolean;
  heading?: string;
};

const TransactionTable: React.FC<TransactionTableProps> = ({
  maxHeight = 190,
  width = 1200,
  containerSx = {},
  showFilters = true,
  heading = '',
}) => {
  const [data, setData] = useState<Transaction[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [search, setSearch] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('');
  const [open, setOpen] = useState(false);
  const [dateRange, setDateRange] = useState<DateRange<Dayjs>>([null, null]);
  const [totalCount, setTotalCount] = useState(0);
  const navigate = useNavigate();

  const fetchData = async () => {
    try {
      const res = await api.get('/transactions', {
        params: {
          page: page + 1,
          limit: rowsPerPage,
          search,
          category,
          status,
          startDate: dateRange[0]?.toISOString(),
          endDate: dateRange[1]?.toISOString(),
        },
      });
      setData(res.data.data);
      setTotalCount(res.data.total); // Adjust this if your API uses a different property name
    } catch (err) {
      console.error('Failed to fetch transactions:', err);
    }
  };

  useEffect(() => {
    fetchData();
  }, [page, rowsPerPage, search, category, status, dateRange]);

  return (
    <Paper
      sx={{
        width: '100%',
        mt: 4,
        backgroundColor: '#1A1C22',
        borderRadius: 3,
        overflow: 'hidden',
        boxShadow: 'none',
        ...containerSx,
      }}
    >
      {/* Filters and Heading in one row */}
      <Box sx={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '10px', flexWrap: 'wrap' }}>
        {heading && (
          <span
            style={{
              color: '#8C89B4',
              fontWeight: 700,
              fontSize: 22,
              marginRight: 16,
              marginLeft: 16,
              cursor: heading === 'Transactions' ? 'pointer' : 'default',
              textDecoration: heading === 'Transactions' ? 'underline' : 'none',
            }}
            onClick={() => {
              if (heading === 'Transactions') navigate('/transactions');
            }}
            title={heading === 'Transactions' ? 'Go to Transactions page' : undefined}
          >
            {heading}
          </span>
        )}

        <TextField
          label="Search"
          size="small"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          sx={{
            width: 250,
            backgroundColor: '#282C35',
            '& .MuiInputBase-input': { color: '#8C89B4' },
            '& .MuiInputLabel-root': { color: '#8C89B4' },
            borderRadius: '10px',
          }}
        />

        {showFilters && (
          <>
            <TextField
              select
              label="Category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              size="small"
              sx={{
                width: 180,
                backgroundColor: '#282C35',
                '& .MuiInputBase-input': { color: '#8C89B4' },
                '& .MuiInputLabel-root': { color: '#8C89B4' },
                borderRadius: '10px',
              }}
            >
              <MenuItem value="">All</MenuItem>
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </TextField>

            <TextField
              select
              label="Status"
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              size="small"
              sx={{
                width: 180,
                backgroundColor: '#282C35',
                '& .MuiInputBase-input': { color: '#8C89B4' },
                '& .MuiInputLabel-root': { color: '#8C89B4' },
                borderRadius: '10px',
              }}
            >
              <MenuItem value="">All</MenuItem>
              {statuses.map((st) => (
                <MenuItem key={st} value={st}>{st}</MenuItem>
              ))}
            </TextField>

            {/* Date Range Picker + Clear Button */}
            <Box display="flex" alignItems="center" gap={1}>
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DateRangePicker
                  calendars={1}
                  value={dateRange}
                  onChange={(newRange) => setDateRange(newRange)}
                  slotProps={{
                    textField: {
                      size: 'small',
                      sx: {
                        width: 250,
                        backgroundColor: '#282C35',
                        borderRadius: '10px',
                        '& input': { color: '#8C89B4' },
                        '& label': { color: '#8C89B4' },
                      },
                    },
                  }}
                />
              </LocalizationProvider>
              {Boolean(dateRange[0] || dateRange[1]) && (
                <Button
                  size="small"
                  variant="outlined"
                  onClick={() => setDateRange([null, null])}
                  sx={{
                    minWidth: 32,
                    width: 32,
                    height: 32,
                    p: 0,
                    ml: 1,
                    borderRadius: '50%',
                    color: '#8C89B4',
                    borderColor: '#8C89B4',
                    backgroundColor: '#8C89B4',
                    '&:hover': {
                      backgroundColor: '#8C89B4',
                      borderColor: '#8C89B4',
                    },
                  }}
                  title="Clear date filter"
                >
                  ×
                </Button>
              )}
            </Box>
          </>
        )}

        {/* CSV Export Button */}
        <Box display="flex" alignItems="center">
          <Button
            variant="outlined"
            onClick={() => setOpen(true)}
            sx={{
              color: '#8C89B4',
              borderColor: '#8C89B4',
              backgroundColor: '#282C35',
              borderRadius: '10px',
            }}
          >
            Export CSV
          </Button>
          <ExportCSVModal open={open} onClose={() => setOpen(false)} />
        </Box>
      </Box>

      {/* Table */}
      <TableContainer
        sx={{
          maxHeight,
          overflowY: 'auto',
          '&::-webkit-scrollbar': { display: 'none' },
          scrollbarWidth: 'none',
          msOverflowStyle: 'none',
        }}
      >
        <Table
          stickyHeader
          sx={{
            borderCollapse: 'separate',
            borderSpacing: '0 10px',
            width,
            margin: '0px auto',
          }}
        >
          <TableHead>
            <TableRow sx={{ backgroundColor: '#282C35' }}>
              <TableCell
                sx={{
                  backgroundColor: '#282C35',
                  color: '#8C89B4',
                  fontWeight: 'bold',
                  borderTopLeftRadius: '15px',
                  borderBottomLeftRadius: '15px',
                  border: 'none',
                  textAlign: 'center',
                  height: '10px',
                }}
              >
                Name
              </TableCell>
              <TableCell sx={{ backgroundColor: '#282C35', color: '#8C89B4', fontWeight: 'bold', border: 'none', textAlign: 'center' }}>
                Date
              </TableCell>
              <TableCell sx={{ backgroundColor: '#282C35', color: '#8C89B4', fontWeight: 'bold', border: 'none', textAlign: 'center' }}>
                Amount
              </TableCell>
              <TableCell
                sx={{
                  backgroundColor: '#282C35',
                  color: '#8C89B4',
                  fontWeight: 'bold',
                  borderTopRightRadius: '15px',
                  borderBottomRightRadius: '15px',
                  border: 'none',
                  textAlign: 'center',
                }}
              >
                Status
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {data.map((row) => {
              const isPositive = row.amount >= 0;
              const statusColor = {
                Paid: '#22C55E',
                Completed: '#22C55E',
                Pending: '#F59E0B',
                Failed: '#EF4444',
              }[row.status] || '#9CA3AF';

              return (
                <TableRow key={row.id} sx={{ backgroundColor: '#1A1C22' }}>
                  <TableCell sx={{ color: 'white', border: 'none', textAlign: 'center' }}>
                    {row.user_id}
                  </TableCell>
                  <TableCell sx={{ color: 'white', border: 'none', textAlign: 'center' }}>
                    {new Date(row.date).toLocaleDateString('en-GB', {
                      weekday: 'short',
                      day: '2-digit',
                      month: 'short',
                      year: 'numeric',
                    })}
                  </TableCell>
                  <TableCell
                   sx={{
                     color: row.category === 'Revenue' ? '#22C55E' : '#F59E0B',
                     fontWeight: 500,
                     border: 'none',
                     textAlign: 'center',
                   }}
                 >
                   {row.category === 'Revenue' ? '+' : '-'}${Math.abs(row.amount).toFixed(2)}
                 </TableCell>
                  <TableCell sx={{ border: 'none', textAlign: 'center' }}>
                    <Box
                      sx={{
                        backgroundColor: statusColor,
                        color: 'white',
                        width: '69px',
                        height: '20px',
                        textAlign: 'center',
                        px: 2,
                        py: 0.5,
                        borderRadius: '8px',
                        fontSize: '12px',
                        fontWeight: 500,
                        display: 'inline-block',
                      }}
                    >
                      {row.status}
                    </Box>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <TablePagination
        component="div"
        count={totalCount}
        page={page}
        onPageChange={(e, newPage) => setPage(newPage)}
        rowsPerPage={rowsPerPage}
        onRowsPerPageChange={(e) => {
          setRowsPerPage(parseInt(e.target.value, 10));
          setPage(0);
        }}
        rowsPerPageOptions={[10, 25, 50, 100,{ label: 'All', value: totalCount }]}
      />
    </Paper>
  );
};

export default TransactionTable;
