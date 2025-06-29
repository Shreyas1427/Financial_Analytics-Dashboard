// src/pages/Profile.tsx
import React from 'react';
import { Box, Typography, Button, Card, CardContent } from '@mui/material';
import DashboardLayout from '../layouts/DashboardLayout';
import { useAuth } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';

const Profile = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <DashboardLayout>
      <Box sx={{ p: 4 }}>
        <Card sx={{ maxWidth: 400, backgroundColor: '#1A1C22', color: 'white' }}>
          <CardContent>
            <Typography variant="h5" gutterBottom fontWeight="bold">
              Profile
            </Typography>

            <Typography variant="body1" sx={{ mt: 2 }}>
              <strong>Name:</strong> {user?.name || 'John Doe'}
            </Typography>

            <Typography variant="body1" sx={{ mt: 1 }}>
              <strong>Email:</strong> {user?.email || 'johndoe@example.com'}
            </Typography>

            <Button
              variant="outlined"
              onClick={handleLogout}
              sx={{ mt: 3, color: '#8C89B4', borderColor: '#8C89B4' }}
            >
              Logout
            </Button>
          </CardContent>
        </Card>
      </Box>
    </DashboardLayout>
  );
};

export default Profile;
