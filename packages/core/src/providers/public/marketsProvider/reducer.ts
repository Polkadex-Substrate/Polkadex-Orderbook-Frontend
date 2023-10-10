import { MarketsAction } from "./actions";
import { MARKET_TICKER_CHANNEL_DATA } from "./constants";
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

export const marketsReducer = (
  state = initialMarketsState,
  action: MarketsAction
): MarketsState => {
  switch (action.type) {
    case MARKET_TICKER_CHANNEL_DATA: {
      const update = action.payload;
      const tickers = [...state.tickers];
      const idx = tickers.findIndex((x) => x.m === update.m);
      if (idx < 0) tickers.push(update);
      else tickers[idx] = update;
      if (
        state.currentTicker.m === defaultTickers.m ||
        state.currentTicker.m === update.m
      ) {
        return {
          ...state,
          currentTicker: update,
          tickers,
        };
      }
      return {
        ...state,
        tickers,
      };
    }
    default:
      return state;
  }
};
