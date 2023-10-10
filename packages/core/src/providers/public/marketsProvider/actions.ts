import {
  MARKETS_SET_CURRENT_MARKET,
  MARKETS_SET_CURRENT_MARKET_IFUNSET,
  MARKET_TICKER_CHANNEL_DATA,
  MARKETS_SET_CURRENT_TICKER,
} from "./constants";
import { Market, Ticker } from "./types";

export interface SetCurrentMarket {
  type: typeof MARKETS_SET_CURRENT_MARKET;
  payload: Market;
}

export interface SetCurrentMarketIfUnset {
  type: typeof MARKETS_SET_CURRENT_MARKET_IFUNSET;
  payload: { market: Market; ticker?: Ticker };
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
  | SetCurrentMarket
  | SetCurrentMarketIfUnset
  | MarketsTickersChannelData
  | SetCurrentTicker;

export const setCurrentMarket = (
  payload: SetCurrentMarket["payload"]
): SetCurrentMarket => ({
  type: MARKETS_SET_CURRENT_MARKET,
  payload,
});

export const setCurrentMarketIfUnset = (
  payload: SetCurrentMarketIfUnset["payload"]
): SetCurrentMarketIfUnset => ({
  type: MARKETS_SET_CURRENT_MARKET_IFUNSET,
  payload,
});

export const marketsTickersChannelData = (
  payload: MarketsTickersChannelData["payload"]
): MarketsTickersChannelData => ({
  type: MARKET_TICKER_CHANNEL_DATA,
  payload,
});

export const setCurrentTicker = (
  payload: SetCurrentTicker["payload"]
): SetCurrentTicker => ({
  type: MARKETS_SET_CURRENT_TICKER,
  payload,
});
