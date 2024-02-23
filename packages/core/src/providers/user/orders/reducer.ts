import { OrdersState } from "./types";
import { OrdersAction } from "./actions";
import { ORDERS_SET_AMOUNT, ORDERS_SET_CURRENT_PRICE } from "./constants";

export const initialState: OrdersState = {
  currentPrice: undefined,
  amount: "",
};

export const ordersReducer = (state: OrdersState, action: OrdersAction) => {
  switch (action.type) {
    case ORDERS_SET_CURRENT_PRICE:
      return {
        ...state,
        currentPrice: action.payload,
      };
    case ORDERS_SET_AMOUNT:
      return {
        ...state,
        amount: action.payload,
      };
    default:
      return state;
  }
};
