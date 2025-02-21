import type { Metadata } from 'next'
import LoginForm from './LoginForm'
import { Box, Grid, Typography } from '@mui/material'
import React from 'react'
import Image from 'next/image'
import LoginPopUpIMG from '../../../../public/images/LoginPopUpIMG.png'
// const LoginPopUpIMG = '../../../../public/images/LoginPopUpIMG.png'

export const metadata: Metadata = {
  title: 'Login',
}

const LoginPage = () => {
  return (
    <Box sx={{ maxWidth: '1300px', margin: '0 auto', padding: '0 20px' }}>
      <Grid
        container
        spacing={2}
        sx={{
          minHeight: '100vh',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Grid item xs={12} md={6}>
          <Box sx={{ maxWidth: '600px', margin: '0 auto' }}>
            <Image
              src={LoginPopUpIMG}
              alt="LoginPopUpIMG"
              width={1000}
              height={1000}
              className="Image-Alignment Image-fit"
            />
          </Box>
        </Grid>
        <Grid item xs={12} md={6}>
          <Box
            sx={{
              maxWidth: '400px',
              margin: '0 auto',
              padding: '20px',
              // backgroundColor: '#e5e7eb',
              borderRadius: '12px',
              boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)',
            }}
          >
            <Typography
              variant="h4"
              sx={{
                fontWeight: 'bold',
                color: '#000',
                mb: 4,
                textAlign: 'center',
                fontFamily: 'sans-serif',
              }}
            >
              Log In
            </Typography>
            <LoginForm />
          </Box>
        </Grid>
      </Grid>
    </Box>
  )
}

export default LoginPage
