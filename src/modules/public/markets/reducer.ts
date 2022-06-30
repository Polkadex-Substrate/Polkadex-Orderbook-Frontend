import { CommonState } from "../../types";

import { MarketsAction } from "./actions";
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
} from "./constants";
import { Market, Ticker } from "./types";

import { buildFilterPrice, FilterPrice } from "@polkadex/web-helpers";
export const defaultTickers: Ticker = {
  m: "0-0",
  priceChange24Hr: "0",
  priceChangePercent24Hr: "0",
  open: "0",
  close: "0",
  high: "0",
  low: "0",
  volumeBase24hr: "0",
  volumeQuote24Hr: "0",
};

export interface MarketsState extends CommonState {
  list: Market[];
  filters: {
    [marketId: string]: FilterPrice;
  };
  currentMarket: Market | undefined;
  currentTicker: Ticker;
  tickersTimestamp: number;
  timestamp: number;
  tickerLoading: boolean;
  tickers: Ticker[];
  loading: boolean;
  marketPrice: string;
}

export const initialMarketsState: MarketsState = {
  list: [],
  filters: {},
  tickersTimestamp: 0,
  timestamp: 0,
  currentMarket: undefined,
  currentTicker: defaultTickers,
  tickers: [],
  tickerLoading: false,
  loading: false,
  marketPrice: "0",
};

export const marketsReducer = (
  state = initialMarketsState,
  action: MarketsAction
): MarketsState => {
  switch (action.type) {
    case MARKETS_FETCH:
      return {
        ...state,
        loading: true,
        timestamp: Math.floor(Date.now() / 1000),
      };
    case MARKETS_DATA: {
      let filters = {};

      if (action.payload) {
        filters = action.payload.reduce((result, market: Market) => {
          result[market.id] = result[market.id] || [];

          if (market.filters) {
            result[market.id] = market.filters.map(buildFilterPrice);
          }

          return result;
        }, {});
      }

      return {
        ...state,
        loading: false,
        list: action.payload,
        filters: filters,
      };
    }
    case MARKETS_ERROR:
      return {
        ...state,
        loading: false,
      };

    case MARKETS_SET_CURRENT_MARKET: {
      const tickers = [...state.tickers];
      const currentTicker = tickers.find((x) => x.m === action.payload.m);
      if (!currentTicker) {
        return {
          ...state,
          currentMarket: action.payload,
        };
      }
      return {
        ...state,
        currentMarket: action.payload,
        currentTicker,
      };
    }

    case MARKETS_SET_CURRENT_MARKET_IFUNSET: {
      if (state.currentMarket) {
        return state;
      }
      const tickers = [...state.tickers];
      const currentTicker = tickers.find((x) => x.m === action.payload.m);
      if (!currentTicker) {
        return {
          ...state,
          currentMarket: action.payload,
        };
      }
      return {
        ...state,
        currentMarket: action.payload,
        currentTicker,
      };
    }

    case MARKETS_TICKERS_FETCH:
      return {
        ...state,
        tickerLoading: true,
        tickersTimestamp: Math.floor(Date.now() / 1000),
      };
    case MARKETS_TICKERS_DATA:
      return {
        ...state,
        tickerLoading: false,
        tickers: action.payload,
      };
    case MARKET_TICKER_CHANNEL_DATA: {
      const update = action.payload;
      const tickers = [...state.tickers];
      const idx = tickers.findIndex((x) => x.m === update.m);
      if (idx < 0) tickers.push(update);
      else tickers[idx] = update;
      if (state.currentTicker.m === update.m) {
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
