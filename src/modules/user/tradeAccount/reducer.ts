import { TradeAccountsAction, InjectedAccount } from "./actions";
import {
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNTS_DATA,
  SET_CURRENT_TRADE_ACCOUNT,
} from "./constants";

export interface PolkadotWalletState {
  success?: boolean;
  isFetching: boolean;
  allAccounts: string[];
  allBrowserAccounts: InjectedAccount[];
  selectedAccount: InjectedAccount;
}
export const defaultAccount: InjectedAccount = {
  address: "",
  meta: {},
  type: "",
};
const initialState: PolkadotWalletState = {
  isFetching: false,
  success: false,
  allAccounts: [],
  allBrowserAccounts: [],
  selectedAccount: defaultAccount,
};

export const TradeAccountsReducer = (
  state = initialState,
  action: TradeAccountsAction
): PolkadotWalletState => {
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
    case SET_CURRENT_TRADE_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.payload,
      };

    default:
      return state;
  }
};
