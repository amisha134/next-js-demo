"use client";

import { Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/navigation";
import { keyframes } from "@mui/system";

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-20px); }
  100% { transform: translateY(0px); }
`;

const pulse = keyframes`
  0% { transform: scale(1); }
  50% { transform: scale(1.05); }
  100% { transform: scale(1); }
`;

export default function NotFound() {
  const router = useRouter();

  return (
    <Container>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          // background: "linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%)",
        }}
      >
        <Box
          sx={{
            animation: `${float} 3s ease-in-out infinite`,
            textAlign: "center",
          }}
        >
          <Typography
            variant="h1"
            sx={{
              fontSize: "150px",
              fontWeight: "bold",
              background: "linear-gradient(135deg, #085F92 0%, #68A0C1 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              textShadow: "2px 2px 20px rgba(8, 95, 146, 0.2)",
            }}
          >
            404
          </Typography>
          <Typography
            variant="h4"
            sx={{
              color: "#2c3e50",
              fontWeight: "500",
              marginBottom: 3,
              animation: `${pulse} 2s ease-in-out infinite`,
            }}
          >
            Oops! Page Not Found
          </Typography>
        </Box>
        <Typography
          variant="body1"
          sx={{
            color: "#34495e",
            textAlign: "center",
            maxWidth: "500px",
            marginBottom: 4,
          }}
        >
          The page you're looking for seems to have wandered off. Let's get you back on track!
        </Typography>
        <Button
          variant="contained"
          onClick={() => router.push("/")}
          sx={{
            textTransform: "none",
            padding: "12px 30px",
            fontSize: "1.1rem",
            borderRadius: "30px",
            background: "linear-gradient(135deg, #085F92 0%, #68A0C1 100%)",
            boxShadow: "0 4px 15px rgba(8, 95, 146, 0.3)",
            transition: "all 0.3s ease",
            "&:hover": {
              background: "linear-gradient(120deg, #68A0C1 0%, #085F92 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 20px rgba(8, 95, 146, 0.4)",
            },
          }}
        >
          Return Home
        </Button>
      </Box>
    </Container>
  );
}
