'use client'
import React, { useState } from 'react'
import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Box,
  Typography,
  Pagination,
  Stack,
  Button,
} from '@mui/material'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRouter } from 'next/navigation'

import { fetchCharacters } from '@/redux/slices/characters'
import type { AppDispatch, RootState } from '@/redux/store'

const CharactersGrid = () => {
  const dispatch = useDispatch<AppDispatch>()
  const { results, currentPage } = useSelector(
    (state: RootState) => state.characters
  )
  const [page, setPage] = useState(1)
  const rowsPerPage = 10
  const router = useRouter()

  useEffect(() => {
    dispatch(fetchCharacters())
  }, [dispatch, currentPage])

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value)
  }

  const handleViewProduct = (productId: number) => {
    router.push(`/product-detail/${productId.toString()}`)
  }

  // Calculate pagination
  const startIndex = (page - 1) * rowsPerPage
  const endIndex = startIndex + rowsPerPage
  const paginatedResults = results.slice(startIndex, endIndex)
  const totalPages = Math.ceil(results.length / rowsPerPage)

  return (
    <Box sx={{ width: '100%' }}>
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow sx={{ backgroundColor: '#f5f5f5' }}>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Description</TableCell>
              <TableCell>Warranty</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResults.map((character) => (
              <TableRow
                key={character.title}
                sx={{ '&:hover': { backgroundColor: '#f8f8f8' } }}
              >
                <TableCell>
                  <Box
                    component="img"
                    src={character.images?.[0]}
                    alt={character.title}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: 'contain',
                      backgroundColor: '#f5f5f5',
                    }}
                  />
                </TableCell>
                <TableCell>{character?.title}</TableCell>
                <TableCell>{character?.availabilityStatus}</TableCell>
                <TableCell>{character?.category}</TableCell>
                <TableCell>{character?.discountPercentage}%</TableCell>
                <TableCell>{character?.brand}</TableCell>
                <TableCell>
                  <Typography
                    sx={{
                      display: '-webkit-box',
                      WebkitLineClamp: 1,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden',
                      maxWidth: 200,
                    }}
                  >
                    {character?.description}
                  </Typography>
                </TableCell>
                <TableCell>{character?.warrantyInformation}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewProduct(character.id)}
                    sx={{
                      background:
                        'linear-gradient(135deg, #085F92 0%, #68A0C1 100%)',
                      '&:hover': {
                        background:
                          'linear-gradient(120deg,rgb(110, 182, 220) 0%,rgb(5, 107, 167) 100%)',
                      },
                    }}
                  >
                    View
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Stack spacing={2} sx={{ mt: 2, mb: 2, alignItems: 'center' }}>
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
        />
      </Stack>
    </Box>
  )
}

export default CharactersGrid
