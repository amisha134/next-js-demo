'use client'
import {
  Avatar,
  Box,
  Card,
  Container,
  Grid,
  Paper,
  Stack,
  Typography,
  useTheme,
} from '@mui/material'

import {
  BiSolidBarChartAlt2,
  BiSolidBox,
  BiSolidGroup,
  BiSolidShoppingBag,
  BiSolidStar,
  BiTrendingUp,
} from 'react-icons/bi'

const HomePage = () => {
  const theme = useTheme()

  const stats = [
    {
      title: 'Total Products',
      value: '150+',
      icon: <BiSolidBox size={24} />,
      color: theme.palette.primary.main,
    },
    {
      title: 'Active Users',
      value: '1.2k',
      icon: <BiSolidGroup size={24} />,
      color: theme.palette.success.main,
    },
    {
      title: 'Total Sales',
      value: '$50k',
      icon: <BiSolidShoppingBag size={24} />,
      color: theme.palette.warning.main,
    },
    {
      title: 'Customer Rating',
      value: '4.8/5',
      icon: <BiSolidStar size={24} />,
      color: theme.palette.error.main,
    },
  ]

  const insights = [
    {
      title: 'Top Selling Products',
      icon: <BiTrendingUp size={24} />,
      content: 'Premium Skincare Set leads sales this month',
      color: theme.palette.info.light,
    },
    {
      title: 'Sales Analytics',
      icon: <BiSolidBarChartAlt2 size={24} />,
      content: '25% increase in revenue compared to last month',
      color: theme.palette.success.light,
    },
  ]

  return (
    <Container maxWidth="lg">
      <Typography
        variant="h4"
        sx={{
          mb: 4,
          fontWeight: 'bold',
          color: '#085F92',
          justifyContent: 'center',
          display: 'flex',
        }}
      >
        Beauty Products Dashboard
      </Typography>

      <Grid container spacing={3}>
        {stats.map((stat, index) => (
          <Grid item xs={12} sm={6} md={3} key={index}>
            <Paper
              elevation={3}
              sx={{
                p: 3,
                borderRadius: 2,
                background: `linear-gradient(45deg, ${stat.color}15, ${stat.color}08)`,
                border: `1px solid ${stat.color}30`,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center">
                <Avatar
                  sx={{
                    bgcolor: stat.color,
                    width: 56,
                    height: 56,
                  }}
                >
                  {stat.icon}
                </Avatar>
                <Box>
                  <Typography variant="body2" color="text.secondary">
                    {stat.title}
                  </Typography>
                  <Typography variant="h5" fontWeight="bold">
                    {stat.value}
                  </Typography>
                </Box>
              </Stack>
            </Paper>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3} sx={{ mt: 3 }}>
        {insights.map((insight, index) => (
          <Grid item xs={12} md={6} key={index}>
            <Card
              sx={{
                p: 3,
                height: '100%',
                borderRadius: 2,
                boxShadow: theme.shadows[3],
                background: `linear-gradient(45deg, ${insight.color}15, ${insight.color}08)`,
                border: `1px solid ${insight.color}30`,
              }}
            >
              <Stack direction="row" spacing={2} alignItems="center" mb={2}>
                <Avatar sx={{ bgcolor: insight.color }}>{insight.icon}</Avatar>
                <Typography variant="h6" fontWeight="bold">
                  {insight.title}
                </Typography>
              </Stack>
              <Typography variant="body1" color="text.secondary">
                {insight.content}
              </Typography>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box sx={{ mt: 4 }}>
        <Paper
          elevation={3}
          sx={{
            p: 3,
            borderRadius: 2,
            background: `linear-gradient(45deg, ${theme.palette.primary.main}15, ${theme.palette.primary.main}08)`,
            border: `1px solid ${theme.palette.primary.main}30`,
          }}
        >
          <Typography variant="h5" color="primary" fontWeight="bold" mb={2}>
            Latest Updates
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Welcome to our beauty products dashboard. Here you can manage your
            products, view analytics, and track your sales performance.
          </Typography>
        </Paper>
      </Box>
    </Container>
  )
}

export default HomePage
