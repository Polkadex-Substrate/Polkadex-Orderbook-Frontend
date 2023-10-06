import { TradesAction } from "./actions";
import {
  TRADES_DATA,
  TRADES_ERROR,
  TRADES_FETCH,
  TRADES_RESET,
  USER_TRADES_UPDATE_DATA,
} from "./constants";
import * as T from "./types";

export const initialState: T.TradesState = {
  loading: false,
  success: false,
  data: [],
  tradeHistoryNextToken: null,
};

export const tradesReducer = (
  state = initialState,
  action: TradesAction,
): T.TradesState => {
  switch (action.type) {
    case TRADES_FETCH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case TRADES_DATA:
      return {
        ...state,
        loading: false,
        success: true,
        data: state.data.concat(action.payload.trades),
        tradeHistoryNextToken: action.payload.nextToken,
      };
    case TRADES_RESET: {
      return { ...state, data: [], tradeHistoryNextToken: null };
    }
    case USER_TRADES_UPDATE_DATA: {
      const trade = action.payload;
      const trades = [...state.data];
      return {
        ...state,
        data: [...trades, trade],
      };
    }
    case TRADES_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
};
