import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { login } from "./auth.thunks";
import type {
  User,
  AuthSuccessResponse,
  AuthErrorResponse,
} from "../../api/types";

type AuthState = {
  accessToken: string | null;
  refreshToken: string | null;
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
};

const loadAuthFromStorage = () => {
  try {
    const serialized = localStorage.getItem("auth");
    if (!serialized) return undefined;
    return JSON.parse(serialized);
  } catch (err) {
    console.error("Failed to load auth from storage", err);
    return undefined;
  }
};

const initialState: AuthState = loadAuthFromStorage() || {
  accessToken: null,
  refreshToken: null,
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout(state) {
      state.accessToken = null;
      state.refreshToken = null;
      state.user = null;
      state.isAuthenticated = false;
      state.error = null;
    },
    // ideally, we would not store tokens in state directly like this
    setTokens(
      state,
      action: PayloadAction<{
        accessToken: string;
        refreshToken: string;
        user: User;
      }>
    ) {
      state.accessToken = action.payload.accessToken;
      state.refreshToken = action.payload.refreshToken;
      state.user = action.payload.user;
      state.isAuthenticated = true;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(
        login.fulfilled,
        (state, action: PayloadAction<AuthSuccessResponse>) => {
          state.isLoading = false;
          state.isAuthenticated = true;

          state.accessToken = action.payload.data.access_token;
          state.refreshToken = action.payload.data.refresh_token;
          state.user = action.payload.data.user;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error =
          (action.payload as AuthErrorResponse | undefined)?.message ||
          "Login failed";
      });
  },
});

export const { logout, setTokens } = authSlice.actions;
export default authSlice.reducer;
