"use client";
import React, { useState } from "react";
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
  Button,
  TextField,
  InputAdornment,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";

import { fetchCharacters } from "@/redux/slices/characters";
import type { AppDispatch, RootState } from "@/redux/store";

const CharactersGrid = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { results, currentPage } = useSelector((state: RootState) => state.characters);
  const [page, setPage] = useState(1);
  const [searchTerm, setSearchTerm] = useState("");
  const rowsPerPage = 10;
  const router = useRouter();

  useEffect(() => {
    dispatch(fetchCharacters());
  }, [dispatch, currentPage]);

  const handlePageChange = (_: React.ChangeEvent<unknown>, value: number) => {
    setPage(value);
  };

  const handleViewProduct = (productId: number) => {
    router.push(`/product-detail/${productId.toString()}`);
  };

  const handleSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(event.target.value);
    setPage(1); // Reset to first page when searching
  };

  // Filter results based on search term
  const filteredResults = results.filter((character) => character.title.toLowerCase().includes(searchTerm.toLowerCase()));

  // Calculate pagination with filtered results
  const startIndex = (page - 1) * rowsPerPage;
  const endIndex = startIndex + rowsPerPage;
  const paginatedResults = filteredResults.slice(startIndex, endIndex);
  const totalPages = Math.ceil(filteredResults.length / rowsPerPage);

  return (
    <Box
      sx={{
        width: "100%",
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden", // Add this
      }}
    >
      {/* Header with search */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          p: 3, // Add padding
          gap: 2,
          position: "sticky",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            fontWeight: 600,
            color: "#2972ab",
            minWidth: "max-content",
          }}
        >
          Product List
        </Typography>

        <TextField
          size="small"
          variant="outlined"
          placeholder="Search products..."
          value={searchTerm}
          onChange={handleSearch}
          sx={{
            width: "300px",
            backgroundColor: "white",
            "& .MuiOutlinedInput-root": {
              "&:hover fieldset": {
                borderColor: "#085F92",
              },
              "& fieldset": {
                borderColor: "#e0e0e0",
              },
            },
          }}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "#666" }} />
              </InputAdornment>
            ),
          }}
        />
      </Box>

      {/* Scrollable Table Container */}
      <TableContainer
        component={Paper}
        sx={{
          flex: 1,
          overflow: "auto",
          boxShadow: "none",
          maxHeight: "calc(90vh - 180px)", // Adjust height to account for header and pagination
          "&::-webkit-scrollbar": {
            width: "8px",
            height: "8px",
          },
          "&::-webkit-scrollbar-track": {
            background: "#f1f1f1",
          },
          "&::-webkit-scrollbar-thumb": {
            background: "#888",
            borderRadius: "4px",
          },
          "&::-webkit-scrollbar-thumb:hover": {
            background: "#555",
          },
        }}
      >
        <Table sx={{ minWidth: 650 }} aria-label="product table">
          <TableHead>
            <TableRow sx={{ backgroundColor: "#f5f5f5" }}>
              <TableCell>Image</TableCell>
              <TableCell>Title</TableCell>
              <TableCell>Status</TableCell>
              <TableCell>Category</TableCell>
              <TableCell>Discount</TableCell>
              <TableCell>Price</TableCell>
              <TableCell>Brand</TableCell>
              <TableCell>Warranty</TableCell>
              <TableCell>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {paginatedResults?.map((character) => (
              <TableRow key={character?.title} sx={{ "&:hover": { backgroundColor: "#f8f8f8" } }}>
                <TableCell onClick={() => handleViewProduct(character?.id)} sx={{ cursor: "pointer" }}>
                  <Box
                    component="img"
                    src={character?.images?.[0]}
                    alt={character?.title}
                    sx={{
                      width: 60,
                      height: 60,
                      objectFit: "contain",
                      backgroundColor: "#f5f5f5",
                    }}
                  />
                </TableCell>
                <TableCell onClick={() => handleViewProduct(character?.id)} sx={{ cursor: "pointer" }}>
                  {character?.title ?? "-"}
                </TableCell>
                <TableCell>{character?.availabilityStatus ?? "-"}</TableCell>
                <TableCell>{character?.category ?? "-"}</TableCell>
                <TableCell>{character?.discountPercentage ?? 0} %</TableCell>
                <TableCell>$ {character?.price ?? 0}</TableCell>
                <TableCell>{character?.brand ?? "-"}</TableCell>
                <TableCell>{character?.warrantyInformation ?? "-"}</TableCell>
                <TableCell>
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleViewProduct(character?.id)}
                    sx={{
                      textTransform: "none",
                      background: "linear-gradient(135deg, #085F92 0%, #68A0C1 100%)",
                      "&:hover": {
                        background: "linear-gradient(120deg,rgb(110, 182, 220) 0%,rgb(5, 107, 167) 100%)",
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

      {/* Sticky Pagination */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          gap: 4,
          p: 2,
          borderTop: "1px solid #e0e0e0",
          backgroundColor: "white",
          // position: "sticky",
          // bottom: 0,
          // zIndex: 1,
        }}
      >
        <Pagination
          count={totalPages}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded"
          color="primary"
          sx={{
            "& .MuiPaginationItem-root.Mui-selected": {
              backgroundColor: "#085F92",
              color: "white",
              "&:hover": {
                backgroundColor: "#068FCA",
              },
            },
          }}
        />
        <Typography variant="body2" color="text.secondary">
          {filteredResults.length} products found
        </Typography>
      </Box>
    </Box>
  );
};

export default CharactersGrid;
