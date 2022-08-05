import { CommonError } from "../../types";
import { InjectedAccount } from "../tradeAccount";

import {
  EXTENSION_WALLET_FETCH,
  EXTENSION_WALLET_ERROR,
  EXTENSION_WALLET_DATA,
  MAIN_ACCOUNT_SET_FETCH,
  EXTENSION_WALLET_RESET,
  MAIN_ACCOUNT_SET_DATA,
  MAIN_ACCOUNT_SET_ERROR,
} from "./constants";

export interface MainAccount {
  account: any;
  address: string;
  injector: any;
  name: string;
}
export interface ExtensionWalletFetchPayload {
  allAccounts: InjectedAccount[];
}

export interface ExtensionWalletFetch {
  type: typeof EXTENSION_WALLET_FETCH;
}

export interface ExtensionWalletError {
  type: typeof EXTENSION_WALLET_ERROR;
  error: CommonError;
}

export interface ExtensionWalletData {
  type: typeof EXTENSION_WALLET_DATA;
  payload: ExtensionWalletFetchPayload;
}
export interface SetMainAccountFetch {
  type: typeof MAIN_ACCOUNT_SET_FETCH;
  payload: InjectedAccount;
}

export interface SetMainAccountData {
  type: typeof MAIN_ACCOUNT_SET_DATA;
  payload: MainAccount;
}
export interface SetMainAccountError {
  type: typeof MAIN_ACCOUNT_SET_ERROR;
  error: CommonError;
}
export interface ResetExtensionWallet {
  type: typeof EXTENSION_WALLET_RESET;
}

export type GetExtensionWalletAction =
  | ExtensionWalletFetch
  | ExtensionWalletError
  | ExtensionWalletData
  | SetMainAccountFetch
  | SetMainAccountData
  | ResetExtensionWallet;

export const extensionWalletData = (
  payload: ExtensionWalletFetchPayload
): ExtensionWalletData => ({
  type: EXTENSION_WALLET_DATA,
  payload,
});

export const extensionWalletError = (error: CommonError): ExtensionWalletError => ({
  type: EXTENSION_WALLET_ERROR,
  error,
});

export const extensionWalletFetch = (): ExtensionWalletFetch => ({
  type: EXTENSION_WALLET_FETCH,
});

export const setMainAccountFetch = (
  payload: SetMainAccountFetch["payload"]
): SetMainAccountFetch => ({
  type: MAIN_ACCOUNT_SET_FETCH,
  payload,
});

export const setMainAccountData = (payload: SetMainAccountData["payload"]) => ({
  type: MAIN_ACCOUNT_SET_DATA,
  payload,
});

export const setMainAccountError = (error: CommonError): SetMainAccountError => ({
  type: MAIN_ACCOUNT_SET_ERROR,
  error,
});

export const resetExtensionWallet = () => ({
  type: EXTENSION_WALLET_RESET,
});
