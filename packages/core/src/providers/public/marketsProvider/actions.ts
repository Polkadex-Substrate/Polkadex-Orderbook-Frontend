import { MARKET_TICKER_CHANNEL_DATA } from "./constants";
import { Ticker } from "./types";

export interface MarketsTickersChannelData {
  type: typeof MARKET_TICKER_CHANNEL_DATA;
  payload: Ticker;
}

export type MarketsAction = MarketsTickersChannelData;

export const marketsTickersChannelData = (
  payload: MarketsTickersChannelData["payload"]
): MarketsTickersChannelData => ({
  type: MARKET_TICKER_CHANNEL_DATA,
  payload,
});
