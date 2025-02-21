'use client'
import React from 'react'
import { Box, Grid } from '@mui/material'
import Sidebar from '@/components/Sidebar/Sidebar'
import CharacterDetail from './CharacterDetail' // Assuming you have this component

const CharacterDetailPage = ({ params }: { params: { slug: string } }) => {
  return (
    <Box sx={{ display: 'flex', minHeight: '100vh', p: 3 }}>
      <Grid container spacing={3}>
        <Grid item xs={12} md={3}>
          <Sidebar />
        </Grid>
        <Grid item xs={12} md={9}>
          <CharacterDetail slug={params.slug} />
        </Grid>
      </Grid>
    </Box>
  )
}

export default CharacterDetailPage
