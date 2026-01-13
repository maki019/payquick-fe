import { createAsyncThunk } from "@reduxjs/toolkit";
import { getTransactionsApi } from "../../api/transactions.api";
import type { ApiError } from "../../api/types";

export const fetchTransactions = createAsyncThunk<
  Awaited<ReturnType<typeof getTransactionsApi>>,
  { page: number },
  { rejectValue: ApiError }
>("transactions/fetch", async ({ page }, { rejectWithValue }) => {
  try {
    return await getTransactionsApi(page);
  } catch (error) {
    return rejectWithValue(error as ApiError);
  }
});
