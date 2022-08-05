import { CommonError } from "../../types";

import {
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNTS_DATA,
  SET_CURRENT_TRADE_ACCOUNT,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
} from "./constants";

export interface InjectedAccount {
  address: string;
  meta: {
    name?: string;
    source?: any;
  };
  type: any;
}
export interface PolkadotWalletFetchPayload {
  allAccounts: InjectedAccount[];
}

export interface TradeAccountsFetch {
  type: typeof USER_TRADE_ACCOUNTS_FETCH;
}
export interface TradeAccountsData {
  type: typeof USER_TRADE_ACCOUNTS_DATA;
  payload: PolkadotWalletFetchPayload;
}

export interface TradeAccountsError {
  type: typeof USER_TRADE_ACCOUNTS_ERROR;
  error: CommonError;
}

export interface SetCurrentTradeAccount {
  type: typeof SET_CURRENT_TRADE_ACCOUNT;
  payload: InjectedAccount;
}

export interface RegisterTradeAccountFetch {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_FETCH;
  payload: {
    mnemonic: string;
    password?: string;
    name?: string;
  };
}

export interface RegisterTradeAccountData {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_DATA;
}

export interface RegisterTradeAccountError {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_ERROR;
  error: CommonError;
}

export type TradeAccountsAction =
  | TradeAccountsFetch
  | TradeAccountsError
  | TradeAccountsData
  | SetCurrentTradeAccount
  | RegisterTradeAccountFetch
  | RegisterTradeAccountData
  | RegisterTradeAccountError;

export const tradeAccountsFetch = (): TradeAccountsFetch => ({
  type: USER_TRADE_ACCOUNTS_FETCH,
});

export const tradeAccountsData = (payload: PolkadotWalletFetchPayload): TradeAccountsData => ({
  type: USER_TRADE_ACCOUNTS_DATA,
  payload,
});

export const tradeAccountsError = (error: CommonError): TradeAccountsError => ({
  type: USER_TRADE_ACCOUNTS_ERROR,
  error,
});

export const SetCurrentTradeAccount = (
  payload: SetCurrentTradeAccount["payload"]
): SetCurrentTradeAccount => ({
  type: SET_CURRENT_TRADE_ACCOUNT,
  payload,
});

export const registerTradeAccountFetch = (
  payload: RegisterTradeAccountFetch["payload"]
): RegisterTradeAccountFetch => ({
  type: USER_REGISTER_TRADE_ACCOUNT_FETCH,
  payload,
});

export const registerTradeAccountData = (): RegisterTradeAccountData => ({
  type: USER_REGISTER_TRADE_ACCOUNT_DATA,
});

export const registerTradeAccountError = (error: CommonError): RegisterTradeAccountError => ({
  type: USER_REGISTER_TRADE_ACCOUNT_ERROR,
  error,
});
