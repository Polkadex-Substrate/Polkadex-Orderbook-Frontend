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

export const initialOrderBook: OrderBookState = {
  orderbook: { asks: [], bids: [], loading: false },
  depth: { asks: [], bids: [], loading: false },
};

export const orderBookReducer = (state: OrderBookState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
