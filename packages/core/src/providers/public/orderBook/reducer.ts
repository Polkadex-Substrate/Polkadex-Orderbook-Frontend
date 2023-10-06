import _ from "lodash";
import { deleteFromBook, replaceOrAddToBook } from "@orderbook/core/helpers";

import {
  DEPTH_DATA,
  DEPTH_ERROR,
  DEPTH_FETCH,
  ORDER_BOOK_DATA,
  DEPTH_DATA_INCREMENT,
  ORDER_BOOK_ERROR,
  ORDER_BOOK_FETCH,
} from "./constants";
import { OrderBookState } from "./types";
import { OrderBookActions, DepthActions } from "./actions";

export const initialOrderBook: OrderBookState = {
  orderbook: { asks: [], bids: [], loading: true },
  depth: { asks: [], bids: [], loading: true },
};

export const orderBookReducer = (
  state: OrderBookState,
  action: OrderBookActions | DepthActions,
) => {
  switch (action.type) {
    case ORDER_BOOK_FETCH:
      return {
        ...state,
        orderbook: {
          ...state.orderbook,
          loading: true,
          error: undefined,
        },
      };
    case ORDER_BOOK_DATA: {
      const { asks, bids } = action.payload;

      return {
        ...state,
        orderbook: {
          asks: asks,
          bids: bids,
          loading: false,
          error: undefined,
        },
      };
    }
    case ORDER_BOOK_ERROR:
      return {
        ...state,
        orderbook: {
          ...state.orderbook,
          loading: false,
          error: action.error,
        },
      };
    case DEPTH_FETCH:
      return {
        ...state,
        depth: {
          ...state.depth,
          loading: true,
          error: undefined,
        },
      };
    case DEPTH_DATA: {
      const { asks, bids } = action.payload;

      return {
        ...state,
        depth: {
          asks: asks,
          bids: bids,
          loading: false,
          error: undefined,
        },
      };
    }
    case DEPTH_ERROR:
      return {
        ...state,
        depth: {
          ...state.depth,
          loading: false,
          error: action.error,
        },
      };
    case DEPTH_DATA_INCREMENT: {
      let book = { ask: [...state.depth.asks], bid: [...state.depth.bids] };
      const incrementalData = action.payload;
      incrementalData.forEach((item) => {
        if (Number(item.qty) === 0) {
          book = deleteFromBook(book, item.price, item.side.toLowerCase());
        } else
          book = replaceOrAddToBook(
            book,
            item.price,
            item.qty,
            item.side.toLowerCase(),
          );
      });
      return {
        ...state,
        depth: {
          ...state.depth,
          asks: _.cloneDeep(book.ask),
          bids: _.cloneDeep(book.bid),
        },
      };
    }
    default:
      return state;
  }
};
