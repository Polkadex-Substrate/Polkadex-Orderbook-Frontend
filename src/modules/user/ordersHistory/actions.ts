import { CommonError, OrderCommon } from "../../types";
import { ProxyAccount } from "../profile";

import { ORDERS_HISTORY_DATA, ORDERS_HISTORY_ERROR, ORDERS_HISTORY_FETCH } from "./constants";

interface UserOrdersHistoryFetchPayload {
  userAccount: ProxyAccount;
}

export interface UserOrdersHistoryDataPayload {
  list: OrderCommon[];
}

export interface UserOrdersHistoryFetch {
  type: typeof ORDERS_HISTORY_FETCH;
  payload: UserOrdersHistoryFetchPayload;
}

export interface UserOrdersHistoryData {
  type: typeof ORDERS_HISTORY_DATA;
  payload: UserOrdersHistoryDataPayload;
}

export interface UserOrdersHistoryError {
  type: typeof ORDERS_HISTORY_ERROR;
  error: CommonError;
}

export type OrdersHistoryAction =
  | UserOrdersHistoryFetch
  | UserOrdersHistoryData
  | UserOrdersHistoryError;

export const userOrdersHistoryFetch = (
  payload: UserOrdersHistoryFetchPayload
): UserOrdersHistoryFetch => ({
  type: ORDERS_HISTORY_FETCH,
  payload,
});

export const userOrdersHistoryData = (
  payload: UserOrdersHistoryDataPayload
): UserOrdersHistoryData => ({
  type: ORDERS_HISTORY_DATA,
  payload,
});

export const userOrdersHistoryError = (error: CommonError): UserOrdersHistoryError => ({
  type: ORDERS_HISTORY_ERROR,
  error,
});
