import React, { useState } from 'react';
import { Button, TextField, Grid, Paper, Typography, Snackbar } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [errorOpen, setErrorOpen] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (event) => {
    event.preventDefault();

    if (username === 'admin' && password === 'password') {
      onLogin();
      navigate('/dashboard');
    } else {
      setErrorOpen(true);
    }
  };

  const handleCloseError = () => {
    setErrorOpen(false);
  };

  return (
    <Grid container justify="center">
      <Grid item component={Paper} elevation={2} square xs={12} sm={8} md={5}>
        <form onSubmit={handleSubmit} style={{ margin: '2em' }}>
          <Typography component="h1" variant="h5" align="center">
            Login
          </Typography>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            style={{ marginTop: '1em' }}
          >
            Sign In
          </Button>
        </form>
      </Grid>
      <Snackbar
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        open={errorOpen}
        onClose={handleCloseError}
        message="Invalid credentials"
        autoHideDuration={3000}
      />
    </Grid>
  );
}

export default Login;
