import httpClient, { normalizeApiError } from "./httpClient";
import type { LoginResponse } from "./types";

export const loginApi = async (email: string, password: string) => {
  try {
    const res = await httpClient.post<LoginResponse>("/login", {
      email,
      password,
    });

    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
