import { InjectedAccount } from "../polkadotWallet";

import { GetExtensionWalletAction } from "./actions";
import {
  EXTENSION_WALLET_FETCH,
  EXTENSION_WALLET_ERROR,
  EXTENSION_WALLET_DATA,
  EXTENSION_WALLET_SET,
  EXTENSION_WALLET_RESET,
} from "./constants";

export interface ExtensionWalletState {
  success?: boolean;
  isFetching: boolean;
  allAccounts: InjectedAccount[];
  selectedAccount: InjectedAccount;
}

const defaultAccount: InjectedAccount = {
  address: "",
  meta: {},
  type: "",
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
    case EXTENSION_WALLET_SET:
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
