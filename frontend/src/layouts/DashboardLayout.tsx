import React from 'react';
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from '@mui/material';
import { Dashboard, BarChart, Wallet, Settings, MailOutline, Person, Insights } from '@mui/icons-material';
import { useAuth } from '../context/AuthContext';
import { useNavigate, useLocation } from 'react-router-dom';
import Navbar from '../components/Navbar';

const drawerWidth = 213;

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <Box sx={{ display: 'flex', bgcolor: '#282C35', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Top Navbar */}
      <Navbar />
      {/* Sidebar */}
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          '& .MuiDrawer-paper': {
            width: '213px',
            backgroundColor: '#1A1C22',
            color: 'white',
            borderRight: 'none',
            height: '100vh',
            overflowY: 'hidden',
          },
        }}
      >
        <Toolbar />
        <Box sx={{ mt: 2 }}>
          <List>
            {/* Optional: Replace with logo or heading */}
            <ListItem sx={{ pl: 2, pb: 2, left:'35px', alignItems: 'center', display: 'flex' }}>
              <Typography variant="h6" fontWeight="bold" fontStyle='inherit'>
                Loopr AI
              </Typography>
            </ListItem>

            {/* Sidebar menu */}
            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === '/dashboard'}
                onClick={() => navigate('/dashboard')}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Dashboard />
                </ListItemIcon>
                <ListItemText primary="Dashboard" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === '/transactions'}
                onClick={() => navigate('/transactions')}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <BarChart />
                </ListItemIcon>
                <ListItemText primary="Transactions" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === '/insights'}
                onClick={() => navigate('/insights')}
                >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Insights />
                </ListItemIcon>
                <ListItemText primary="Insights" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
               selected={location.pathname === '/messages'}
                onClick={() => navigate('/messages')}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <MailOutline />
                </ListItemIcon>
                <ListItemText primary="Message" />
              </ListItemButton>
            </ListItem>

            <ListItem disablePadding>
              <ListItemButton
                selected={location.pathname === '/profile'}
                onClick={() => navigate('/profile')}
              >
                <ListItemIcon sx={{ color: 'white' }}>
                  <Person />
                </ListItemIcon>
                <ListItemText primary="Profile" />
              </ListItemButton>
            </ListItem>
          </List>
        </Box>
      </Drawer>
      {/* Main Content: just render children, let them flow naturally */}
      <Box sx={{ flexGrow: 1, ml: `${drawerWidth}px`, bgcolor: '#282C35', minHeight: '100vh', overflow: 'auto' }}>
        {children}
      </Box>
    </Box>
  );
};

export default DashboardLayout;
