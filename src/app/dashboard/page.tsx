/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect, useState } from "react";
import { Container, Box, Typography, Tooltip } from "@mui/material";
import ErrorIcon from "@mui/icons-material/Error";
import WarningIcon from "@mui/icons-material/Warning";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import Header from "../components/Header";

// Function to generate the date for 90 days ago and the days up to today
const generateDates = () => {
  const today = new Date();
  const daysArray = [];

  for (let i = 0; i < 90; i++) {
    const day = new Date(today);
    day.setDate(today.getDate() - i); // Subtract 'i' days to get previous dates
    const formattedDate = day.toISOString().split("T")[0]; // Format date

    daysArray.push({
      day: i + 1,
      date: formattedDate,
      title: `Day ${i + 1}`,
      // Default description will be overwritten below
      description: "",
    });
  }

  return daysArray.reverse(); // Reverse so we start from 90 days ago
};

// Example API response for statuses and day information
const apiData = {
  statuses: ["green", "orange", "red"],
  days: generateDates(),
};

const DashboardPage: React.FC = () => {
  // State to store the percentage uptime calculated on the client side
  const [uptimePercentage, setUptimePercentage] = useState<string | null>(null);

  // Generate days with statuses and descriptions
  const { statuses, days } = apiData;

  const daysWithStatuses = days.map((day) => {
    // Randomly select a status for the day
    const status = statuses[Math.floor(Math.random() * statuses.length)];

    // Set the description based on the status
    let description = "";
    switch (status) {
      case "green":
        description = "No downtime recorded on this day.";
        break;
      case "orange":
        description =
          "Billing and Usage dashboard data not displaying for some users.";
        break;
      case "red":
        description = "ChatGPT Is Not Loading for Some Users.";
        break;
      default:
        description = "Unknown status";
    }

    return {
      ...day,
      status,
      description,
    };
  });

  useEffect(() => {
    // Count the number of green status days
    const greenDaysCount = daysWithStatuses.filter(
      (day) => day.status === "green"
    ).length;

    // Calculate the percentage of uptime (green days)
    const uptime = ((greenDaysCount / daysWithStatuses.length) * 100).toFixed(2);
    setUptimePercentage(uptime);
  }, []); // Run once when the component is mounted

  return (
    <>
      <Header />
      <Container maxWidth="lg" sx={{ mt: 5 }}>
        <Typography variant="h5" gutterBottom>
          API <span style={{ color: "#6c757d" }}>?</span>
        </Typography>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 2,
            border: "1px solid #ccc",
            borderRadius: 1,
            p: 2,
            backgroundColor: "#f9f9f9",
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 1,
              flexGrow: 1,
            }}
          >
            {/* Status Bars */}
            <Box
              display="flex"
              justifyContent="center"
              gap="2px"
              flexWrap="nowrap"
            >
              {daysWithStatuses.map((day) => (
                <Tooltip
                  key={day.day}
                  title={
                    day.status === "red" ? (
                      <>
                        <ErrorIcon sx={{ fontSize: 18, color: "red", mr: 1 }} />
                        {`${day.date}: ${day.title} - ${day.description}`}
                      </>
                    ) : day.status === "orange" ? (
                      <>
                        <WarningIcon
                          sx={{ fontSize: 18, color: "orange", mr: 1 }}
                        />
                        {`${day.date}: ${day.title} - ${day.description}`}
                      </>
                    ) : (
                      <>
                        <CheckCircleIcon
                          sx={{ fontSize: 18, color: "green", mr: 1 }}
                        />
                        {`${day.date}: ${day.title} - ${day.description}`}
                      </>
                    )
                  }
                  PopperProps={{
                    modifiers: [
                      {
                        name: "offset",
                        options: {
                          offset: [0, 10],
                        },
                      },
                      {
                        name: "preventOverflow",
                        options: {
                          boundary: "window",
                        },
                      },
                      {
                        name: "size",
                        options: {
                          styles: {
                            fontSize: "16px",
                            padding: "8px 16px",
                          },
                        },
                      },
                    ],
                  }}
                >
                  <Box
                    sx={{
                      width: "10px",
                      height: "40px",
                      backgroundColor: day.status,
                      cursor: "pointer",
                      "&:hover": {
                        transform: "scaleY(1.2)",
                      },
                    }}
                  />
                </Tooltip>
              ))}
            </Box>
            {/* Uptime Info */}
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-between",
                fontSize: "14px",
                color: "#6c757d",
              }}
            >
              <span>90 days ago</span>
              <span>{uptimePercentage ? `${uptimePercentage}% uptime` : "Loading..."}</span>
              <span>Today</span>
            </Box>
            <Typography variant="body1" color="green">
              Operational
            </Typography>
          </Box>
          <Box></Box>
        </Box>
      </Container>
    </>
  );
};

export default DashboardPage;
