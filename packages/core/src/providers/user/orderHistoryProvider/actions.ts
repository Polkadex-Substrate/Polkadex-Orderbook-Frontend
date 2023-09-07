import { CommonError, OrderCommon } from "../../types";

import {
  OPEN_ORDERS_HISTORY_DATA,
  OPEN_ORDERS_HISTORY_ERROR,
  OPEN_ORDERS_HISTORY_FETCH,
  ORDERS_HISTORY_DATA,
  ORDERS_HISTORY_ERROR,
  ORDERS_HISTORY_FETCH,
  RESET_ORDER_HISTORY,
  ORDER_UPDATE_EVENT,
  ORDER_UPDATE_EVENT_DATA,
  ORDER_UPDATE_EVENT_ERROR,
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
  payload: { list: OrderCommon[]; nextToken: string | null };
}

export interface UserOrdersHistoryReset {
  type: typeof RESET_ORDER_HISTORY;
}

export interface UserOrdersHistoryError {
  type: typeof ORDERS_HISTORY_ERROR;
  error: CommonError;
}
export interface UserOpenOrdersHistoryFetch {
  type: typeof OPEN_ORDERS_HISTORY_FETCH;
}

export interface UserOpenOrdersHistoryData {
  type: typeof OPEN_ORDERS_HISTORY_DATA;
  payload: { list: OrderCommon[] };
}
export interface UserOpenOrdersHistoryError {
  type: typeof OPEN_ORDERS_HISTORY_ERROR;
  error: CommonError;
}
export interface OrderUpdateEvent {
  type: typeof ORDER_UPDATE_EVENT;
  payload: SetOrder;
}

export interface OrderUpdateEventData {
  type: typeof ORDER_UPDATE_EVENT_DATA;
  payload: OrderCommon;
}
export interface OrderUpdateEventError {
  type: typeof ORDER_UPDATE_EVENT_ERROR;
  error: CommonError;
}
export type OrdersHistoryAction =
  | UserOrdersHistoryFetch
  | UserOrdersHistoryData
  | UserOrdersHistoryError
  | OrderUpdateEventData
  | UserOpenOrdersHistoryData
  | UserOrdersHistoryReset
  | OrderUpdateEventError
  | UserOpenOrdersHistoryError;

export const userOrdersHistoryFetch = (
  payload: UserOrdersHistoryFetch["payload"],
): UserOrdersHistoryFetch => ({
  type: ORDERS_HISTORY_FETCH,
  payload,
});

export const userOrdersHistoryData = (
  payload: UserOrdersHistoryData["payload"],
): UserOrdersHistoryData => ({
  type: ORDERS_HISTORY_DATA,
  payload,
});

export const userOrdersHistoryReset = (): UserOrdersHistoryReset => ({
  type: RESET_ORDER_HISTORY,
});

export const userOrdersHistoryError = (
  error: CommonError,
): UserOrdersHistoryError => ({
  type: ORDERS_HISTORY_ERROR,
  error,
});

export const userOpenOrdersHistoryFetch = (): UserOpenOrdersHistoryFetch => ({
  type: OPEN_ORDERS_HISTORY_FETCH,
});

export const userOpenOrderHistoryData = (
  payload: UserOpenOrdersHistoryData["payload"],
): UserOpenOrdersHistoryData => ({
  type: OPEN_ORDERS_HISTORY_DATA,
  payload,
});

export const userOpenOrdersHistoryError = (
  error: CommonError,
): UserOpenOrdersHistoryError => ({
  type: OPEN_ORDERS_HISTORY_ERROR,
  error,
});

export const orderUpdateEvent = (
  payload: OrderUpdateEvent["payload"],
): OrderUpdateEvent => ({
  type: ORDER_UPDATE_EVENT,
  payload,
});

export const orderUpdateEventData = (
  payload: OrderUpdateEventData["payload"],
): OrderUpdateEventData => ({
  type: ORDER_UPDATE_EVENT_DATA,
  payload,
});

export const orderUpdateEventError = (
  error: CommonError,
): OrderUpdateEventError => ({
  type: ORDER_UPDATE_EVENT_ERROR,
  error,
});
