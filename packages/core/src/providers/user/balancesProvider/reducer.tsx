import { BalancesAction } from "./actions";
import {
  BALANCES_DATA,
  BALANCES_ERROR,
  BALANCES_FETCH,
  BALANCES_UPDATE_EVENT_DATA,
} from "./constants";
import { BalancesState } from "./types";

export const initialState: BalancesState = {
  loading: true,
  success: false,
  balances: [],
};

export const balancesReducer = (
  state = initialState,
  action: BalancesAction,
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
      const old = state.balances.find(
        (i) => i.assetId.toString() === update.assetId.toString(),
      );
      const newBalance = {
        ...update,
        onChainBalance: old.onChainBalance,
      };
      // filter out old balances from the balance state
      const balanceFiltered = state.balances?.filter(
        (balance) => balance.assetId.toString() !== update.assetId.toString(),
      );
      // apply updates to the balances in the state
      const newBalances = [...balanceFiltered, newBalance];
      return {
        ...state,
        balances: newBalances,
      };
    }
    default:
      return state;
  }
};
