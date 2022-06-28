import { CommonError } from "../../types";
import { Market } from "../markets/types";

import {
  DEPTH_DATA,
  DEPTH_ERROR,
  DEPTH_FETCH,
  ORDER_BOOK_CHANNEL_FETCH,
  ORDER_BOOK_DATA,
  DEPTH_DATA_INCREMENT,
  ORDER_BOOK_ERROR,
  ORDER_BOOK_FETCH,
} from "./constants";
import { DepthState, OrderBookState } from "./types";

export interface OrderBookFetch {
  type: typeof ORDER_BOOK_FETCH;
  payload: Market;
}

export interface OrderBookData {
  type: typeof ORDER_BOOK_DATA;
  payload: OrderBookState;
}

export interface OrderBookError {
  type: typeof ORDER_BOOK_ERROR;
  error: CommonError;
}

export interface OrderBookChannelFetch {
  type: typeof ORDER_BOOK_CHANNEL_FETCH;
  payload: Market;
}

type IncData = { price: string; qty: string; side: "Bid" | "Ask" };
export interface DepthDataIncrement {
  type: typeof DEPTH_DATA_INCREMENT;
  payload: {
    puts: IncData[];
    dels: IncData[];
    m: string; // marketid
  };
}

export type OrderBookActions = OrderBookFetch | OrderBookData | OrderBookError;

export interface DepthFetch {
  type: typeof DEPTH_FETCH;
  payload: Market;
}

export interface DepthData {
  type: typeof DEPTH_DATA;
  payload: DepthState;
}

export interface DepthError {
  type: typeof DEPTH_ERROR;
  error: CommonError;
}

export type DepthActions = DepthFetch | DepthData | DepthError | DepthDataIncrement;

export const orderBookFetch = (payload: OrderBookFetch["payload"]): OrderBookFetch => ({
  type: ORDER_BOOK_FETCH,
  payload,
});
export const orderBookChannelFetch = (
  payload: OrderBookChannelFetch["payload"]
): OrderBookChannelFetch => ({
  type: ORDER_BOOK_CHANNEL_FETCH,
  payload,
});
export const orderBookData = (payload: OrderBookData["payload"]): OrderBookData => ({
  type: ORDER_BOOK_DATA,
  payload,
});

export const orderBookError = (error: OrderBookError["error"]): OrderBookError => ({
  type: ORDER_BOOK_ERROR,
  error,
});

export const depthFetch = (payload: DepthFetch["payload"]): DepthFetch => ({
  type: DEPTH_FETCH,
  payload,
});

export const depthData = (payload: DepthData["payload"]): DepthData => ({
  type: DEPTH_DATA,
  payload,
});

export const depthError = (error: DepthError["error"]): DepthError => ({
  type: DEPTH_ERROR,
  error,
});

export const depthDataIncrement = (payload: DepthDataIncrement["payload"]) => ({
  type: DEPTH_DATA_INCREMENT,
  payload,
});
