import { createAsyncThunk } from "@reduxjs/toolkit";
import { loginApi } from "../../api/auth.api";
import type { ApiError } from "../../api/types";

export const login = createAsyncThunk<
  // Return type
  Awaited<ReturnType<typeof loginApi>>,
  // Args
  { email: string; password: string },
  // Thunk config
  { rejectValue: ApiError }
>("auth/login", async ({ email, password }, { rejectWithValue }) => {
  try {
    return await loginApi(email, password);
  } catch (error) {
    return rejectWithValue(error as ApiError);
  }
});
