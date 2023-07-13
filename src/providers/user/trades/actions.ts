import { CommonError } from "../../types";

import {
  TRADES_DATA,
  TRADES_FETCH,
  TRADES_ERROR,
  USER_TRADES_UPDATE_EVENT,
  USER_TRADES_UPDATE_DATA,
  TRADES_RESET,
} from "./constants";

export interface UserTrade {
  market_id: string;
  price: string;
  qty: string;
  side: string;
  timestamp: number;
  baseAsset: string;
  quoteAsset: string;
}

export interface UserTradeEvent {
  m: string;
  p: string;
  q: string;
  t: number;
  tid: number;
}

export interface UserTradesFetch {
  type: typeof TRADES_FETCH;
}

export interface UserTradesData {
  type: typeof TRADES_DATA;
  payload: {
    trades: UserTrade[];
    nextToken: string | null;
  };
}

export interface UserTradesReset {
  type: typeof TRADES_RESET;
}

export interface UserTradesError {
  type: typeof TRADES_ERROR;
  error: CommonError;
}

export interface UserTradesUpdateEvent {
  type: typeof USER_TRADES_UPDATE_EVENT;
  payload: UserTradeEvent;
}

export interface UserTradesUpdateData {
  type: typeof USER_TRADES_UPDATE_DATA;
  payload: UserTrade;
}

export type TradesAction =
  | UserTradesFetch
  | UserTradesData
  | UserTradesReset
  | UserTradesError
  | UserTradesUpdateData;

export const userTradesFetch = (): UserTradesFetch => ({
  type: TRADES_FETCH,
});

export const userTradesData = (payload: UserTradesData["payload"]): UserTradesData => ({
  type: TRADES_DATA,
  payload,
});

export const userTradesReset = (): UserTradesReset => ({
  type: TRADES_RESET,
});

export const userTradesError = (error: CommonError): UserTradesError => ({
  type: TRADES_ERROR,
  error,
});

export const userTradesUpdateEvent = (
  payload: UserTradesUpdateEvent["payload"]
): UserTradesUpdateEvent => ({
  type: USER_TRADES_UPDATE_EVENT,
  payload,
});

export const userTradesUpdateData = (
  payload: UserTradesUpdateData["payload"]
): UserTradesUpdateData => ({
  type: USER_TRADES_UPDATE_DATA,
  payload,
});
