import { CommonError } from "../../types";
import { InjectedAccount } from "../tradeAccount";

import {
  POLKADOT_EXTENSION_WALLET_FETCH,
  POLKADOT_EXTENSION_WALLET_ERROR,
  POLKADOT_EXTENSION_WALLET_DATA,
  MAIN_ACCOUNT_SET_FETCH,
  EXTENSION_WALLET_RESET,
  MAIN_ACCOUNT_SET_DATA,
  MAIN_ACCOUNT_SET_ERROR,
  REGISTER_MAIN_ACCOUNT_FETCH,
  REGISTER_MAIN_ACCOUNT_DATA,
  REGISTER_MAIN_ACCOUNT_ERROR,
  REGISTER_MAIN_ACCOUNT_UPDATE_DATA,
  REGISTER_MAIN_ACCOUNT_UPDATE_FETCH,
  SET_ASSOCIATED_ACCOUNTS_FETCH,
  SET_ASSOCIATED_ACCOUNTS_DATA,
  SET_ASSOCIATED_ACCOUNTS_ERROR,
} from "./constants";

export interface MainAccount {
  account: any;
  address: string;
  injector?: any;
  name: string;
}
export interface ExtensionWalletFetchPayload {
  allAccounts: InjectedAccount[];
}

export interface ExtensionWalletFetch {
  type: typeof POLKADOT_EXTENSION_WALLET_FETCH;
}

export interface ExtensionWalletError {
  type: typeof POLKADOT_EXTENSION_WALLET_ERROR;
  error: CommonError;
}

export interface ExtensionWalletData {
  type: typeof POLKADOT_EXTENSION_WALLET_DATA;
  payload: ExtensionWalletFetchPayload;
}
export interface SetMainAccountFetch {
  type: typeof MAIN_ACCOUNT_SET_FETCH;
  payload: InjectedAccount;
}
export interface SetMainAccountData {
  type: typeof MAIN_ACCOUNT_SET_DATA;
  payload: {
    user: MainAccount;
  };
}
export interface SetMainAccountError {
  type: typeof MAIN_ACCOUNT_SET_ERROR;
  error: CommonError;
}
export interface SetAssociatedAccountsFetch {
  type: typeof SET_ASSOCIATED_ACCOUNTS_FETCH;
}
export interface SetAssociatedAccountsData {
  type: typeof SET_ASSOCIATED_ACCOUNTS_DATA;
  payload: string[];
}
export interface SetAssociatedAccountsError {
  type: typeof SET_ASSOCIATED_ACCOUNTS_ERROR;
  payload: CommonError;
}
export interface ResetExtensionWallet {
  type: typeof EXTENSION_WALLET_RESET;
}

export interface RegisterMainAccountFetch {
  type: typeof REGISTER_MAIN_ACCOUNT_FETCH;
  payload: { mainAccount: MainAccount; tradeAddress: string };
}

export interface RegisterMainAccountData {
  type: typeof REGISTER_MAIN_ACCOUNT_DATA;
}

export interface RegisterMainAccountError {
  type: typeof REGISTER_MAIN_ACCOUNT_ERROR;
}

export interface RegisterMainAccountUpdateEvent {
  type: typeof REGISTER_MAIN_ACCOUNT_UPDATE_FETCH;
  payload: any;
}

export interface RegisterMainAccountUpdateData {
  type: typeof REGISTER_MAIN_ACCOUNT_UPDATE_DATA;
  payload: any;
}

export type GetExtensionWalletAction =
  | ExtensionWalletFetch
  | ExtensionWalletError
  | ExtensionWalletData
  | SetMainAccountFetch
  | SetMainAccountData
  | ResetExtensionWallet
  | RegisterMainAccountFetch
  | RegisterMainAccountData
  | RegisterMainAccountError
  | RegisterMainAccountUpdateEvent
  | RegisterMainAccountUpdateData
  | SetAssociatedAccountsFetch
  | SetAssociatedAccountsData
  | SetAssociatedAccountsError;

export const extensionWalletData = (
  payload: ExtensionWalletFetchPayload
): ExtensionWalletData => ({
  type: POLKADOT_EXTENSION_WALLET_DATA,
  payload,
});

export const extensionWalletError = (error: CommonError): ExtensionWalletError => ({
  type: POLKADOT_EXTENSION_WALLET_ERROR,
  error,
});

export const extensionWalletFetch = (): ExtensionWalletFetch => ({
  type: POLKADOT_EXTENSION_WALLET_FETCH,
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

export const setAssociatedAccountsFetch = () => ({
  type: SET_ASSOCIATED_ACCOUNTS_FETCH,
});

export const setAssociatedAccountsData = (payload: SetAssociatedAccountsData["payload"]) => ({
  type: SET_ASSOCIATED_ACCOUNTS_DATA,
  payload,
});

export const SetAssociatedAccountsError = (
  payload: SetAssociatedAccountsError["payload"]
) => ({
  type: SET_ASSOCIATED_ACCOUNTS_ERROR,
  payload,
});

export const resetExtensionWallet = () => ({
  type: EXTENSION_WALLET_RESET,
});

export const registerMainAccountFetch = (payload: RegisterMainAccountFetch["payload"]) => ({
  type: REGISTER_MAIN_ACCOUNT_FETCH,
  payload,
});

export const registerMainAccountData = (): RegisterMainAccountData => ({
  type: REGISTER_MAIN_ACCOUNT_DATA,
});

export const registerMainAccountError = (): RegisterMainAccountError => ({
  type: REGISTER_MAIN_ACCOUNT_ERROR,
});

export const registerMainAccountUpdateEvent = (
  payload: RegisterMainAccountUpdateEvent["payload"]
) => ({
  type: REGISTER_MAIN_ACCOUNT_UPDATE_FETCH,
  payload,
});

export const registerMainAccountUpdateData = (
  payload: RegisterMainAccountUpdateData["payload"]
) => ({
  type: REGISTER_MAIN_ACCOUNT_UPDATE_DATA,
  payload,
});
