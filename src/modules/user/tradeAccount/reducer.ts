import { keyring } from "@polkadot/ui-keyring";

import { TradeAccountsAction } from "./actions";
import {
  REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_RESET,
  USER_TRADE_ACCOUNT_PUSH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  USER_TRADE_ACCOUNT_UNLOCK,
  USER_TRADE_ACCOUNTS_DATA,
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
} from "./constants";

import { TradeAccount } from "@polkadex/orderbook/modules/types";

export interface TradeAccountsState {
  success?: boolean;
  isFetching: boolean;
  allBrowserAccounts: TradeAccount[];
  registerAccountLoading: boolean;
  registerAccountSuccess: boolean;
  removesInLoading: Array<string>;
}

const initialState: TradeAccountsState = {
  isFetching: false,
  success: false,
  allBrowserAccounts: [],
  registerAccountLoading: false,
  registerAccountSuccess: false,
  removesInLoading: [],
};

export const TradeAccountsReducer = (
  state = initialState,
  action: TradeAccountsAction
): TradeAccountsState => {
  switch (action.type) {
    case USER_TRADE_ACCOUNTS_DATA:
      return {
        ...state,
        isFetching: false,
        success: true,
        allBrowserAccounts: action.payload.allAccounts,
      };

    case USER_TRADE_ACCOUNTS_FETCH:
      return {
        ...state,
        isFetching: false,
        success: false,
      };
    case USER_TRADE_ACCOUNTS_ERROR:
      return {
        ...state,
        success: false,
        isFetching: true,
      };
    case USER_REGISTER_TRADE_ACCOUNT_FETCH:
      return {
        ...state,
        registerAccountLoading: true,
        registerAccountSuccess: false,
      };

    case USER_REGISTER_TRADE_ACCOUNT_DATA:
      return {
        ...state,
        registerAccountLoading: false,
        registerAccountSuccess: true,
      };
    case USER_REGISTER_TRADE_ACCOUNT_RESET:
    case USER_REGISTER_TRADE_ACCOUNT_ERROR:
      return {
        ...state,
        registerAccountLoading: false,
        registerAccountSuccess: false,
      };
    case REMOVE_TRADE_ACCOUNT_FROM_BROWSER: {
      const { address } = action.payload;
      const newAccounts = state.allBrowserAccounts.filter(
        (account) => account?.address !== address
      );
      keyring.forgetAccount(address);
      return {
        ...state,
        allBrowserAccounts: newAccounts,
      };
    }
    case USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH:
      return {
        ...state,
        removesInLoading: [...state.removesInLoading, action.payload.address],
      };
    case USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA:
      return {
        ...state,
        removesInLoading: state.removesInLoading.filter((v) => v !== action.payload.address),
      };
    case USER_TRADE_ACCOUNT_UNLOCK: {
      const { address, password } = action.payload;
      try {
        const _allAccounts = [...state.allBrowserAccounts];
        const pair = _allAccounts.find((account) => account?.address === address);
        if (!pair) {
          return state;
        }
        pair.unlock(password.toString());
        return {
          ...state,
          allBrowserAccounts: _allAccounts,
        };
      } catch (e) {
        console.log("password error", e);
        alert("invalid password");
        return state;
      }
    }
    case USER_TRADE_ACCOUNT_PUSH: {
      const { pair } = action.payload;
      const _allAccounts = [...state.allBrowserAccounts];
      _allAccounts.push(pair);
      return {
        ...state,
        allBrowserAccounts: _allAccounts,
      };
    }
    default:
      return state;
  }
};
