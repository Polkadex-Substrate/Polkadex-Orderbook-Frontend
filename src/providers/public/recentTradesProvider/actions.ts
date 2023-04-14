import { CommonError } from "../../../modules/types";
import { Market } from "../marketsProvider";

import {
  RECENT_TRADES_DATA,
  RECENT_TRADES_ERROR,
  RECENT_TRADES_FETCH,
  RECENT_TRADES_PUSH,
  RECENT_TRADES_FETCH_CHANNEL,
} from "./constants";
import { PublicTrade } from "./types";

export interface RecentTradesFetch {
  type: typeof RECENT_TRADES_FETCH;
  payload: Market;
}

export interface RecentTradesChannelFetch {
  type: typeof RECENT_TRADES_FETCH_CHANNEL;
  payload: Market;
}

export interface RecentTradesData {
  type: typeof RECENT_TRADES_DATA;
  payload: PublicTrade[];
}

export interface RecentTradesError {
  type: typeof RECENT_TRADES_ERROR;
  error: CommonError;
}

export interface RecentTradesPush {
  type: typeof RECENT_TRADES_PUSH;
  payload: PublicTrade;
}

export type RecentTradesActions =
  | RecentTradesFetch
  | RecentTradesError
  | RecentTradesData
  | RecentTradesPush
  | RecentTradesChannelFetch;

export const recentTradesFetch = (
  payload: RecentTradesFetch["payload"]
): RecentTradesFetch => ({
  type: RECENT_TRADES_FETCH,
  payload,
});

export const recentTradesChannelFetch = (
  payload: RecentTradesChannelFetch["payload"]
): RecentTradesChannelFetch => ({
  type: RECENT_TRADES_FETCH_CHANNEL,
  payload,
});

export const recentTradesData = (payload: RecentTradesData["payload"]): RecentTradesData => ({
  type: RECENT_TRADES_DATA,
  payload,
});

export const recentTradesPush = (payload: RecentTradesPush["payload"]): RecentTradesPush => ({
  type: RECENT_TRADES_PUSH,
  payload,
});

export const recentTradesError = (error: CommonError): RecentTradesError => ({
  type: RECENT_TRADES_ERROR,
  error,
});
