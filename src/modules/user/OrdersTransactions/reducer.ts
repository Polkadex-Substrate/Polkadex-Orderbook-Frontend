import { ordersTransactionAction } from "./actions";
import { CANCEL_SINGLE_ORDER, PLACE_SINGLE_ORDER } from "./constants";

export interface orderTxn {
  date: string;
  baseUnit: string;
  quoteUnit: string;
  side: string;
  isSell: boolean;
  price: string;
  amount: string;
  total: string;
  filled: string;
  type: string;
  uuid: string;
}

export interface OrderTransactionState {
  orders: Array<orderTxn>;
}

export const initialState: OrderTransactionState = {
  orders: [],
};

export const orderTransactionReducer = (
  state = initialState,
  action: ordersTransactionAction
) => {
  const { type, payload } = action;

  switch (type) {
    case CANCEL_SINGLE_ORDER:
      return {
        ...state,
        orders: state.orders.filter((data) => data.uuid !== payload.uuid),
      };

    case PLACE_SINGLE_ORDER:
      return {
        ...state,
        orders: [...state.orders, payload.order],
      };
    default:
      return state;
  }
};
