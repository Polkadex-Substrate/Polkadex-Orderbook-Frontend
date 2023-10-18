import { PropsWithChildren } from "react";

import { CommonError } from "../../types";
export interface PublicTrade {
  market_id: string;
  price: string;
  amount: string;
  timestamp: number;
  side?: "sell" | "buy";
}

export type RawTrades = {
  m: string;
  p: string;
  q: string;
  t: string;
};
export type RawTradeEvent = {
  m: string;
  p: string;
  q: string;
  t: number;
};

export interface RecentTradesState {
  list: PublicTrade[];
  loading: boolean;
  currentTrade?: PublicTrade;
  lastTrade?: PublicTrade;
  error?: CommonError;
}

export type RecentTradesContextProps = RecentTradesState & {
  isDecreasing: boolean[];
  quoteUnit?: string;
  baseUnit?: string;
  pricePrecision?: number;
  amountPrecision?: number;
  getLastTradePrice: () => string;
  getCurrentTradePrice: () => string;
};

export type RecentTradesProviderProps = PropsWithChildren<{
  value: RecentTradesContextProps;
}>;
