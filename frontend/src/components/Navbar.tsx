import React from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  InputBase,
  styled,
  Avatar,
  IconButton,
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { useLocation } from 'react-router-dom';

const SearchContainer = styled('div')(({ theme }) => ({
  position: 'relative',
  borderRadius: '8px',
  backgroundColor: '#2B2D33',
  marginRight: theme.spacing(2),
  marginLeft: theme.spacing(2),
  width: '215px',
  height: '34px',
  display: 'flex',
  alignItems: 'center',
  padding: '0 10px',
  color: '#aaa',
}));

const SearchInput = styled(InputBase)(({ theme }) => ({
  color: 'inherit',
  width: '100%',
  fontSize: '14px',
}));

const Navbar = () => {
  const location = useLocation();

  // Map route paths to human-readable titles
  const getPageTitle = (path: string): string => {
  if (path.startsWith('/dashboard')) return 'Dashboard';
  if (path.startsWith('/transactions')) return 'Transactions';
  if (path.startsWith('/insights')) return 'Insights';
  if (path.startsWith('/messages')) return 'Messages';
  if (path.startsWith('/profile')) return 'Profile';
  return 'Dashboard';
};


  const title = getPageTitle(location.pathname);

  return (
    <AppBar
      position="fixed"
      elevation={0}
      sx={{
        backgroundColor: '#1A1C22',
        color: 'white',
        height: '75px',
        width: 'calc(100% - 213px)',
        left: '213px',
        top: 0,
        px: 3,
        justifyContent: 'center',
        zIndex: (theme) => theme.zIndex.drawer + 1, // ensure above sidebar
        boxShadow: 'none',
      }}
    >
      <Toolbar sx={{ justifyContent: 'space-between', minHeight: '75px !important' }}>
        {/* Left - Dynamic Page Title */}
        <Typography variant="h6" fontWeight="bold" sx={{ color: 'white' }}>
          {title}
        </Typography>

        {/* Right - Search + Notification + Avatar */}
        <Box display="flex" alignItems="center" gap={2}>
          {/* Search Bar */}
          <SearchContainer>
            <SearchIcon fontSize="small" />
            <SearchInput placeholder="Search..." />
          </SearchContainer>

          {/* Notification Icon */}
          <IconButton sx={{ color: 'white' }}>
            <NotificationsNoneIcon />
          </IconButton>

          {/* Avatar */}
          <Avatar
            sx={{ width: 40, height: 40, bgcolor: '#E5EDFF' }}
            src="frontend\src\utils\userlogo.png"
          />
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
