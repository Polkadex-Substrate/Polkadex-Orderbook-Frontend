import { InjectedAccount } from "../proxyAccount";

import { GetExtensionWalletAction, MainAccount } from "./actions";
import {
  EXTENSION_WALLET_FETCH,
  EXTENSION_WALLET_ERROR,
  EXTENSION_WALLET_DATA,
  MAIN_ACCOUNT_SET_FETCH,
  EXTENSION_WALLET_RESET,
  MAIN_ACCOUNT_SET_DATA,
} from "./constants";

export interface ExtensionWalletState {
  success?: boolean;
  isFetching: boolean;
  allAccounts: InjectedAccount[];
  selectedAccount: MainAccount;
}

const defaultAccount: MainAccount = {
  address: "",
  account: null,
  injector: null,
  name: "",
};

const initialState: ExtensionWalletState = {
  isFetching: false,
  success: false,
  allAccounts: [],
  selectedAccount: defaultAccount,
};

export const extensionWalletReducer = (
  state = initialState,
  action: GetExtensionWalletAction
): ExtensionWalletState => {
  switch (action.type) {
    case EXTENSION_WALLET_DATA:
      return {
        ...state,
        isFetching: false,
        success: true,
        allAccounts: action.payload.allAccounts,
      };
    case EXTENSION_WALLET_ERROR:
      return {
        ...state,
        isFetching: false,
        success: false,
      };
    case EXTENSION_WALLET_FETCH:
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
    default:
      return state;
  }
};
