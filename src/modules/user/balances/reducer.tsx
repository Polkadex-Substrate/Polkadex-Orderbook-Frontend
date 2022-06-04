import { BalancesAction, Balance } from "./actions";
import {
  BALANCES_CHANNEL_TRADE_UPDATE_DATA,
  BALANCES_CHANNEL_TRANSFER_UPDATE_DATA,
  BALANCES_DATA,
  BALANCES_ERROR,
  BALANCES_FETCH,
} from "./constants";

export interface BalancesState {
  error?: string;
  loading: boolean;
  success: boolean;
  balances: Balance[];
  timestamp?: number;
}

const initialState: BalancesState = {
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
    case BALANCES_CHANNEL_TRADE_UPDATE_DATA: {
      const updates = action.payload;
      // filter out old balances from the balance state
      const balanceFiltered = state.balances.filter(
        (balance) => !updates.some((update) => update.assetId === balance.assetId)
      );
      // apply updates to the balances in the state
      const newBalances = [...balanceFiltered, ...updates];
      return {
        ...state,
        balances: newBalances,
      };
    }
    case BALANCES_CHANNEL_TRANSFER_UPDATE_DATA: {
      const { assetId, amount, name, symbol } = action.payload;
      let update: Balance | undefined;
      // filter out old balances from the balance state
      const balanceFiltered = state.balances.filter(
        (balance) => !(balance.assetId === assetId)
      );
      // check if balance already exists in the state
      const balaceOfAsset = state.balances.find((balance) => balance.assetId === assetId);
      if (!balaceOfAsset) {
        // if not, create a new balance
        update = {
          assetId,
          name,
          symbol,
          reserved_balance: "0",
          free_balance: amount,
        };
      } else {
        // if the assetId already exists in the state, update the free balance
        const newFreeBalance = Number(balaceOfAsset.free_balance) + Number(amount);
        update = {
          ...balaceOfAsset,
          free_balance: newFreeBalance.toString(),
        };
      }
      return {
        ...state,
        balances: [...balanceFiltered, update],
      };
    }
    default:
      return state;
  }
};
