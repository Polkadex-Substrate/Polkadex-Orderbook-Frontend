import { GetPolkadotWalletAction, InjectedAccount } from "./actions";
import {
  POLKADOT_WALLET_FETCH,
  POLKADOT_WALLET_ERROR,
  POLKADOT_WALLET_DATA,
  POLKADOT_WALLET_SET,
  POLKADOT_WALLET_RESET,
} from "./constants";

export interface PolkadotWalletState {
  success?: boolean;
  isFetching: boolean;
  getApiSuccess: boolean;
  allAccounts: InjectedAccount[];
  selectedAccount: InjectedAccount;
}
export const defaultAccount: InjectedAccount = {
  address: "",
  meta: {},
  type: "",
};
const initialState: PolkadotWalletState = {
  isFetching: false,
  getApiSuccess: false,
  allAccounts: [],
  selectedAccount: defaultAccount,
};

export const polkadotWalletReducer = (
  state = initialState,
  action: GetPolkadotWalletAction
): PolkadotWalletState => {
  switch (action.type) {
    case POLKADOT_WALLET_DATA:
      return {
        ...state,
        isFetching: false,
        success: true,
        allAccounts: action.payload.allAccounts,
      };
    case POLKADOT_WALLET_ERROR:
      return {
        ...state,
        isFetching: false,
        getApiSuccess: false,
      };
    case POLKADOT_WALLET_FETCH:
      return {
        ...state,
        success: false,
        isFetching: true,
      };
    case POLKADOT_WALLET_SET:
      return {
        ...state,
        selectedAccount: action.payload,
      };
    case POLKADOT_WALLET_RESET:
      return {
        ...initialState,
      };
    default:
      return state;
  }
};
