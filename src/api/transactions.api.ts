import httpClient, { normalizeApiError } from "./httpClient";
import type { TransactionResponse } from "./types";

export const getTransactionsApi = async (page: number) => {
  try {
    const res = await httpClient.get<TransactionResponse>("/transactions", {
      params: { page },
    });

    return res.data;
  } catch (error) {
    throw normalizeApiError(error);
  }
};
