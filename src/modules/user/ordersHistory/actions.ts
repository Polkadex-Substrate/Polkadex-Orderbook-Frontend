import { CommonError, OrderCommon, OrderSide } from "../../types";

import {
  ORDERS_CHANNEL_FETCH,
  ORDERS_HISTORY_DATA,
  ORDERS_HISTORY_ERROR,
  ORDERS_HISTORY_FETCH,
} from "./constants";

export interface UserOrdersHistoryFetch {
  type: typeof ORDERS_HISTORY_FETCH;
}
export interface UserOrdersHistoryData {
  type: typeof ORDERS_HISTORY_DATA;
  payload: { list: OrderCommon[] };
}

export interface UserOrdersHistoryError {
  type: typeof ORDERS_HISTORY_ERROR;
  error: CommonError;
}
export interface FetchOrderUpdatesChannel {
  type: typeof ORDERS_CHANNEL_FETCH;
}
export type OrderUpdateEvent = {
  order_id: string;
  market_id: string;
  market_type: string;
  side: OrderSide;
  quantity: number;
};
export type OrdersHistoryAction =
  | UserOrdersHistoryFetch
  | UserOrdersHistoryData
  | UserOrdersHistoryError
  | FetchOrderUpdatesChannel;

export const userOrdersHistoryFetch = (): UserOrdersHistoryFetch => ({
  type: ORDERS_HISTORY_FETCH,
});

export const userOrdersHistoryData = (
  payload: UserOrdersHistoryData["payload"]
): UserOrdersHistoryData => ({
  type: ORDERS_HISTORY_DATA,
  payload,
});

export const userOrdersHistoryError = (error: CommonError): UserOrdersHistoryError => ({
  type: ORDERS_HISTORY_ERROR,
  error,
});
