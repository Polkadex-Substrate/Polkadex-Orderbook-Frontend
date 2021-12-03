import { CommonError } from "../../types";

import { TRANSACTIONS_DATA, TRANSACTIONS_ERROR, TRANSACTIONS_FETCH } from "./constants";

import { Transaction } from ".";

export interface TransactionsFetch {
  type: typeof TRANSACTIONS_FETCH;
}

export interface TransactionsError {
  type: typeof TRANSACTIONS_ERROR;
  error: CommonError;
}

export interface TransactionsData {
  type: typeof TRANSACTIONS_DATA;
  payload: Transaction[];
}

export type TransactionsAction = TransactionsFetch | TransactionsData | TransactionsError;

export const transactionsFetch = (): TransactionsFetch => ({
  type: TRANSACTIONS_FETCH,
});

export const transactionsData = (payload: Transaction[]): TransactionsData => ({
  type: TRANSACTIONS_DATA,
  payload,
});

export const transactionsError = (error: CommonError): TransactionsError => ({
  type: TRANSACTIONS_ERROR,
  error,
});
