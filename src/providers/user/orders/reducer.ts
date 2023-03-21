import { OrdersState } from "./types";
import {
  ORDER_EXECUTE_DATA,
  ORDER_EXECUTE_ERROR,
  ORDER_EXECUTE_FETCH,
  ORDERS_SET_AMOUNT,
  ORDERS_SET_CURRENT_PRICE,
  ORDERS_SET_ORDER_TYPE,
  ORDER_EXECUTE_DATA_DELETE,
  ORDER_CANCEL_FETCH,
  ORDER_CANCEL_DATA,
  ORDER_CANCEL_DATA_DELETE,
  ORDER_CANCEL_ERROR,
} from "./constants";

const initialTemplate = {
  isLoading: false,
  message: null,
  isError: false,
  isSuccess: false,
};

export const initialState: OrdersState = {
  execute: { ...initialTemplate },
  cancel: { ...initialTemplate },
  currentPrice: undefined,
  amount: "",
  orderType: "",
};

export const ordersReducer = (state: OrdersState, action: any) => {
  switch (action.type) {
    default:
      return state;
  }
};
