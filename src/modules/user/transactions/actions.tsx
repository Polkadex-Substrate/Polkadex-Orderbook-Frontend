import { CommonError } from "../../types";

import {
  TRANSACTIONS_DATA,
  TRANSACTIONS_ERROR,
  TRANSACTIONS_FETCH,
  TRANSACTION_CHANNEL_DATA,
  TRANSACTION_CHANNEL_FETCH,
} from "./constants";

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

export interface TransactionChannelFetch {
  type: typeof TRANSACTION_CHANNEL_FETCH;
}

export interface TransactionChannelData {
  type: typeof TRANSACTION_CHANNEL_DATA;
  payload: Transaction;
}
export type TransactionsAction =
  | TransactionsFetch
  | TransactionsData
  | TransactionsError
  | TransactionChannelFetch
  | TransactionChannelData;

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

export const transactionChannelFetch = (): TransactionChannelFetch => ({
  type: TRANSACTION_CHANNEL_FETCH,
});

export const transactionChannelData = (
  payload: TransactionChannelData["payload"]
): TransactionChannelData => ({
  type: TRANSACTION_CHANNEL_DATA,
  payload,
});
