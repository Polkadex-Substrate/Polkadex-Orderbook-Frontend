import { ORDERS_SET_AMOUNT, ORDERS_SET_CURRENT_PRICE } from "./constants";

export interface SetCurrentPrice {
  type: typeof ORDERS_SET_CURRENT_PRICE;
  payload: number | undefined;
}

export interface SetAmount {
  type: typeof ORDERS_SET_AMOUNT;
  payload: string;
}

export type OrdersAction = SetCurrentPrice | SetAmount;

export const setCurrentPrice = (
  payload: SetCurrentPrice["payload"]
): SetCurrentPrice => ({
  type: ORDERS_SET_CURRENT_PRICE,
  payload,
});

export const setAmount = (payload: SetAmount["payload"]): SetAmount => ({
  type: ORDERS_SET_AMOUNT,
  payload,
});
