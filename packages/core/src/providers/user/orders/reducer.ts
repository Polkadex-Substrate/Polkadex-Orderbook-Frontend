import { OrdersState } from "./types";
import { OrdersAction } from "./actions";
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

export const ordersReducer = (state: OrdersState, action: OrdersAction) => {
  switch (action.type) {
    case ORDER_EXECUTE_FETCH:
      return {
        ...state,
        execute: { ...state.execute, isLoading: true, isError: false },
      };
    case ORDER_EXECUTE_DATA:
      return {
        ...state,
        execute: {
          ...state.execute,
          isLoading: false,
          isError: false,
          isSuccess: true,
        },
      };
    case ORDER_EXECUTE_DATA_DELETE:
      return {
        ...state,
        execute: { ...state.execute, isLoading: false, isSuccess: false },
      };
    case ORDER_EXECUTE_ERROR:
      return {
        ...state,
        execute: {
          ...state.execute,
          isLoading: false,
          isError: true,
          message: action.error.message,
        },
      };
    case ORDER_CANCEL_FETCH:
      return {
        ...state,
        cancel: { ...state.cancel, isLoading: true, isError: false },
      };
    case ORDER_CANCEL_DATA: {
      return {
        ...state,
        cancel: {
          ...state.cancel,
          isLoading: false,
          isError: false,
          isSuccess: true,
        },
      };
    }
    case ORDER_CANCEL_DATA_DELETE: {
      return {
        ...state,
        cancel: { ...state.cancel, isSuccess: false },
      };
    }
    case ORDER_CANCEL_ERROR: {
      return {
        ...state,
        cancel: {
          ...state.cancel,
          isLoading: false,
          isError: true,
          message: action.error.message,
        },
      };
    }
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
    case ORDERS_SET_ORDER_TYPE:
      return {
        ...state,
        orderType: action.payload,
      };
    default:
      return state;
  }
};
