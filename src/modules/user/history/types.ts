import { CommonState, OrderSide } from "../../types";

export interface PrivateTradeEvent {
  id: number;
  price: string;
  total: string;
  amount: string;
  market: string;
  created_at: string;
  taker_type: string;
  side?: string;
  order_id?: number;
}

export interface Withdraw {
  currency: string;
  id: number;
  type: string;
  amount: string;
  fee: string;
  blockchain_txid: string;
  rid: string;
  state: string;
  created_at: string;
  updated_at: string;
  completed_at: string;
  done_at: string;
  price?: number;
}

export interface Deposit {
  currency: string;
  id: number;
  amount: string;
  fee: string;
  txid: string;
  created_at: string;
  confirmations: number | string;
  completed_at: string;
  state: string;
  price?: number;
}

export type WalletHistoryElement = Withdraw | Deposit;
export type WalletHistoryList = WalletHistoryElement[];
