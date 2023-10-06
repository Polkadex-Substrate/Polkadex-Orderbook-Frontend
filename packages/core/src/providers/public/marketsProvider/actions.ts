import { CommonError } from "../../types";

import {
  MARKETS_DATA,
  MARKETS_ERROR,
  MARKETS_FETCH,
  MARKETS_SET_CURRENT_MARKET,
  MARKETS_SET_CURRENT_MARKET_IFUNSET,
  MARKETS_TICKERS_DATA,
  MARKETS_TICKERS_ERROR,
  MARKETS_TICKERS_FETCH,
  MARKET_TICKER_CHANNEL_DATA,
  MARKETS_SET_CURRENT_TICKER,
} from "./constants";
import { Market, Ticker } from "./types";

export interface MarketsFetch {
  type: typeof MARKETS_FETCH;
  payload?: {
    type: string;
  };
}

export interface MarketsData {
  type: typeof MARKETS_DATA;
  payload: Market[];
}

export interface MarketsError {
  type: typeof MARKETS_ERROR;
  error: CommonError;
}

export interface SetCurrentMarket {
  type: typeof MARKETS_SET_CURRENT_MARKET;
  payload: Market;
}

export interface SetCurrentMarketIfUnset {
  type: typeof MARKETS_SET_CURRENT_MARKET_IFUNSET;
  payload: Market;
}

export interface MarketsTickersFetch {
  type: typeof MARKETS_TICKERS_FETCH;
}

export interface MarketsTickersData {
  type: typeof MARKETS_TICKERS_DATA;
  payload: Ticker[];
}

export interface MarketsTickersError {
  type: typeof MARKETS_TICKERS_ERROR;
  error: CommonError;
}
export interface MarketsTickersChannelData {
  type: typeof MARKET_TICKER_CHANNEL_DATA;
  payload: Ticker;
}

export interface SetCurrentTicker {
  type: typeof MARKETS_SET_CURRENT_TICKER;
  payload: string;
}
export type MarketsAction =
  | MarketsFetch
  | MarketsData
  | MarketsError
  | MarketsTickersFetch
  | MarketsTickersData
  | MarketsTickersError
  | SetCurrentMarket
  | SetCurrentMarketIfUnset
  | MarketsTickersChannelData
  | SetCurrentTicker;

export const marketsFetch = (
  payload?: MarketsFetch["payload"],
): MarketsFetch => ({
  type: MARKETS_FETCH,
  payload,
});

export const marketsData = (payload: MarketsData["payload"]): MarketsData => ({
  type: MARKETS_DATA,
  payload,
});

export const marketsError = (error: CommonError): MarketsError => ({
  type: MARKETS_ERROR,
  error,
});

export const setCurrentMarket = (
  payload: SetCurrentMarket["payload"],
): SetCurrentMarket => ({
  type: MARKETS_SET_CURRENT_MARKET,
  payload,
});

export const setCurrentMarketIfUnset = (
  payload: SetCurrentMarketIfUnset["payload"],
): SetCurrentMarketIfUnset => ({
  type: MARKETS_SET_CURRENT_MARKET_IFUNSET,
  payload,
});

export const marketsTickersFetch = (): MarketsTickersFetch => ({
  type: MARKETS_TICKERS_FETCH,
});

export const marketsTickersData = (
  payload: MarketsTickersData["payload"],
): MarketsTickersData => ({
  type: MARKETS_TICKERS_DATA,
  payload,
});

export const marketsTickersChannelData = (
  payload: MarketsTickersChannelData["payload"],
): MarketsTickersChannelData => ({
  type: MARKET_TICKER_CHANNEL_DATA,
  payload,
});

export const setCurrentTicker = (
  payload: SetCurrentTicker["payload"],
): SetCurrentTicker => ({
  type: MARKETS_SET_CURRENT_TICKER,
  payload,
});
