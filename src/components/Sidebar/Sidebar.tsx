'use client'
import React from 'react'
import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material'
import {
  Category as CategoryIcon,
  LocalOffer as OffersIcon,
  Star as FeaturedIcon,
  Info as AboutIcon,
} from '@mui/icons-material'
import { useRouter } from 'next/navigation'

const Sidebar = () => {
  const router = useRouter()

  const menuItems = [
    { text: 'Categories', icon: <CategoryIcon />, path: '/categories' },
    { text: 'Special Offers', icon: <OffersIcon />, path: '/offers' },
    { text: 'Featured Items', icon: <FeaturedIcon />, path: '/featured' },
    { text: 'About', icon: <AboutIcon />, path: '/about' },
  ]

  return (
    <Paper elevation={3} sx={{ height: '100%', minWidth: '250px' }}>
      <Box sx={{ p: 2 }}>
        <List>
          {menuItems.map((item) => (
            <ListItem
              component="div"
              onClick={() => router.push(item.path)}
              key={item.text}
              sx={{
                mb: 1,
                borderRadius: 1,
                cursor: 'pointer',
                '&:hover': {
                  backgroundColor: 'rgba(8, 95, 146, 0.08)',
                },
              }}
            >
              <ListItemIcon sx={{ color: '#085F92' }}>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItem>
          ))}
        </List>
      </Box>
    </Paper>
  )
}

export default Sidebar
