import { TradesAction } from "./actions";
import { TRADES_DATA, TRADES_ERROR, TRADES_FETCH, USER_TRADES_UPDATE_DATA } from "./constants";
import * as T from "./types";

export const initialState: T.TradesState = {
  loading: false,
  success: false,
  data: [],
};

export const tradesReducer = (state = initialState, action: TradesAction): T.TradesState => {
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
        data: action.payload,
      };
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
