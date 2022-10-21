import { GetExtensionWalletAction } from "./actions";
import {
  REGISTER_MAIN_ACCOUNT_RESET,
  POLKADOT_EXTENSION_WALLET_DATA,
  POLKADOT_EXTENSION_WALLET_ERROR,
  POLKADOT_EXTENSION_WALLET_FETCH,
  REGISTER_MAIN_ACCOUNT_DATA,
  REGISTER_MAIN_ACCOUNT_ERROR,
  REGISTER_MAIN_ACCOUNT_FETCH,
} from "./constants";

import { ExtensionAccount } from "@polkadex/orderbook/modules/types";

export interface MainAccountState {
  success?: boolean;
  isFetching: boolean;
  allAccounts: ExtensionAccount[];
  registerMainAccountLoading: boolean;
  registerMainAccountSuccess: boolean;
}

const initialState: MainAccountState = {
  isFetching: false,
  success: false,
  allAccounts: [],
  registerMainAccountLoading: false,
  registerMainAccountSuccess: false,
};

export const extensionWalletReducer = (
  state = initialState,
  action: GetExtensionWalletAction
): MainAccountState => {
  switch (action.type) {
    case POLKADOT_EXTENSION_WALLET_DATA:
      return {
        ...state,
        isFetching: false,
        success: true,
        allAccounts: action.payload.allAccounts,
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
    case REGISTER_MAIN_ACCOUNT_RESET:
      return {
        ...state,
        registerMainAccountLoading: false,
        registerMainAccountSuccess: false,
      };
    case REGISTER_MAIN_ACCOUNT_FETCH:
      return {
        ...state,
        registerMainAccountLoading: true,
        registerMainAccountSuccess: false,
      };
    case REGISTER_MAIN_ACCOUNT_DATA:
      return {
        ...state,
        registerMainAccountLoading: false,
        registerMainAccountSuccess: true,
      };
    case REGISTER_MAIN_ACCOUNT_ERROR:
      return {
        ...state,
        registerMainAccountLoading: false,
        registerMainAccountSuccess: false,
      };
    default:
      return state;
  }
};
