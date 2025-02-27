"use client";
import { useEffect, useState } from "react";
import { Box, Typography, Card, CardMedia, CardContent, Grid, Rating, Chip, Divider, Button, Container } from "@mui/material";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useParams, useRouter } from "next/navigation";
import HttpClient from "@/libs/http";
import { API_ROUTES } from "@/config/constants";
import { ProductType } from "@/types/data";

export default function ProductDetail() {
  const { id } = useParams();
  const router = useRouter();
  const [product, setProduct] = useState<ProductType | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [selectedImage, setSelectedImage] = useState<string>("");

  useEffect(() => {
    const fetchProductDetail = async () => {
      try {
        const response = await HttpClient.get<ProductType>(`${API_ROUTES.SHOW}/${id}`);
        setProduct(response?.data);
        setSelectedImage(response?.data?.images?.[0] || "");
      } catch {
        setError("Failed to load product details");
      }
    };

    if (id) {
      fetchProductDetail();
    }
  }, [id]);

  if (error) return <Typography color="error">{error}</Typography>;
  if (!product) return <Typography>Loading...</Typography>;

  return (
    <Container maxWidth="lg">
      <Button
        startIcon={<ArrowBackIcon />}
        onClick={() => router.back()}
        sx={{
          my: 2,
          color: "#045F97",
          backgroundColor: "rgba(8, 0, 255, 0.04)",
          "&:hover": { backgroundColor: "rgba(89, 124, 145, 0.04)" },
        }}
      >
        Back to Products
      </Button>

      <Card elevation={3} sx={{ borderRadius: 2, overflow: "hidden", mb: 3 }}>
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Box sx={{ p: 2 }}>
              <Card elevation={2} sx={{ borderRadius: 2, overflow: "hidden", position: "relative", mb: 2 }}>
                <CardMedia
                  component="img"
                  height="400"
                  image={selectedImage || product?.images[0]}
                  alt={product?.title}
                  sx={{
                    objectFit: "contain",
                    backgroundColor: "#f5f5f5",
                  }}
                />
                {product?.discountPercentage && (
                  <Chip
                    label={`${product?.discountPercentage}% OFF`}
                    color="error"
                    icon={<LocalOfferIcon />}
                    sx={{
                      position: "absolute",
                      top: 12,
                      right: 12,
                      fontSize: "0.8rem",
                    }}
                  />
                )}
              </Card>

              {/* Thumbnail Gallery */}
              <Box sx={{ display: "flex", gap: 1, overflowX: "auto", pb: 1 }}>
                {product?.images?.map((img, index) => (
                  <Box
                    key={index}
                    onClick={() => setSelectedImage(img)}
                    sx={{
                      width: 60,
                      height: 60,
                      borderRadius: 1,
                      overflow: "hidden",
                      cursor: "pointer",
                      border: selectedImage === img ? "2px solid #045F97" : "2px solid transparent",
                    }}
                  >
                    <img
                      src={img}
                      alt={`${product.title} - ${index + 1}`}
                      style={{
                        width: "100%",
                        height: "100%",
                        objectFit: "cover",
                      }}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Grid>

          <Grid item xs={12} md={6}>
            <CardContent sx={{ p: 3 }}>
              <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, color: "#045F97" }}>
                {product.title}
              </Typography>

              <Box sx={{ display: "flex", alignItems: "center", mb: 2, mt: 1 }}>
                <Typography variant="h4" sx={{ fontWeight: "bold", mr: 2, color: "#68A0C1" }}>
                  ${product.price}
                </Typography>
                {product.discountPercentage && (
                  <Typography variant="h6" sx={{ textDecoration: "line-through", color: "text.secondary" }}>
                    ${Math.round(product.price * (1 + product.discountPercentage / 100))}
                  </Typography>
                )}
              </Box>

              <Box sx={{ mb: 3 }}>
                <Rating value={4.5} readOnly precision={0.5} size="medium" />
                <Typography variant="body2" color="text.secondary" sx={{ mt: 0.5 }}>
                  Based on customer reviews
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Typography variant="subtitle1" sx={{ mb: 1, color: "#045F97", fontWeight: 600 }}>
                Product Description
              </Typography>
              <Typography variant="body2" sx={{ lineHeight: 1.6, color: "text.secondary", mb: 3 }}>
                {product.description}
              </Typography>

              <Grid container spacing={2} sx={{ mb: 3 }}>
                {/* Product details grid items */}
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Brand
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {product.brand}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Category
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {product.category}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Stock Status
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {product.availabilityStatus}
                  </Typography>
                </Grid>
                <Grid item xs={6}>
                  <Typography variant="body2" color="text.secondary">
                    Warranty
                  </Typography>
                  <Typography variant="subtitle2" sx={{ fontWeight: 500 }}>
                    {product.warrantyInformation}
                  </Typography>
                </Grid>
              </Grid>

              <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                <Button
                  variant="contained"
                  size="medium"
                  sx={{
                    backgroundColor: "#045F97",
                    "&:hover": { backgroundColor: "#034670" },
                    px: 3,
                  }}
                >
                  Add to Cart
                </Button>
                <Button
                  variant="outlined"
                  size="medium"
                  sx={{
                    color: "#045F97",
                    borderColor: "#045F97",
                    "&:hover": {
                      borderColor: "#034670",
                      backgroundColor: "rgba(4, 95, 151, 0.04)",
                    },
                    px: 3,
                  }}
                >
                  Buy Now
                </Button>
              </Box>
            </CardContent>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
}
