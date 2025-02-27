"use client";
import React from "react";
import { yupResolver } from "@hookform/resolvers/yup";
import { Box, Button } from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import * as yup from "yup";
import { toast } from "react-toastify";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import PasswordInput from "@/components/form/PasswordInput";
import FormInput from "@/components/form/TextInput";
import { saveSession, type LoginFormFields } from "@/redux/slices/auth";
import type { AppDispatch, RootState } from "@/redux/store";
import { ROUTES } from "@/config/constants";

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>();
  const isAuthenticated = useSelector((state: RootState) => state.auth.isAuthenticated);
  const error = useSelector((state: RootState) => state.auth.error);
  const user = useSelector((state: RootState) => state.auth.user);
  const { push } = useRouter();

  const loginFormSchema = yup.object({
    email: yup.string().email("Please enter valid email").required("Please enter email"),
    password: yup.string().required("Please enter password").min(6, "Password must be at least 6 characters"),
  });

  const { control, handleSubmit } = useForm({
    resolver: yupResolver(loginFormSchema),
    defaultValues: {
      email: "john@example.com",
      password: "password123",
    },
  });

  const handleLogin = async (data: LoginFormFields) => {
    try {
      const result = await dispatch(saveSession(data)).unwrap();
      if (result) {
        toast.success("Login successful!", {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    } catch (err) {
      if (err instanceof Error && err.message) {
        toast.error(err.message, {
          position: "top-right",
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        });
      }
    }
  };

  useEffect(() => {
    if (user && isAuthenticated) push(ROUTES.HOME);
  }, [isAuthenticated]);

  useEffect(() => {
    if (error) {
      toast.error(error, {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      });
    }
  }, [error]);

  return (
    <form onSubmit={handleSubmit(handleLogin)}>
      <FormInput
        name="email"
        type="email"
        label="Email Address"
        placeholder="Email Address"
        control={control}
        sx={{
          "& .MuiOutlinedInput-root": {
            transition: "all 0.3s ease-in-out",
            "&:hover .MuiOutlinedInput-notchedOutline": {
              borderColor: "#667eea",
            },
            "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
              borderColor: "#764ba2",
              borderWidth: "2px",
            },
          },
          "& .MuiInputLabel-root": {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          },
          "& .MuiInputLabel-root.Mui-focused": {
            color: "#764ba2",
          },
          "& .MuiInputBase-input": {
            fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
          },
        }}
      />

      <Box sx={{ mt: 2 }}>
        <PasswordInput
          name="password"
          type="password"
          label="Password"
          placeholder="Password"
          control={control}
          sx={{
            "& .MuiOutlinedInput-root": {
              transition: "all 0.3s ease-in-out",
              "&:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#667eea",
              },
              "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#764ba2",
                borderWidth: "2px",
              },
            },
            "& .MuiInputLabel-root": {
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif",
            },
            "& .MuiInputLabel-root.Mui-focused": {
              color: "#764ba2",
            },
            "& .MuiInputBase-input": {
              fontFamily: "'Roboto', 'Helvetica', 'Arial', sans-serif'",
            },
          }}
        />
      </Box>

      <Box sx={{ display: "flex", justifyContent: "center", mt: 3 }}>
        <Button
          variant="contained"
          sx={{
            background: "linear-gradient(135deg, #68A0C1 0%, #045F97 100%)",
            color: "#fff",
            fontSize: "16px",
            fontWeight: "bold",
            textTransform: "none",
            borderRadius: 2,
            padding: "10px 20px",
            fontFamily: "sans-serif",
            transition: "all 0.3s ease-in-out",
            boxShadow: "0 4px 6px rgba(102, 126, 234, 0.25)",
            "&:hover": {
              background: "linear-gradient(135deg, #045F97 0%, #68A0C1 100%)",
              transform: "translateY(-2px)",
              boxShadow: "0 6px 8px rgba(102, 126, 234, 0.35)",
            },
            "&:active": {
              transform: "translateY(0)",
              boxShadow: "0 2px 4px rgba(102, 126, 234, 0.25)",
            },
          }}
          type="submit"
          size="large"
          fullWidth
        >
          Login
        </Button>
      </Box>
    </form>
  );
}
