/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/auth.api";
import type { LoginSchema } from "./auth.schema";
import type { AuthSuccessResponse } from "../../api/types";

export const login = createAsyncThunk<AuthSuccessResponse, LoginSchema>(
  "auth/login",
  async ({ email, password }, thunkAPI) => {
    try {
      const response = await loginApi(email, password);
      return response;
    } catch (error: any) {
      return thunkAPI.rejectWithValue(
        error.response?.data || { message: "Login failed" }
      );
    }
  }
);
