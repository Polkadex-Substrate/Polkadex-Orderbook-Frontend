import { DepthActions, OrderBookActions } from "./actions";
import {
  DEPTH_DATA,
  DEPTH_ERROR,
  DEPTH_FETCH,
  ORDER_BOOK_DATA,
  DEPTH_DATA_INCREMENT,
  ORDER_BOOK_ERROR,
  ORDER_BOOK_FETCH,
} from "./constants";
import { DepthIncrementState, DepthState, OrderBookState } from "./types";

import { defaultConfig } from "@polkadex/orderbook-config";
import { sliceArray } from "@polkadex/web-helpers";

const { orderBookSideLimit } = defaultConfig;
// TODO: Move market depth to his own module

export const initialOrderBook: OrderBookState = {
  asks: [],
  bids: [],
  loading: false,
};

export const initialDepth: DepthState = {
  asks: [],
  bids: [],
  loading: false,
};

export const initialIncrementDepth: DepthIncrementState = {
  marketId: undefined,
  asks: [],
  bids: [],
  sequence: null,
  loading: false,
};

export const orderBookReducer = (
  state = initialOrderBook,
  action: OrderBookActions
): OrderBookState => {
  switch (action.type) {
    case ORDER_BOOK_FETCH:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case ORDER_BOOK_DATA: {
      const { asks, bids } = action.payload;

      return {
        ...state,
        asks: sliceArray(asks, orderBookSideLimit),
        bids: sliceArray(bids, orderBookSideLimit),
        loading: false,
        error: undefined,
      };
    }
    case ORDER_BOOK_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };

    default:
      return state;
  }
};

export const depthReducer = (state = initialDepth, action: DepthActions): DepthState => {
  switch (action.type) {
    case DEPTH_FETCH:
      return {
        ...state,
        loading: true,
        error: undefined,
      };
    case DEPTH_DATA: {
      const { asks, bids } = action.payload;

      return {
        ...state,
        asks: sliceArray(asks, orderBookSideLimit),
        bids: sliceArray(bids, orderBookSideLimit),
        loading: false,
        error: undefined,
      };
    }
    case DEPTH_ERROR:
      return {
        ...state,
        loading: false,
        error: action.error,
      };
    case DEPTH_DATA_INCREMENT: {
      let asks = [...state.asks];
      let bids = [...state.bids];
      const update = action.payload;

      // check if any deletion need to made to orderbook
      if (update.dels.length > 0) {
        const asksDels = update.dels.filter((x) => x.side === "Ask");
        asks = asks.filter((val) => !asksDels.some((x) => x.price === val[0]));
        const bidsDels = update.dels.filter((x) => x.side === "Bid");
        bids = bids.filter((val) => !bidsDels.some((x) => x.price === val[0]));
      }
      // check if any updates need to be made to a prices in
      else if (update.puts.length > 0) {
        const asksPuts = update.puts.filter((x) => x.side === "Ask");
        asksPuts.forEach((askPut) => {
          const idx = asks.findIndex((x) => x[0] === askPut.price);
          if (idx < 0) {
            asks.push([askPut.price, askPut.qty]);
          } else {
            asks[idx] = [askPut.price, askPut.qty];
          }
        });
        const bidsPuts = update.puts.filter((x) => x.side === "Bid");
        bidsPuts.forEach((bidPut) => {
          const idx = bids.findIndex((x) => x[0] === bidPut.price);
          if (idx < 0) {
            bids.push([bidPut.price, bidPut.qty]);
          } else {
            bids[idx] = [bidPut.price, bidPut.qty];
          }
        });
      }
      return { ...state, asks: asks, bids: bids };
    }
    default:
      return state;
  }
};
