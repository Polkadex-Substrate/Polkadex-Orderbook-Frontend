import { CommonError } from "../../types";

import {
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNTS_DATA,
  SET_CURRENT_TRADE_ACCOUNT,
  USER_REGISTER_TRADE_ACCOUNT_FETCH,
  USER_REGISTER_TRADE_ACCOUNT_DATA,
  USER_REGISTER_TRADE_ACCOUNT_ERROR,
  REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  SET_CURRENT_TRADE_ACCOUNT_DATA,
  RESET_CURRENT_TRADE_ACCOUNT,
  USER_REGISTER_TRADE_ACCOUNT_RESET,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
} from "./constants";

export interface InjectedAccount {
  address: string;
  isPassworded: boolean;
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

export interface SetCurrentTradeAccountData {
  type: typeof SET_CURRENT_TRADE_ACCOUNT_DATA;
  payload: { tradeAccount: InjectedAccount; mainAddress?: string };
}
export interface RegisterTradeAccountFetch {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_FETCH;
  payload: {
    mnemonic: string;
    password?: string;
    name?: string;
  };
}
export interface ResetCurrentTradeAccount {
  type: typeof RESET_CURRENT_TRADE_ACCOUNT;
}
export interface RegisterTradeAccountData {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_DATA;
}

export interface RegisterTradeAccountError {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_ERROR;
  error: CommonError;
}
export interface RegisterTradeAccountReset {
  type: typeof USER_REGISTER_TRADE_ACCOUNT_RESET;
}
export interface RemoveTradeAccountFromBrowser {
  type: typeof REMOVE_TRADE_ACCOUNT_FROM_BROWSER;
  payload: { address: string };
}

export interface RemoveProxyAccountFromChainFetch {
  type: typeof USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH;
  payload: { address: string };
}

export interface RemoveProxyAccountFromChainData {
  type: typeof USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA;
}

export type TradeAccountsAction =
  | TradeAccountsFetch
  | TradeAccountsError
  | TradeAccountsData
  | SetCurrentTradeAccountData
  | RegisterTradeAccountFetch
  | RegisterTradeAccountData
  | RegisterTradeAccountError
  | RemoveTradeAccountFromBrowser
  | ResetCurrentTradeAccount
  | RegisterTradeAccountReset
  | RemoveProxyAccountFromChainFetch
  | RemoveProxyAccountFromChainData;

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

export const setCurrentTradeAccount = (
  payload: SetCurrentTradeAccount["payload"]
): SetCurrentTradeAccount => ({
  type: SET_CURRENT_TRADE_ACCOUNT,
  payload,
});

export const setCurrentTradeAccountData = (
  payload: SetCurrentTradeAccountData["payload"]
): SetCurrentTradeAccountData => ({
  type: SET_CURRENT_TRADE_ACCOUNT_DATA,
  payload,
});

export const resetCurrentTradeAccount = (): ResetCurrentTradeAccount => ({
  type: RESET_CURRENT_TRADE_ACCOUNT,
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

export const registerTradeAccountReset = (): RegisterTradeAccountReset => ({
  type: USER_REGISTER_TRADE_ACCOUNT_RESET,
});

export const registerTradeAccountError = (error: CommonError): RegisterTradeAccountError => ({
  type: USER_REGISTER_TRADE_ACCOUNT_ERROR,
  error,
});

export const removeTradeAccountFromBrowser = (
  payload: RemoveTradeAccountFromBrowser["payload"]
): RemoveTradeAccountFromBrowser => ({
  type: REMOVE_TRADE_ACCOUNT_FROM_BROWSER,
  payload,
});

export const removeProxyAccountFromChainFetch = (
  payload: RemoveProxyAccountFromChainFetch["payload"]
): RemoveProxyAccountFromChainFetch => ({
  type: USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_FETCH,
  payload,
});

export const removeProxyAccountFromChainData = (): RemoveProxyAccountFromChainData => ({
  type: USER_TRADE_ACCOUNT_REMOVE_FROM_CHAIN_DATA,
});
