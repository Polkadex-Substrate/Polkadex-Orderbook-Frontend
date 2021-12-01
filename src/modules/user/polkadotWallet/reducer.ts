import { ApiPromise } from "@polkadot/api";

import { GetPolkadotWalletAction, InjectedAccount } from "./actions";
import {
  GET_POLKADOT_WALLET_FETCH,
  GET_POLKADOT_WALLET_FETCH_ERROR,
  GET_POLKADOT_WALLET_DATA,
  SET_POLKADOT_WALLET_ACCOUNT,
  RESET_WALLET_ACCOUNT,
} from "./constants";

export interface PolkadotWalletState {
  loading: boolean;
  getApiSuccess: boolean;
  allAccounts: InjectedAccount[];
  selectedAccount: InjectedAccount;
  isKeyringLoaded: boolean;
}
export const defaultAccount: InjectedAccount = {
  address: "",
  meta: {},
  type: "",
};
const initialState: PolkadotWalletState = {
  loading: false,
  getApiSuccess: false,
  isKeyringLoaded: false,
  allAccounts: [],
  selectedAccount: defaultAccount,
};

export const polkadotWalletReducer = (
  state = initialState,
  action: GetPolkadotWalletAction
): PolkadotWalletState => {
  switch (action.type) {
    case GET_POLKADOT_WALLET_DATA:
      return {
        ...state,
        loading: false,
        isKeyringLoaded: true,
        allAccounts: action.payload.allAccounts,
      };
    case GET_POLKADOT_WALLET_FETCH_ERROR:
      return {
        ...state,
        loading: false,
        getApiSuccess: false,
      };
    case GET_POLKADOT_WALLET_FETCH:
      return {
        ...state,
        loading: true,
      };
    case SET_POLKADOT_WALLET_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.payload,
      };
    case RESET_WALLET_ACCOUNT:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
