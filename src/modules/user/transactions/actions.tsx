import { CommonError } from "../../types";

import {
  TRANSACTIONS_DATA,
  TRANSACTIONS_ERROR,
  TRANSACTIONS_FETCH,
  TRANSACTIONS_UPDATE_EVENT,
  TRANSACTIONS_UPDATE_EVENT_DATA,
} from "./constants";

import { Transaction } from ".";

export type TransactionUpdatePayload = {
  event_id: number;
  user: string;
  asset: string | { asset: string };
  fee: number;
  amount: number;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  txn_type: "DEPOSIT" | "WITHDRAW";
  t: number;
  sid: number; // snapshot id
};

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

export interface TransactionsUpdateEvent {
  type: typeof TRANSACTIONS_UPDATE_EVENT;
  payload: TransactionUpdatePayload;
}

export interface TransactionsUpdateEventData {
  type: typeof TRANSACTIONS_UPDATE_EVENT_DATA;
  payload: Transaction;
}
export type TransactionsAction =
  | TransactionsFetch
  | TransactionsData
  | TransactionsError
  | TransactionsUpdateEventData;

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

export const transactionsUpdateEvent = (
  payload: TransactionsUpdateEvent["payload"]
): TransactionsUpdateEvent => ({
  type: TRANSACTIONS_UPDATE_EVENT,
  payload,
});

export const transactionsUpdateEventData = (
  payload: TransactionsUpdateEventData["payload"]
): TransactionsUpdateEventData => ({
  type: TRANSACTIONS_UPDATE_EVENT_DATA,
  payload,
});
