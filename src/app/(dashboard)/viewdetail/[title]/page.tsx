'use client'
import { RootState } from '@/redux/store'
import type { Character } from '@/types/character'
import {
  Box,
  Card,
  Container,
  Grid,
  Typography,
  Paper,
  Chip,
  Button,
  CircularProgress,
} from '@mui/material'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'
import { useState, useEffect } from 'react'

type AvailabilityStatus = 'In Stock' | 'Out of Stock'

type PageParams = {
  params: {
    title: string
  }
  searchParams: { [key: string]: string | string[] | undefined }
}

interface CharactersState {
  results: Character[] | null
  loading: boolean
  error: string | null
}

export default function ProductDetail({ params }: PageParams) {
  const router = useRouter()
  const [isClient, setIsClient] = useState(false)
  const [loading, setLoading] = useState(true)
  const { results } = useSelector(
    (state: RootState) => state.characters as CharactersState
  )
  const decodedTitle = decodeURIComponent(params.title)

  useEffect(() => {
    if (!results?.length) {
      router.push('/characters')
      return
    }
    setIsClient(true)
    setLoading(false)
  }, [results, router])

  const product = results?.find(
    (item: Character) => item?.title === decodedTitle
  )

  if (loading || !isClient) {
    return (
      <Container sx={{ display: 'flex', justifyContent: 'center', p: 4 }}>
        <CircularProgress />
      </Container>
    )
  }

  if (!product) {
    return (
      <Container>
        <Button
          startIcon={<ArrowBackIcon />}
          onClick={() => router.back()}
          sx={{ mb: 3, mt: 2 }}
          variant="outlined"
        >
          Back
        </Button>
        <Typography variant="h5" color="error">
          Product not found
        </Typography>
      </Container>
    )
  }

  const productImage = product.images?.[0] || '/placeholder-image.jpg'

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{ mb: 3, mt: 2 }}
        variant="outlined"
      >
        Back
      </Button>
      <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={productImage}
              alt={product.title}
              sx={{
                width: '100%',
                height: 'auto',
                maxHeight: 400,
                objectFit: 'contain',
                borderRadius: 2,
                backgroundColor: '#f5f5f5',
              }}
            />
          </Grid>
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              gutterBottom
              color="primary"
              fontWeight="bold"
            >
              {product.title}
            </Typography>

            <Chip
              label={product.availabilityStatus}
              color={
                (product.availabilityStatus as AvailabilityStatus) ===
                'In Stock'
                  ? 'success'
                  : 'error'
              }
              sx={{ mb: 2 }}
            />

            <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
              Brand: {product.brand}
            </Typography>

            <Typography variant="body1" paragraph sx={{ mt: 2 }}>
              {product.description}
            </Typography>

            <Card sx={{ p: 2, mt: 2, bgcolor: '#f8f8f8' }}>
              <Grid container spacing={2}>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {product.category}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Discount
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {product.discountPercentage}%
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="subtitle2" color="text.secondary">
                    Warranty Information
                  </Typography>
                  <Typography variant="body1" fontWeight="medium">
                    {product.warrantyInformation}
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Paper>
    </Container>
  )
}
