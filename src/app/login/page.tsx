"use client";
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { Container, TextField, Button, Box, Typography } from '@mui/material';

// Static credentials for validation
const STATIC_CREDENTIALS = {
  email: "test@example.com",
  password: "password123",
};

const LoginPage: React.FC = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    // Validate static credentials
    if (email === STATIC_CREDENTIALS.email && password === STATIC_CREDENTIALS.password) {
      router.push('/dashboard');
    } else {
      setError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        Login
      </Typography>
      <Box
        component="form"
        onSubmit={(e) => {
          e.preventDefault();
          handleLogin();
        }}
        sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
      >
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          required
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          required
        />
        {error && (
          <Typography variant="body2" color="error">
            {error}
          </Typography>
        )}
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
