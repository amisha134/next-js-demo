import { Box, IconButton, Typography } from '@mui/material'
import {
  RiFacebookFill,
  RiGithubFill,
  RiGoogleFill,
  RiTwitterXFill,
} from 'react-icons/ri'

const ThirdPartyAuth = () => (
  <Box sx={{ textAlign: 'center', mt: 3 }}>
    <Typography variant={'h6'}>Log In using</Typography>
    <Box sx={{ mt: '1.5rem' }}>
      <IconButton size="small">
        <RiGoogleFill />
      </IconButton>
      <IconButton size="small">
        <RiFacebookFill />
      </IconButton>
      <IconButton size="small">
        <RiTwitterXFill />
      </IconButton>
      <IconButton size="small">
        <RiGithubFill />
      </IconButton>
    </Box>
  </Box>
)

export default ThirdPartyAuth
