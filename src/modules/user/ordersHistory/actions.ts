import { CommonError, OrderCommon } from "../../types";

import {
  OPEN_ORDERS_HISTORY_DATA,
  OPEN_ORDERS_HISTORY_FETCH,
  ORDERS_HISTORY_DATA,
  ORDERS_HISTORY_ERROR,
  ORDERS_HISTORY_FETCH,
  ORDER_UPDATE_EVENT,
  ORDER_UPDATE_EVENT_DATA,
} from "./constants";
import { SetOrder } from "./types";

export interface UserOrdersHistoryFetch {
  type: typeof ORDERS_HISTORY_FETCH;
  payload: {
    dateFrom: Date;
    dateTo: Date;
    tradeAddress: string;
  };
}
export interface UserOrdersHistoryData {
  type: typeof ORDERS_HISTORY_DATA;
  payload: { list: OrderCommon[] };
}

export interface UserOrdersHistoryError {
  type: typeof ORDERS_HISTORY_ERROR;
  error: CommonError;
}
export interface UserOpenOrdersHistoryFetch {
  type: typeof OPEN_ORDERS_HISTORY_FETCH;
  payload: {
    tradeAddress: string;
  };
}

export interface UserOpenOrdersHistoryData {
  type: typeof OPEN_ORDERS_HISTORY_DATA;
  payload: { list: OrderCommon[] };
}
export interface OrderUpdateEvent {
  type: typeof ORDER_UPDATE_EVENT;
  payload: SetOrder;
}

export interface OrderUpdateEventData {
  type: typeof ORDER_UPDATE_EVENT_DATA;
  payload: OrderCommon;
}

export type OrdersHistoryAction =
  | UserOrdersHistoryFetch
  | UserOrdersHistoryData
  | UserOrdersHistoryError
  | OrderUpdateEventData
  | UserOpenOrdersHistoryData;

export const userOrdersHistoryFetch = (
  payload: UserOrdersHistoryFetch["payload"]
): UserOrdersHistoryFetch => ({
  type: ORDERS_HISTORY_FETCH,
  payload,
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

export const userOpenOrdersHistoryFetch = (
  payload: UserOpenOrdersHistoryFetch["payload"]
): UserOpenOrdersHistoryFetch => ({
  type: OPEN_ORDERS_HISTORY_FETCH,
  payload,
});

export const userOpenOrderHistoryData = (
  payload: UserOpenOrdersHistoryData["payload"]
): UserOpenOrdersHistoryData => ({
  type: OPEN_ORDERS_HISTORY_DATA,
  payload,
});

export const orderUpdateEvent = (payload: OrderUpdateEvent["payload"]): OrderUpdateEvent => ({
  type: ORDER_UPDATE_EVENT,
  payload,
});

export const orderUpdateEventData = (
  payload: OrderUpdateEventData["payload"]
): OrderUpdateEventData => ({
  type: ORDER_UPDATE_EVENT_DATA,
  payload,
});
