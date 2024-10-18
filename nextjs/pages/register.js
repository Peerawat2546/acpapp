import React, { useState } from "react";
import { TextField, Button, Grid, Typography, Paper, Snackbar, Alert, Box, Divider } from '@mui/material';
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
    <Grid container style={{
      height: '100vh',
      justifyContent: 'center',
      alignItems: 'center',
      background: 'radial-gradient(circle at top, #6dd5ed, #2193b0)', // Adds a radial gradient
      position: 'relative',
      overflow: 'hidden',
    }}>
      {/* Diagonal stripes background */}
      <Box sx={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        backgroundImage: 'linear-gradient(135deg, rgba(255,255,255,0.1) 25%, transparent 25%, transparent 50%, rgba(255,255,255,0.1) 50%, rgba(255,255,255,0.1) 75%, transparent 75%, transparent)',
        backgroundSize: '40px 40px',
        zIndex: 0,
        opacity: 0.4,
      }} />

      {/* Abstract shapes (e.g., circles) for extra design elements */}
      <Box sx={{
        position: 'absolute',
        top: '30%',
        right: '-50px',
        width: '200px',
        height: '200px',
        background: 'rgba(255, 255, 255, 0.2)',
        borderRadius: '50%',
        zIndex: 0,
      }} />
      <Box sx={{
        position: 'absolute',
        bottom: '20%',
        left: '-60px',
        width: '250px',
        height: '250px',
        background: 'rgba(255, 255, 255, 0.15)',
        borderRadius: '50%',
        zIndex: 0,
      }} />

      {/* Main Box */}
      <Box sx={{
        background: 'rgba(255, 255, 255, 0.85)', // Slightly transparent white background
        padding: '50px',
        borderRadius: '25px',
        boxShadow: '0 16px 40px rgba(0,0,0,0.25)', // Softer, larger shadow
        maxWidth: '900px',
        width: '100%',
        display: 'flex',
        justifyContent: 'space-between',
        flexDirection: { xs: 'column', sm: 'row' },
        position: 'relative',
        zIndex: 1,
      }}>
        {/* Background design element */}
        <Box sx={{
          position: 'absolute',
          top: '-20px',
          left: '50%',
          width: '150px',
          height: '150px',
          background: 'linear-gradient(135deg, rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0))',
          borderRadius: '50%',
          transform: 'translateX(-50%)',
          zIndex: -1,
        }} />
        
        {/* Login Section */}
        <Box sx={{ flex: 1, marginRight: { xs: 0, sm: '20px' }, marginBottom: { xs: '20px', sm: 0 } }}>
          <Paper elevation={6} style={{
            padding: '30px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
          }}>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: '700', color: '#333' }}>
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
                InputProps={{ style: { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={loginPassword}
                onChange={(e) => setLoginPassword(e.target.value)}
                InputProps={{ style: { borderRadius: '12px' } }}
              />
              <Button variant="contained" color="primary" fullWidth style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '700',
                background: 'linear-gradient(45deg, #2193b0, #6dd5ed)', // Gradient button
              }} type="submit">
                Login
              </Button>
            </form>
          </Paper>
        </Box>

        {/* Divider for large screens */}
        <Divider orientation="vertical" flexItem sx={{
          display: { xs: 'none', sm: 'block' },
          marginRight: '20px',
          borderColor: 'rgba(0,0,0,0.1)'
        }} />

        {/* Register Section */}
        <Box sx={{ flex: 1 }}>
          <Paper elevation={6} style={{
            padding: '30px',
            borderRadius: '20px',
            background: 'rgba(255, 255, 255, 0.8)',
            backdropFilter: 'blur(10px)',
            boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.2)',
          }}>
            <Typography variant="h5" gutterBottom style={{ textAlign: 'center', fontWeight: '700', color: '#333' }}>
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
                InputProps={{ style: { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="Email"
                variant="outlined"
                margin="normal"
                type="email"
                value={registerEmail}
                onChange={(e) => setRegisterEmail(e.target.value)}
                InputProps={{ style: { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={registerPassword}
                onChange={(e) => setRegisterPassword(e.target.value)}
                InputProps={{ style: { borderRadius: '12px' } }}
              />
              <TextField
                fullWidth
                label="Confirm Password"
                variant="outlined"
                margin="normal"
                type="password"
                value={registerConfirmPassword}
                onChange={(e) => setRegisterConfirmPassword(e.target.value)}
                InputProps={{ style: { borderRadius: '12px' } }}
              />
              <Button variant="contained" color="primary" fullWidth style={{
                marginTop: '16px',
                padding: '12px',
                borderRadius: '12px',
                fontWeight: '700',
                background: 'linear-gradient(45deg, #2193b0, #6dd5ed)',
              }} type="submit">
                Register
              </Button>
            </form>
          </Paper>
        </Box>
      </Box>

      {/* Snackbar for notifications */}
      <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity={snackbarSeverity} sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Grid>
  );
}
