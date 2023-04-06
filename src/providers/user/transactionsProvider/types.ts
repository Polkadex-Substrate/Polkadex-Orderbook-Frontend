import { ChangeEvent, FC, PropsWithChildren } from "react";
import { CommonError } from "../../types";
import { WithdrawGroup } from "@polkadex/orderbook/helpers/groupWithdrawsBySnapshotIds";

export interface Transaction {
  event_id: number;
  sid: number;
  amount: string;
  asset: "PDEX" | string;
  fee: string;
  main_account?: string;
  time: string;
  status: "PENDING" | "READY" | "CONFIRMED" | "FAILED";
  txn_type: "DEPOSIT" | "WITHDRAWAL";
}

export interface TransactionsState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
  transactions: Transaction[];
}

export type TransactionUpdatePayload = {
  event_id: number;
  user: string;
  asset: string & { asset: string };
  fee: number;
  amount: number;
  status: "PENDING" | "CONFIRMED" | "FAILED";
  txn_type: "DEPOSIT" | "WITHDRAWAL";
  t: number;
  sid: number; // snapshot id
};

export type TransactionQueryResult = {
  tt: string;
  a: string;
  q: string;
  fee: string;
  st: string;
  t: string;
  eid: number;
  sid: number;
};

export type TransactionsContextProps = TransactionsState & {
  filterByType;
  onChangeFilterByType: (value: string) => void;
  search;
  onChangeSearch: (e: ChangeEvent<HTMLInputElement>) => void;
  allWithdrawals: Transaction[];
  readyWithdrawals: WithdrawGroup[];
  deposits: Transaction[];
};

export type TransactionsProviderProps = PropsWithChildren<{
  value: TransactionsContextProps;
}>;

export interface TransactionsProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TransactionsComponent = FC<PropsWithChildren<TransactionsProps>>;
