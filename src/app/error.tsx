"use client";

import { Button, Container, Typography, Box } from "@mui/material";
import { useEffect } from "react";

export default function Error({ error, reset }: { error: Error & { digest?: string }; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <Container>
      <Box
        sx={{
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          gap: 2,
        }}
      >
        <Typography variant="h1" color="error">
          Something went wrong!
        </Typography>
        <Button
          variant="contained"
          onClick={reset}
          sx={{
            background: "linear-gradient(135deg, #085F92 0%, #68A0C1 100%)",
            "&:hover": {
              background: "linear-gradient(120deg,rgb(110, 182, 220) 0%,rgb(5, 107, 167) 100%)",
            },
          }}
        >
          Try again
        </Button>
      </Box>
    </Container>
  );
}
