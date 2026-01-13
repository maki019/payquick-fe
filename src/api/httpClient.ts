import axios from "axios";
import type { ApiError } from "./types";

const httpClient = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

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
