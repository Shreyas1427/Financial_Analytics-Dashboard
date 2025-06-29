import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper, Checkbox, FormControlLabel
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleLogin = async () => {
    setError('');
    if (!email || !password) {
      setError('Email and password are required.');
      return;
    }

    try {
      const res = await api.post('/auth/login', { email, password });
      login(res.data.token, res.data.user);

      if (remember) {
        localStorage.setItem('rememberedEmail', email);
      } else {
        localStorage.removeItem('rememberedEmail');
      }

      navigate('/dashboard');
    } catch (err) {
      setError('Login failed. Please check your credentials.');
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" sx={{ backgroundColor: '#282C35' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '300px', bgcolor: '#1A1C22', color: 'white' }}>
          <Typography variant="h5" mb={2}>Welcome Back 👋</Typography>

          {error && <Typography color="error" mb={2}>{error}</Typography>}

          <TextField
            fullWidth
            label="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#8C89B4' } }}
            InputProps={{ style: { color: '#FFFFFF' } }}
          />

          <TextField
            fullWidth
            type="password"
            label="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#8C89B4' } }}
            InputProps={{ style: { color: '#FFFFFF' } }}
          />

          <FormControlLabel
            control={
              <Checkbox
                checked={remember}
                onChange={() => setRemember(!remember)}
                sx={{ color: '#8C89B4' }}
              />
            }
            label={<Typography sx={{ color: '#8C89B4' }}>Remember Me</Typography>}
          />

          <Button fullWidth variant="contained" onClick={handleLogin}>
            Login
          </Button>

          <Typography
            mt={2}
            textAlign="center"
            sx={{ cursor: 'pointer', color: '#8C89B4' }}
            onClick={() => navigate('/register')}
          >
            Don't have an account? Register
          </Typography>
        </Paper>
      </Box>

      <Box
        flex={1}
        sx={{
          background: 'linear-gradient(to right, #667eea, #764ba2)',
          color: 'white',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          flexDirection: 'column',
        }}
      >
        <Typography variant="h4" fontWeight="bold" textAlign="center">
          Financial Insights, Visualized
        </Typography>
        <Typography variant="subtitle1" mt={2}>
          Your data-driven dashboard for smarter business
        </Typography>
      </Box>
    </Box>
  );
};

export default LoginPage;
