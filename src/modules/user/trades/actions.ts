import { CommonError } from "../../types";

import { TRADES_DATA, TRADES_FETCH, TRADES_ERROR } from "./constants";

import { ProxyAccount } from "@polkadex/orderbook-modules";

export interface Trades {
  // we don't know the types yet
  trade: any;
}
export interface TradesFetch {
  type: typeof TRADES_FETCH;
  payload: { account: ProxyAccount };
}
export interface TradesData {
  type: typeof TRADES_DATA;
  payload: Trades;
}

export interface TradesError {
  type: typeof TRADES_ERROR;
  error: CommonError;
}

export type TradesAction = TradesFetch | TradesData | TradesError;

export const tradesFetch = (payload: TradesFetch["payload"]): TradesFetch => ({
  type: TRADES_FETCH,
  payload,
});

export const tradesData = (payload: Trades): TradesData => ({
  type: TRADES_DATA,
  payload,
});

export const tradesError = (error: CommonError): TradesError => ({
  type: TRADES_ERROR,
  error,
});
