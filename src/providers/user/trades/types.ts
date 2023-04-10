import { FC, PropsWithChildren } from "react";
import * as A from "./actions";
import { CommonError } from "../../types";

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
};

export interface TradesProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type TradesComponent = FC<PropsWithChildren<TradesProps>>;
