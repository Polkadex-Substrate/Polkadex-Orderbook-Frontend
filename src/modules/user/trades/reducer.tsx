import { TradesAction, UserTrade } from "./actions";
import { TRADES_DATA, TRADES_ERROR, TRADES_FETCH, USER_TRADES_UPDATE_DATA } from "./constants";

export interface TradesState {
  error?: string;
  loading: boolean;
  success: boolean;
  data: UserTrade[];
  tradeAddress: string;
}

const initialState: TradesState = {
  tradeAddress: "",
  loading: false,
  success: false,
  data: [],
};

export const tradesReducer = (state = initialState, action: TradesAction): TradesState => {
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
        data: action.payload.trades,
        tradeAddress: action.payload.tradeAddress,
      };
    case USER_TRADES_UPDATE_DATA: {
      // check if event is for the current trade address
      if (action.payload.tradeAddress !== state.tradeAddress) {
        return state;
      }
      const trade = action.payload.trade;
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
