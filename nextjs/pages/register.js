import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper, Snackbar, Alert, Box } from '@mui/material';
import { useRouter } from "next/router";

export default function AuthPage() {
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarSeverity, setSnackbarSeverity] = useState('success');

  const router = useRouter();

  const handleSnackbarClose = () => {
    setOpenSnackbar(false);
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:8000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: loginEmail,
          password_hash: loginPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Login failed');
      }

      const data = await response.json();
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      router.push("/region");
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerConfirmPassword) {
      setSnackbarMessage('Passwords do not match');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      const response = await fetch('http://localhost:8000/users/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username: registerName,
          email: registerEmail,
          password_hash: registerPassword,
        }),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.detail || 'Registration failed');
      }

      const data = await response.json();
      setSnackbarMessage('Registration successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      router.push("/region");
    } catch (error) {
      setSnackbarMessage(error.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <Grid container spacing={2} style={{
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'linear-gradient(135deg, #74ebd5, #ACB6E5)', // Gradient background
    }}>
      {/* Login Section */}
      <Grid item xs={12} sm={6}>
        <Paper elevation={6} style={{
          padding: '40px',
          borderRadius: '15px',
          background: '#ffffff',
          boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
        }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: '600', color: '#333' }}>
            Login
          </Typography>
          <form onSubmit={handleLoginSubmit}>
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={loginEmail}
              onChange={(e) => setLoginEmail(e.target.value)}
              InputProps={{
                style: { borderRadius: '8px' }
              }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={loginPassword}
              onChange={(e) => setLoginPassword(e.target.value)}
              InputProps={{
                style: { borderRadius: '8px' }
              }}
            />
            <Button variant="contained" color="primary" fullWidth style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
            }} type="submit">
              Login
            </Button>
          </form>
        </Paper>
      </Grid>

      {/* Register Section */}
      <Grid item xs={12} sm={6}>
        <Paper elevation={6} style={{
          padding: '40px',
          borderRadius: '15px',
          background: '#ffffff',
          boxShadow: '0px 8px 16px rgba(0,0,0,0.15)',
        }}>
          <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: '600', color: '#333' }}>
            Register
          </Typography>
          <form onSubmit={handleRegisterSubmit}>
            <TextField
              fullWidth
              label="Name"
              variant="outlined"
              margin="normal"
              value={registerName}
              onChange={(e) => setRegisterName(e.target.value)}
              InputProps={{
                style: { borderRadius: '8px' }
              }}
            />
            <TextField
              fullWidth
              label="Email"
              variant="outlined"
              margin="normal"
              type="email"
              value={registerEmail}
              onChange={(e) => setRegisterEmail(e.target.value)}
              InputProps={{
                style: { borderRadius: '8px' }
              }}
            />
            <TextField
              fullWidth
              label="Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={registerPassword}
              onChange={(e) => setRegisterPassword(e.target.value)}
              InputProps={{
                style: { borderRadius: '8px' }
              }}
            />
            <TextField
              fullWidth
              label="Confirm Password"
              variant="outlined"
              margin="normal"
              type="password"
              value={registerConfirmPassword}
              onChange={(e) => setRegisterConfirmPassword(e.target.value)}
              InputProps={{
                style: { borderRadius: '8px' }
              }}
            />
            <Button variant="contained" color="primary" fullWidth style={{
              marginTop: '16px',
              padding: '12px',
              borderRadius: '8px',
              fontWeight: '600',
            }} type="submit">
              Register
            </Button>
          </form>
        </Paper>
      </Grid>

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
