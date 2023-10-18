import { MarketsState, Ticker } from "./types";

export const defaultTickers: Ticker = {
  m: "0-0",
  priceChange24Hr: 0,
  priceChangePercent24Hr: 0,
  open: 0,
  close: 0,
  high: 0,
  low: 0,
  volumeBase24hr: 0,
  volumeQuote24Hr: 0,
};

export const initialMarketsState: MarketsState = {
  list: [],
  filters: {},
  tickersTimestamp: 0,
  timestamp: 0,
  currentMarket: undefined,
  currentTicker: defaultTickers,
  tickers: [],
  tickerLoading: false,
  loading: true,
};
