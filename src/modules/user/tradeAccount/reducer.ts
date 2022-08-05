import { TradeAccountsAction, InjectedAccount } from "./actions";
import {
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNTS_DATA,
  SET_CURRENT_TRADE_ACCOUNT,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
  REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
} from "./constants";

export interface TradeAccountsState {
  success?: boolean;
  isFetching: boolean;
  allAccounts: string[];
  allBrowserAccounts: InjectedAccount[];
  selectedAccount: InjectedAccount;
  registerAccountLoading: boolean;
  registerAccountSuccess: boolean;
}
export const defaultAccount: InjectedAccount = {
  address: "",
  meta: {},
  type: "",
};
const initialState: TradeAccountsState = {
  isFetching: false,
  success: false,
  allAccounts: [],
  allBrowserAccounts: [],
  selectedAccount: defaultAccount,
  registerAccountLoading: false,
  registerAccountSuccess: false,
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
    case SET_CURRENT_TRADE_ACCOUNT:
      return {
        ...state,
        selectedAccount: action.payload,
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
      return {
        ...state,
        allBrowserAccounts: newAccounts,
      };
    }
    default:
      return state;
  }
};
