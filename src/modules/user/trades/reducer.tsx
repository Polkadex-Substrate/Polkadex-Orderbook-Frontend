import { TradesAction, UserTrade } from "./actions";
import { TRADES_DATA, TRADES_ERROR, TRADES_FETCH } from "./constants";

export interface TradesState {
  error?: string;
  loading: boolean;
  success: boolean;
  data: UserTrade[];
}

const initialState: TradesState = {
  loading: false,
  success: false,
  data: [],
};

export const tradesReducer = (state = initialState, action: TradesAction) => {
  switch (action.type) {
    case TRADES_FETCH:
      return {
        ...state,
        laoding: true,
        success: false,
      };
    case TRADES_DATA:
      return {
        ...state,
        laoding: false,
        success: true,
        data: action.payload,
      };
    case TRADES_ERROR:
      return {
        ...state,
        laoding: false,
        success: false,
        error: action.error,
      };
    default:
      return state;
  }
};
