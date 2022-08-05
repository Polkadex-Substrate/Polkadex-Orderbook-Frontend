import { InjectedAccount } from "../tradeAccount";

import { GetExtensionWalletAction, MainAccount } from "./actions";
import {
  POLKADOT_EXTENSION_WALLET_FETCH,
  POLKADOT_EXTENSION_WALLET_ERROR,
  POLKADOT_EXTENSION_WALLET_DATA,
  MAIN_ACCOUNT_SET_FETCH,
  EXTENSION_WALLET_RESET,
  MAIN_ACCOUNT_SET_DATA,
  REGISTER_MAIN_ACCOUNT_FETCH,
} from "./constants";

export interface MainAccountState {
  success?: boolean;
  isFetching: boolean;
  allBrowserAccounts: InjectedAccount[];
  allAccounts: string[];
  selectedAccount: MainAccount;
  registerMainAccountLoading: boolean;
  registerMainAccountSuccess: boolean;
}

const defaultAccount: MainAccount = {
  address: "",
  account: null,
  injector: null,
  name: "",
};

const initialState: MainAccountState = {
  isFetching: false,
  success: false,
  allBrowserAccounts: [],
  allAccounts: [],
  selectedAccount: defaultAccount,
  registerMainAccountLoading: false,
  registerMainAccountSuccess: false,
};

export const mainAccountReducer = (
  state = initialState,
  action: GetExtensionWalletAction
): MainAccountState => {
  switch (action.type) {
    case POLKADOT_EXTENSION_WALLET_DATA:
      return {
        ...state,
        isFetching: false,
        success: true,
        allBrowserAccounts: action.payload.allAccounts,
      };
    case POLKADOT_EXTENSION_WALLET_ERROR:
      return {
        ...state,
        isFetching: false,
        success: false,
      };
    case POLKADOT_EXTENSION_WALLET_FETCH:
      return {
        ...state,
        success: false,
        isFetching: true,
      };
    case MAIN_ACCOUNT_SET_DATA:
      return {
        ...state,
        selectedAccount: action.payload,
      };
    case EXTENSION_WALLET_RESET:
      return {
        ...initialState,
      };
    case REGISTER_MAIN_ACCOUNT_FETCH:
      return {
        ...state,
        registerMainAccountLoading: true,
        registerMainAccountSuccess: false,
      };
    case MAIN_ACCOUNT_SET_FETCH:
      return {
        ...state,
        registerMainAccountLoading: false,
        registerMainAccountSuccess: false,
      };

    default:
      return state;
  }
};
