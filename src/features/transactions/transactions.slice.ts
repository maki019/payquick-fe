import { createSlice } from "@reduxjs/toolkit";
import type { Transaction } from "../../api/types";
import { fetchTransactions } from "./transactions.thunks";

type TransactionsState = {
  items: Transaction[];
  currentPage: number;
  totalPages: number;
  isLoading: boolean;
  error: string | null;
};

const initialState: TransactionsState = {
  items: [],
  currentPage: 1,
  totalPages: 1,
  isLoading: false,
  error: null,
};

const transactionsSlice = createSlice({
  name: "transactions",
  initialState,
  reducers: {
    clearTransactions(state) {
      state.items = [];
      state.currentPage = 1;
      state.totalPages = 1;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTransactions.pending, (state) => {
        state.isLoading = true;
        state.error = null;
      })
      .addCase(fetchTransactions.fulfilled, (state, action) => {
        state.isLoading = false;
        state.items = action.payload.data;
        state.currentPage = action.payload.pagination.current_page;
        state.totalPages = action.payload.pagination.total_pages;
      })
      .addCase(fetchTransactions.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload?.message || "Failed to fetch transactions";
      });
  },
});

export const { clearTransactions } = transactionsSlice.actions;
export default transactionsSlice.reducer;
