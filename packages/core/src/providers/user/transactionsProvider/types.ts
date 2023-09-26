import { ChangeEvent, FC, PropsWithChildren } from "react";
import { WithdrawGroup } from "@orderbook/core/helpers";

import { CommonError } from "../../types";

export interface Transaction {
  stid: number;
  snapshot_id?: number;
  amount: string;
  asset: string;
  fee: string;
  main_account?: string;
  time: string;
  status: "PENDING" | "READY" | "CONFIRMED" | "FAILED";
  txn_type: "DEPOSIT" | "WITHDRAWAL";
  isReverted: boolean | null;
}

export interface TransactionsState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
  transactions: Transaction[];
}

export type TransactionUpdatePayload = {
  stid: number;
  user: string;
  asset: string;
  fee: number;
  amount: number;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  txn_type: "DEPOSIT" | "WITHDRAWAL";
  t: number;
  // only withdrawals with READY state will have snapshot_id
  snapshot_id?: number;
  isReverted: boolean | null;
};

export type TransactionQueryResult = {
  tt: string;
  a: string;
  q: string;
  fee: string;
  st: string;
  t: string;
  stid: number;
  // only withdrawals with READY state will have snapshot_id
  snapshot_id?: number;
  isReverted: boolean | null;
};

export type TransactionsContextProps = TransactionsState & {
  filterByType;
  onChangeFilterByType: (value: string) => void;
  search;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  allWithdrawals: Transaction[];
  readyWithdrawals: WithdrawGroup[];
  deposits: Transaction[];
  onTransactionsUpdate: (value: TransactionUpdatePayload) => void;
};

export type TransactionsProviderProps = PropsWithChildren<{
  value: TransactionsContextProps;
}>;

export interface TransactionsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TransactionsComponent = FC<PropsWithChildren<TransactionsProps>>;
