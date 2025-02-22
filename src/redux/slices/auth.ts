"use client";

import { API_ROUTES, AUTH } from "@/config/constants";
import HttpClient from "@/libs/http";
import type { UserType } from "@/types/auth";
import type { ApiError } from "@/types/error";
import { createAsyncThunk, createSlice, type ActionReducerMapBuilder, PayloadAction } from "@reduxjs/toolkit";
import { setCookie, deleteCookie } from "cookies-next/client";

interface LoginCredentials {
  username: string;
  password: string;
}

// Update and export the interface
export interface LoginFormFields {
  email: string;
  password: string;
}

interface AuthState {
  isAuthenticated: boolean;
  user: UserType | null | undefined; // Updated to allow undefined
  loading: boolean;
  error: string | null | undefined; // Made consistent with error usage
  token: string | null;
  isLoading?: boolean;
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null,
  loading: false,
  error: null,
  token: null,
};

export const loginUser = createAsyncThunk("auth/login", async (credentials: LoginCredentials) => {
  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(credentials),
    });

    if (!response.ok) {
      throw new Error("Login failed");
    }

    const data = await response.json();
    return data;
  } catch (error) {
    throw new Error(error instanceof Error ? error.message : "Login failed");
  }
});

// Update the saveSession thunk to use the correct field names
export const saveSession = createAsyncThunk("auth/saveSession", async (credentials: LoginFormFields) => {
  try {
    const data = (await HttpClient.post(API_ROUTES.BE + "/auth/login", credentials)).data as UserType;
    setCookie(AUTH.COOKIE_TOKEN, data?.user?.token);
    localStorage.setItem("token", data?.user?.token);
    return data;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.response?.data?.message || "Login failed");
  }
});

export const restoreSession = createAsyncThunk("auth/restoreSession", async (token: string) => {
  try {
    const data = (
      await HttpClient.get(API_ROUTES.BE + "/auth/me", {
        headers: { Authorization: `Bearer ${token}` },
      })
    ).data as UserType;
    return data;
  } catch (error) {
    const apiError = error as ApiError;
    throw new Error(apiError.response?.data?.message || "Session restoration failed");
  }
});

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.isAuthenticated = false;
      state.user = null;
      state.token = null;
      localStorage.removeItem("token");
    },
    removeSession: (state) => {
      state.isAuthenticated = initialState.isAuthenticated;
      state.user = null; // Changed from undefined to null
      state.token = null;
      deleteCookie(AUTH.COOKIE_TOKEN);
      localStorage.removeItem("token");
    },
    setError: (state, action: PayloadAction<string>) => {
      state.error = action.payload;
    },
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder: ActionReducerMapBuilder<AuthState>) => {
    builder.addCase(saveSession.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.token = action.payload.user?.token;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(saveSession.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(saveSession.rejected, (state, payload) => {
      state.isLoading = false;
      state.error = payload.error.message;
    });
    builder.addCase(restoreSession.fulfilled, (state, action) => {
      state.isAuthenticated = true;
      state.user = action.payload;
      state.isLoading = false;
      state.error = undefined;
    });
    builder.addCase(restoreSession.pending, (state) => {
      state.isLoading = true;
      state.error = undefined;
    });
    builder.addCase(restoreSession.rejected, (state, payload) => {
      state.isLoading = false;
      state.error = payload.error.message;
      state.isAuthenticated = false;
      state.user = null; // Changed from undefined to null
      state.token = null;
      deleteCookie(AUTH.COOKIE_TOKEN);
      localStorage.removeItem("token");
    });
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.isAuthenticated = true;
        state.user = action.payload.user;
        state.token = action.payload.token;
        state.loading = false;
        state.error = null;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || "Login failed";
      });
  },
});

export const { logout, removeSession, setError, clearError } = authSlice.actions;
export default authSlice.reducer;
