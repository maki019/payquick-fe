import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../features/auth/auth.slice";
import transactionReducer from "../features/transactions/transactions.slice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    transactions: transactionReducer,
  },
});

store.subscribe(() => {
  const state = store.getState().auth;
  localStorage.setItem("auth", JSON.stringify(state));
});


export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
