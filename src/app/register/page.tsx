"use client";
import React from "react";
import { useRouter } from "next/navigation";
import {
  Container,
  TextField,
  Button,
  Box,
  Typography,
  Alert,
} from "@mui/material";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import { useForm, SubmitHandler } from "react-hook-form";
import Link from "next/link";

// Define the form inputs
interface RegisterFormInputs {
  email: string;
  password: string;
  confirmPassword: string;
}

const RegisterPage: React.FC = () => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterFormInputs>();
  const [registerError, setRegisterError] = React.useState<string | null>(null);

  const handleRegister: SubmitHandler<RegisterFormInputs> = (data) => {
    const { email, password, confirmPassword } = data;

    // Validate passwords match
    if (password !== confirmPassword) {
      setRegisterError("Passwords do not match.");
      return;
    }

    // Save user data in localStorage
    localStorage.setItem("user", JSON.stringify({ email, password }));

    setRegisterError(null);
    router.push("/login");
  };

  return (
    <Container maxWidth="xs" sx={{ mt: 5, textAlign: "center" }}>
      <Typography variant="h3" gutterBottom>
        Register
      </Typography>
      <AccountCircleIcon sx={{ fontSize: 70, color: "primary.main", mb: 2 }} />
      {registerError && (
        <Alert severity="error" sx={{ mb: 2 }}>
          {registerError}
        </Alert>
      )}
      <Box
        component="form"
        onSubmit={handleSubmit(handleRegister)}
        sx={{ display: "flex", flexDirection: "column", gap: 2 }}
      >
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
        <TextField
          label="Confirm Password"
          type="password"
          variant="outlined"
          fullWidth
          {...register("confirmPassword", {
            required: "Please confirm your password",
            minLength: {
              value: 6,
              message: "Password must be at least 6 characters",
            },
          })}
          error={!!errors.confirmPassword}
          helperText={errors.confirmPassword?.message}
        />
        <Button type="submit" variant="contained" color="primary" fullWidth>
          Register
        </Button>
      </Box>

      {/* Link to Login Page */}
      <Box sx={{ mt: 2 }}>
        <Typography variant="body2">
          Already have an account?{" "}
          <Link href="/login" style={{ color: "#1976d2" }}>
            Login
          </Link>
        </Typography>
      </Box>
    </Container>
  );
};

export default RegisterPage;
