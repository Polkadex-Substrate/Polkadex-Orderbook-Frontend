import { CommonError } from "../../types";

import {
  USER_TRADE_ACCOUNTS_ERROR,
  USER_TRADE_ACCOUNTS_FETCH,
  USER_TRADE_ACCOUNTS_DATA,
  SET_CURRENT_TRADE_ACCOUNT,
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

export type TradeAccountsAction =
  | TradeAccountsFetch
  | TradeAccountsError
  | TradeAccountsData
  | SetCurrentTradeAccount;

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
