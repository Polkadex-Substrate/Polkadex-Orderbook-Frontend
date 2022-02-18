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
  MARKET_PRICE_FETCH,
  MARKET_PRICE_DATA,
  MARKET_PRICE_ERROR,
  MARKET_CURRENT_TICKERS_DATA,
  MARKET_CURRENT_TICKERS_UPDATE,
} from "./constants";
import { Market, Ticker } from "./types";

import { buildFilterPrice, FilterPrice } from "@polkadex/web-helpers";
export const defaultTickers = {
  amount: "0",
  low: "0",
  last: "0",
  high: "0",
  volume: "0",
  price_change_percent: "0.00%",
  previous_close: "0",
  average: "0",
  timestamp: 0,
};
export interface MarketsState extends CommonState {
  list: Market[];
  filters: {
    [marketId: string]: FilterPrice;
  };
  currentMarket: Market | undefined;
  currentTicker: Ticker;
  tickerLoading: boolean;
  loading: boolean;
  timestamp?: number;
  tickersTimestamp?: number;
  successMarketPriceFetch: boolean;
  marketPrice: {
    market: string;
    side: string;
    price: string;
    created_at?: string;
    updated_at?: string;
  };
}

export const initialMarketsState: MarketsState = {
  list: [],
  filters: {},
  currentMarket: undefined,
  currentTicker: defaultTickers,
  tickerLoading: false,
  loading: false,
  successMarketPriceFetch: false,
  marketPrice: {
    market: "",
    side: "",
    price: "",
  },
};

export const marketsReducer = (state = initialMarketsState, action: MarketsAction) => {
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

    case MARKETS_SET_CURRENT_MARKET:
      return {
        ...state,
        currentMarket: action.payload,
      };

    case MARKETS_SET_CURRENT_MARKET_IFUNSET:
      if (state.currentMarket) {
        return state;
      }

      return {
        ...state,
        currentMarket: action.payload,
      };

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
        tickers: action.payload.ticker,
      };
    case MARKET_CURRENT_TICKERS_DATA:
      return {
        ...state,
        tickerLoading: false,
        currentTicker: action.payload.ticker,
      };
    case MARKET_CURRENT_TICKERS_UPDATE: {
      const updatedTicker = { ...state.currentTicker, ...action.payload };
      return {
        ...state,
        currentTicker: updatedTicker,
      };
    }
    case MARKETS_TICKERS_ERROR:
      return {
        ...state,
        tickerLoading: false,
      };
    case MARKET_PRICE_FETCH:
      return {
        ...state,
        marketPrice: {
          ...state.marketPrice,
          market: action.payload.market,
          side: action.payload.side,
        },
      };
    case MARKET_PRICE_DATA:
      return {
        ...state,
        successMarketPriceFetch: true,
        marketPrice: {
          ...state.marketPrice,
          ...action.payload,
        },
      };
    case MARKET_PRICE_ERROR:
      return {
        ...state,
        successMarketPriceFetch: false,
        marketPrice: initialMarketsState.marketPrice,
      };
    default:
      return state;
  }
};
