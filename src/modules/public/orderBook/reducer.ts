import _ from "lodash";

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
import { deleteFromBook, replaceOrAddToBook, sliceArray } from "@polkadex/web-helpers";

const { orderBookSideLimit } = defaultConfig;

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
      let book = { ask: [...state.asks], bid: [...state.bids] };
      const incrementalData = action.payload;
      incrementalData.forEach((item) => {
        if (Number(item.qty) === 0) {
          book = deleteFromBook(book, item.price, item.side.toLowerCase());
        } else book = replaceOrAddToBook(book, item.price, item.qty, item.side.toLowerCase());
      });
      return { ...state, asks: _.cloneDeep(book.ask), bids: _.cloneDeep(book.bid) };
    }
    default:
      return state;
  }
};
