import { CommonError } from "../../types";
import { InjectedAccount } from "../polkadotWallet";

import {
  EXTENSION_WALLET_FETCH,
  EXTENSION_WALLET_ERROR,
  EXTENSION_WALLET_DATA,
  EXTENSION_WALLET_SET,
  EXTENSION_WALLET_RESET,
} from "./constants";

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
export interface ExtensionWalletSetAccount {
  type: typeof EXTENSION_WALLET_SET;
  payload: InjectedAccount;
}

export interface ResetExtensionWallet {
  type: typeof EXTENSION_WALLET_RESET;
}

export type GetExtensionWalletAction =
  | ExtensionWalletFetch
  | ExtensionWalletError
  | ExtensionWalletData
  | ExtensionWalletSetAccount
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

export const setMainExtensionAccount = (
  payload: ExtensionWalletSetAccount["payload"]
): ExtensionWalletSetAccount => ({
  type: EXTENSION_WALLET_SET,
  payload,
});

export const resetExtensionWallet = () => ({
  type: EXTENSION_WALLET_RESET,
});
