import { BalancesAction } from "./actions";
import {
  BALANCES_DATA,
  BALANCES_ERROR,
  BALANCES_FETCH,
  BALANCES_UPDATE_EVENT_DATA,
} from "./constants";
import { BalancesState } from "./types";

export const initialState: BalancesState = {
  loading: false,
  success: false,
  balances: [],
};

export const balancesReducer = (
  state = initialState,
  action: BalancesAction
): BalancesState => {
  switch (action.type) {
    case BALANCES_FETCH:
      return {
        ...state,
        loading: true,
        success: false,
      };
    case BALANCES_DATA:
      return {
        ...state,
        balances: action.payload.balances,
        timestamp: action.payload.timestamp,
        loading: false,
        success: true,
      };
    case BALANCES_ERROR:
      return {
        ...state,
        loading: false,
        success: false,
        error: action.error,
      };
    case BALANCES_UPDATE_EVENT_DATA: {
      const update = action.payload;
      // filter out old balances from the balance state
      const balanceFiltered = state.balances?.filter(
        (balance) => balance.asset_id.toString() !== update.asset_id.toString()
      );
      // apply updates to the balances in the state
      const newBalances = [...balanceFiltered, update];
      return {
        ...state,
        balances: newBalances,
      };
    }
    default:
      return state;
  }
};
