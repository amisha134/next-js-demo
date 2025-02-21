'use client'
import { Typography, Box } from '@mui/material'

export default function DashboardPage() {
  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <Typography variant="body1">
        Welcome to your dashboard! This is your dashboard content.
      </Typography>
    </Box>
  )
}
