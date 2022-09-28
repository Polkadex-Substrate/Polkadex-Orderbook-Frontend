import { keyring } from "@polkadot/ui-keyring";

import { InjectedAccount, TradeAccountsAction } from "./actions";
import {
  REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  RESET_CURRENT_TRADE_ACCOUNT,
  SET_CURRENT_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_RESET,
  USER_TRADE_ACCOUNT_UNLOCK,
  USER_TRADE_ACCOUNTS_DATA,
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
} from "./constants";

export interface TradeAccountsState {
  success?: boolean;
  isFetching: boolean;
  allBrowserAccounts: InjectedAccount[];
  selectedAccount: InjectedAccount;
  registerAccountLoading: boolean;
  registerAccountSuccess: boolean;
  mainAddress: string;
  removesInLoading: Array<string>;
}

export const defaultAccount: InjectedAccount = {
  address: "",
  meta: {},
  type: "",
  isPasswordProtected: false,
};
const initialState: TradeAccountsState = {
  isFetching: false,
  success: false,
  allBrowserAccounts: [],
  selectedAccount: defaultAccount,
  registerAccountLoading: false,
  registerAccountSuccess: false,
  removesInLoading: [],
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
      keyring.forgetAccount(address);
      return {
        ...state,
        selectedAccount:
          state.selectedAccount.address === address ? defaultAccount : state.selectedAccount,
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
        const keyringPair = keyring.getPair(address);
        keyringPair.unlock(password.toString());
        const account = _allAccounts.find((acc) => acc.address === address);
        account.isPasswordProtected = false;
        const accounts = _allAccounts.filter((acc) => acc.address !== address);
        accounts.push(account);
        if (state.selectedAccount.address === address) {
          return {
            ...state,
            allBrowserAccounts: accounts,
            selectedAccount: {
              ...state.selectedAccount,
              isPasswordProtected: false,
            },
          };
        } else {
          return {
            ...state,
            allBrowserAccounts: accounts,
          };
        }
      } catch (e) {
        console.log("password error", e);
        alert("invalid password");
        return state;
      }
    }
    default:
      return state;
  }
};
