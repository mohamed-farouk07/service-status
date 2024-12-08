"use client";
import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Container, TextField, Button, Box, Typography, Alert } from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm, SubmitHandler } from "react-hook-form";
import Cookies from "js-cookie";

// Define the form inputs
interface LoginFormInputs {
  email: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormInputs>();
  const [loginError, setLoginError] = useState<string | null>(null);
  const [storedUser, setStoredUser] = useState<{ email: string; password: string } | null>(null);

  useEffect(() => {
    // If the user is already logged in, redirect them to the dashboard
    const userData = Cookies.get("user");
    if (userData) {
      router.replace("/dashboard");
    }
  }, [router]);

  useEffect(() => {
    // Fetch user data from localStorage
    const userData = localStorage.getItem("user");
    if (userData) {
      setStoredUser(JSON.parse(userData));
    }
  }, []);

  const handleLogin: SubmitHandler<LoginFormInputs> = (data) => {
    const { email, password } = data;

    // Validate with stored credentials
    if (storedUser?.email === email && storedUser?.password === password) {
      setLoginError(null);
      // Store user session in cookies (or localStorage)
      Cookies.set("user", JSON.stringify({ email, password }), { expires: 7 }); // Set cookie for 7 days
      router.push("/dashboard");
    } else {
      setLoginError("Invalid email or password. Please try again.");
    }
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Login
      </Typography>
      <AccountCircleIcon sx={{ fontSize: 70, color: "primary.main", mb: 2 }} />
      {loginError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {loginError}
        </Alert>
      )}
      <Box component="form" onSubmit={handleSubmit(handleLogin)} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label="Email"
          type="email"
          variant="outlined"
          fullWidth
          {...register("email", {
            required: "Email is required",
            pattern: {
              value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
              message: "Invalid email format",
            },
          })}
          error={!!errors.email}
          helperText={errors.email?.message}
        />
        <TextField
          label="Password"
          type="password"
          variant="outlined"
          fullWidth
          {...register("password", {
            required: "Password is required",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.password}
          helperText={errors.password?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Login
        </Button>
      </Box>
    </Container>
  );
};

export default LoginPage;
