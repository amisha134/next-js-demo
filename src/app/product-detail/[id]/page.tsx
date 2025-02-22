'use client'
import { useEffect, useState } from 'react'
import {
  Box,
  Typography,
  Card,
  CardMedia,
  CardContent,
  Grid,
  Rating,
  Chip,
  Divider,
  Button,
} from '@mui/material'
import LocalOfferIcon from '@mui/icons-material/LocalOffer'
import VerifiedIcon from '@mui/icons-material/Verified'
import ArrowBackIcon from '@mui/icons-material/ArrowBack'
import { useParams, useRouter } from 'next/navigation'
import HttpClient from '@/libs/http'
import { API_ROUTES } from '@/config/constants'
import { ProductType } from '@/types/data'

export default function ProductDetail() {
  const { id } = useParams()
  const router = useRouter()
  const [product, setProduct] = useState<ProductType | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await HttpClient.get<ProductType>(
          `${API_ROUTES.SHOW}/${id}`
        )

        setProduct(response?.data) // Now response.data is of type ProductType
      } catch (error) {
        console.error('Error fetching product details:', error)
        setError('Failed to load product details')
      }
    }

    if (id) {
      fetchProductDetail()
    }
  }, [id])

  if (error) {
    return <Typography color="error">{error}</Typography>
  }

  if (!product) {
    return <Typography>Loading...</Typography>
  }

  return (
    <>
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{
          mb: 3,
          ml: 8,
          color: '#045F97',
          backgroundColor: 'rgba(8, 0, 255, 0.04)',
          '&:hover': {
            backgroundColor: 'rgba(89, 124, 145, 0.04)',
          },
        }}
      >
        Back to Products
      </Button>
      <Box
        sx={{
          p: 8,
          minHeight: '100vh',
          //   background: 'linear-gradient(145deg, #f6f8fb 0%, #e9eef5 100%)',
          backgroundColor: 'rgba(255, 255, 255, 0.9)',
        }}
      >
        <Card
          elevation={3}
          sx={{
            borderRadius: 4,
            overflow: 'hidden',
            p: 2,
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
          }}
        >
          <Grid container spacing={4}>
            <Grid item xs={12} md={6}>
              <Card
                elevation={2}
                sx={{
                  borderRadius: 3,
                  overflow: 'hidden',
                  position: 'relative',
                }}
              >
                <CardMedia
                  component="img"
                  height="500"
                  image={product?.images?.[0]}
                  alt={product?.title}
                  sx={{
                    objectFit: 'contain',
                    backgroundColor: '#f5f5f5',
                  }}
                />
                {product?.discountPercentage && (
                  <Chip
                    label={`${product.discountPercentage}% OFF`}
                    color="error"
                    icon={<LocalOfferIcon />}
                    sx={{
                      position: 'absolute',
                      top: 16,
                      right: 16,
                      fontSize: '1rem',
                    }}
                  />
                )}
              </Card>
            </Grid>
            <Grid item xs={12} md={6}>
              <CardContent sx={{ p: 3 }}>
                <Typography
                  variant="h3"
                  gutterBottom
                  sx={{
                    fontWeight: 600,
                    color: '#045F97',
                    mb: 2,
                  }}
                >
                  {product?.title}
                </Typography>

                <Box sx={{ display: 'flex', alignItems: 'center', mb: 3 }}>
                  <Typography
                    variant="h4"
                    color="primary"
                    sx={{ fontWeight: 'bold', mr: 2, color: '#68A0C1' }}
                  >
                    ${product?.price}
                  </Typography>
                  {product?.discountPercentage && (
                    <Typography
                      variant="h6"
                      sx={{
                        textDecoration: 'line-through',
                        color: 'text.secondary',
                      }}
                    >
                      $
                      {Math.round(
                        product.price * (1 + product.discountPercentage / 100)
                      )}
                    </Typography>
                  )}
                </Box>

                <Box sx={{ mb: 3 }}>
                  <Rating value={4.5} readOnly precision={0.5} size="large" />
                </Box>

                <Divider sx={{ my: 3 }} />

                <Typography
                  variant="body1"
                  sx={{
                    fontSize: '1.1rem',
                    lineHeight: 1.8,
                    color: 'text.secondary',
                    mb: 3,
                  }}
                >
                  {product?.description}
                </Typography>

                <Grid container spacing={2} sx={{ mb: 3 }}>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Brand
                    </Typography>
                    <Typography variant="h6">{product?.brand}</Typography>
                  </Grid>
                  <Grid item xs={6}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Category
                    </Typography>
                    <Typography variant="h6">{product?.category}</Typography>
                  </Grid>
                </Grid>

                <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  <Chip
                    icon={<VerifiedIcon />}
                    label={`Status: ${product?.availabilityStatus}`}
                    color="success"
                    variant="outlined"
                  />
                  <Chip
                    sx={{ color: '#045F97' }}
                    label={`Warranty: ${product?.warrantyInformation}`}
                    variant="outlined"
                  />
                </Box>
              </CardContent>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </>
  )
}
