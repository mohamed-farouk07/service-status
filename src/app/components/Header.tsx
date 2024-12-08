"use client";
import React from "react";
import { Box, Typography, Button } from "@mui/material";
import Image from "next/image";
import openaiLogo from "../../../public/openai.svg";
import Cookies from "js-cookie";
import { useRouter } from "next/navigation";

const Header: React.FC = () => {
  const router = useRouter();

  // Logout handler function
  const handleLogout = () => {
    Cookies.remove("user");
    router.replace("/login");
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
        padding: "16px 24px",
        backgroundColor: "#f8fafc",
        borderBottom: "1px solid #e0e0e0",
      }}
    >
      {/* Logo */}
      <Box display="flex" alignItems="center" gap={1}>
        <Image
          src={openaiLogo}
          alt="Logo"
          style={{ height: "40px", width: "auto" }}
        />
        <Typography variant="h6" fontWeight="bold">
          OpenAI
        </Typography>
      </Box>

      {/* Buttons */}
      <Box display="flex" alignItems="center" gap={2}>
        {/* Subscribe Button */}
        <Button
          variant="contained"
          color="success"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            borderRadius: "20px",
          }}
        >
          Subscribe to updates
        </Button>

        {/* Logout Button */}
        <Button
          variant="contained"
          color="error"
          sx={{
            textTransform: "uppercase",
            fontWeight: "bold",
            borderRadius: "20px",
          }}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </Box>
    </Box>
  );
};

export default Header;
