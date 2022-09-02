import { keyring } from "@polkadot/ui-keyring";

import { TradeAccountsAction, InjectedAccount } from "./actions";
import {
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNTS_DATA,
  SET_CURRENT_TRADE_ACCOUNT,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
  USER_REGISTER_TRADE_ACCOUNT_RESET,
  REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  SET_CURRENT_TRADE_ACCOUNT_DATA,
  RESET_CURRENT_TRADE_ACCOUNT,
} from "./constants";

export interface TradeAccountsState {
  success?: boolean;
  isFetching: boolean;
  allAccounts: string[];
  allBrowserAccounts: InjectedAccount[];
  selectedAccount: InjectedAccount;
  registerAccountLoading: boolean;
  registerAccountSuccess: boolean;
  mainAddress: string;
}
export const defaultAccount: InjectedAccount = {
  address: "",
  meta: {},
  type: "",
  isPassworded: false,
};
const initialState: TradeAccountsState = {
  isFetching: false,
  success: false,
  allAccounts: [],
  allBrowserAccounts: [],
  selectedAccount: defaultAccount,
  registerAccountLoading: false,
  registerAccountSuccess: false,
  mainAddress: "",
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
    case SET_CURRENT_TRADE_ACCOUNT_DATA:
      return {
        ...state,
        selectedAccount: action.payload.tradeAccount,
        mainAddress: action.payload?.mainAddress,
      };

    case RESET_CURRENT_TRADE_ACCOUNT:
      return {
        ...state,
        selectedAccount: defaultAccount,
        mainAddress: "",
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
        (account) => account.address !== address
      );
      keyring.forgetAddress(address);
      return {
        ...state,
        selectedAccount:
          state.selectedAccount.address === address ? defaultAccount : state.selectedAccount,
        allBrowserAccounts: newAccounts,
      };
    }
    default:
      return state;
  }
};
