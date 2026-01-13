import axios from "axios";
import type { ApiError } from "./types";
import { store } from "../store";
import { logout, setTokens } from "../features/auth/auth.slice";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

httpClient.interceptors.request.use((config) => {
  const token = store.getState().auth.accessToken;

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

httpClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      const refreshToken = store.getState().auth.refreshToken;

      if (refreshToken) {
        try {
          const { data } = await axios.post(
            `${import.meta.env.VITE_API_BASE_URL}/token/refresh`,
            { refresh_token: refreshToken }
          );

          store.dispatch(
            setTokens({
              accessToken: data.data.access_token,
              refreshToken: data.data.refresh_token,
              user: data.data.user,
            })
          );

          originalRequest.headers.Authorization = `Bearer ${data.data.access_token}`;
          return httpClient(originalRequest);
        } catch (refreshError) {
          store.dispatch(logout());
          return Promise.reject(refreshError);
        }
      } else {
        store.dispatch(logout());
      }
    }

    return Promise.reject(error);
  }
);

export const normalizeApiError = (error: unknown): ApiError => {
  if (axios.isAxiosError(error)) {
    return {
      message:
        error.response?.data?.message || error.message || "Request failed",
      status: error.response?.status,
    };
  }

  return {
    message: "Unexpected error occurred",
  };
};

export default httpClient;
