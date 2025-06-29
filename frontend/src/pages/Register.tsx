import React, { useState } from 'react';
import {
  Box, Button, TextField, Typography, Paper
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import api from '../services/api';

const RegisterPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError('');
    if (!name || !email || !password) {
      setError('All fields are required.');
      return;
    }

    try {
      const res = await api.post('/auth/register', { name, email, password });
      login(res.data.token, res.data.user);
      navigate('/dashboard');
    } catch (err) {
      setError('Registration failed. Email may already be in use.');
    }
  };

  return (
    <Box display="flex" height="100vh">
      <Box flex={1} display="flex" alignItems="center" justifyContent="center" sx={{ backgroundColor: '#282C35' }}>
        <Paper elevation={3} sx={{ padding: 4, width: '300px', bgcolor: '#1A1C22', color: 'white' }}>
          <Typography variant="h5" mb={2}>Create Account</Typography>

          {error && <Typography color="error" mb={2}>{error}</Typography>}

          <TextField
            fullWidth
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            sx={{ mb: 2 }}
            InputLabelProps={{ style: { color: '#8C89B4' } }}
            InputProps={{ style: { color: '#FFFFFF' } }}
          />

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

          <Button fullWidth variant="contained" onClick={handleRegister}>
            Register
          </Button>

          <Typography
            mt={2}
            textAlign="center"
            sx={{ cursor: 'pointer', color: '#8C89B4' }}
            onClick={() => navigate('/login')}
          >
            Already have an account? Login
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
          Join the Dashboard Experience
        </Typography>
        <Typography variant="subtitle1" mt={2}>
          Track. Analyze. Grow.
        </Typography>
      </Box>
    </Box>
  );
};

export default RegisterPage;
