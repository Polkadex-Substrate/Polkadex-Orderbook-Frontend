import { RootState } from "../..";

import { Transaction } from ".";

export const selectTransactionSuccess = (state: RootState): boolean =>
  state.user.transactions.success;

export const selectTransactionError = (state: RootState): string =>
  state.user.transactions.error;

export const selectTransactionLoading = (state: RootState): boolean =>
  state.user.transactions.loading;

export const selectTransactions = (state: RootState): Transaction[] =>
  state.user.transactions.transactions;

export const selectTransactionDepositData = (state: RootState): Transaction[] =>
  state.user.transactions.transactions?.filter((value) => value.txn_type === "DEPOSIT");
