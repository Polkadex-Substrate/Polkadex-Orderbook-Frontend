import { CommonError, OrderSide, OrderType } from "../../types";

import {
  ORDER_EXECUTE_DATA,
  ORDER_EXECUTE_ERROR,
  ORDER_EXECUTE_FETCH,
  ORDERS_SET_AMOUNT,
  ORDERS_SET_CURRENT_PRICE,
  ORDERS_SET_ORDER_TYPE,
  ORDER_EXECUTE_DATA_DELETE,
  ORDER_CANCEL_DATA,
  ORDER_CANCEL_FETCH,
  ORDER_CANCEL_DATA_DELETE,
  ORDER_CANCEL_ERROR,
} from "./constants";

export interface OrderExecution {
  market: string;
  symbol: string[];
  side: OrderSide;
  price?: string;
  order_type?: OrderType;
  amount?: string;
}

export interface OrderCancellation {
  orderId: string;
  base: string;
  quote: string;
}

export interface OrderExecuteFetch {
  type: typeof ORDER_EXECUTE_FETCH;
  payload: OrderExecution;
}

export interface OrderExecuteData {
  type: typeof ORDER_EXECUTE_DATA;
}

export interface OrderExecuteDataDelete {
  type: typeof ORDER_EXECUTE_DATA_DELETE;
}

export interface OrderExecuteError {
  type: typeof ORDER_EXECUTE_ERROR;
  error: CommonError;
}

export interface OrderCancelFetch {
  type: typeof ORDER_CANCEL_FETCH;
  payload: OrderCancellation;
}

export interface OrderCancelData {
  type: typeof ORDER_CANCEL_DATA;
}

export interface OrderCancelDataDelete {
  type: typeof ORDER_CANCEL_DATA_DELETE;
}

export interface OrderCancelError {
  type: typeof ORDER_CANCEL_ERROR;
  error: CommonError;
}

export interface SetCurrentPrice {
  type: typeof ORDERS_SET_CURRENT_PRICE;
  payload: number | undefined;
}

export interface SetAmount {
  type: typeof ORDERS_SET_AMOUNT;
  payload: string;
}

export interface SetOrderType {
  type: typeof ORDERS_SET_ORDER_TYPE;
  payload: string;
}

export type OrdersAction =
  | OrderExecuteFetch
  | OrderExecuteData
  | OrderExecuteDataDelete
  | OrderExecuteError
  | SetCurrentPrice
  | SetAmount
  | SetOrderType
  | OrderCancelFetch
  | OrderCancelData
  | OrderCancelDataDelete
  | OrderCancelError;

export const orderExecuteFetch = (
  payload: OrderExecuteFetch["payload"]
): OrderExecuteFetch => ({
  type: ORDER_EXECUTE_FETCH,
  payload,
});

export const orderExecuteData = (): OrderExecuteData => ({
  type: ORDER_EXECUTE_DATA,
});

export const orderExecuteDataDelete = (): OrderExecuteDataDelete => ({
  type: ORDER_EXECUTE_DATA_DELETE,
});

export const orderExecuteError = (error: CommonError): OrderExecuteError => ({
  type: ORDER_EXECUTE_ERROR,
  error,
});

export const orderCancelFetch = (payload: OrderCancelFetch["payload"]): OrderCancelFetch => ({
  type: ORDER_CANCEL_FETCH,
  payload,
});

export const orderCancelData = (): OrderCancelData => ({
  type: ORDER_CANCEL_DATA,
});

export const orderCancelDataDelete = (): OrderCancelDataDelete => ({
  type: ORDER_CANCEL_DATA_DELETE,
});

export const orderCancelError = (error: CommonError): OrderCancelError => ({
  type: ORDER_CANCEL_ERROR,
  error,
});

export const setCurrentPrice = (payload: SetCurrentPrice["payload"]): SetCurrentPrice => ({
  type: ORDERS_SET_CURRENT_PRICE,
  payload,
});

export const setAmount = (payload: SetAmount["payload"]): SetAmount => ({
  type: ORDERS_SET_AMOUNT,
  payload,
});

export const setOrderType = (payload: SetOrderType["payload"]): SetOrderType => ({
  type: ORDERS_SET_ORDER_TYPE,
  payload,
});
