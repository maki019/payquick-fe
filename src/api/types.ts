import type { loginApi } from "./auth.api";

// AUTH
export type User = {
  user_id: string;
  full_name: string;
  email: string;
};

export type LoginResponse = {
  status: string;
  message: string;
  data: {
    access_token: string;
    refresh_token: string;
    expires_in: number;
    token_type: string;
    user: User;
  };
};

export type AuthSuccessResponse = Awaited<ReturnType<typeof loginApi>>;
export type AuthErrorResponse = Awaited<{
  status: string;
  message: string;
}>;

// TRANSACTIONS
export type Transaction = {
  id: string;
  amount_in_cents: number;
  currency: string;
  type: "TRANSFER" | "TOPUP";
  status: string;
  created_at: string;
  destination_id: string;
};

export type TransactionResponse = {
  status: string;
  message: string;
  pagination: {
    current_page: number;
    total_pages: number;
    total_items: number;
    items_per_page: number;
  };
  data: Transaction[];
};

// ERROR
export type ApiError = {
  message: string;
  status?: number;
};
