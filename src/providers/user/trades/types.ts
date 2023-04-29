import { FC, PropsWithChildren } from "react";

import { CommonError } from "../../types";

import * as A from "./actions";

export interface TradesState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
  data: A.UserTrade[];
}

export type TradesQueryResult = {
  m: string;
  p: string;
  q: string;
  s: string;
  t: string;
};

export type TradesProviderProps = PropsWithChildren<{
  value: TradesContextProps;
}>;

export type TradesContextProps = TradesState & {
  onFetchTrades: () => void;
  onUserTradeUpdate: (value: A.UserTradesUpdateEvent["payload"]) => void;
  onUserTradesError: (value: A.UserTradesError["error"]) => void;
};

export interface TradesProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TradesComponent = FC<PropsWithChildren<TradesProps>>;
