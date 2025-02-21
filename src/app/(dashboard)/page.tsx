'use client'
import React from 'react'
import { Box } from '@mui/material'
import CharactersGrid from '@/components/pages/characters/CharactersGrid'

const Home = () => {
  return (
    <>
      <Box sx={{ flexGrow: 1, padding: 2 }}>
        <CharactersGrid />
      </Box>
    </>
  )
}

export default Home
