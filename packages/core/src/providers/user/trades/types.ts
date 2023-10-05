import { FC, PropsWithChildren } from "react";

import { CommonError } from "../../types";

export interface UserTrade {
  market_id: string;
  price: string;
  qty: string;
  side: string;
  timestamp: number;
  baseAsset: string;
  quoteAsset: string;
  isReverted: boolean | null;
}

export interface UserTradeEvent {
  m: string;
  p: string;
  q: string;
  t: number;
  tid: number;
}

export interface TradesState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
  data: UserTrade[];
  hasNextPage?: boolean;
}

export type TradesQueryResult = {
  m: string;
  p: string;
  q: string;
  s: string;
  t: string;
  isReverted: boolean | null;
};

export type FetchUserTradesResult = {
  response: TradesQueryResult[];
  nextToken: string | null;
};

export interface onTradeHistoryFetch {
  dateFrom: Date;
  dateTo: Date;
  tradeAddress: string;
  tradeHistoryFetchToken: string | null;
}

export type TradesProviderProps = PropsWithChildren<{
  value: TradesContextProps;
}>;

export type TradesContextProps = TradesState & {
  onFetchNextPage: () => void;
};

export interface TradesProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TradesComponent = FC<PropsWithChildren<TradesProps>>;
