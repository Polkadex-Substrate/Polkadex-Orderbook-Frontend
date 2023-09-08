import { FC, PropsWithChildren } from "react";

import { CommonError } from "../../types";

import * as A from "./actions";

export interface TradesState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
  data: A.UserTrade[];
  tradeHistoryNextToken: string | null;
}

export type TradesQueryResult = {
  m: string;
  p: string;
  q: string;
  s: string;
  t: string;
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
  onFetchTrades: (value: onTradeHistoryFetch) => void;
  onUserTradeUpdate: (value: A.UserTradesUpdateEvent["payload"]) => void;
  onUserTradesError: (value: A.UserTradesError["error"]) => void;
};

export interface TradesProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TradesComponent = FC<PropsWithChildren<TradesProps>>;
