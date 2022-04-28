import { CommonError } from "../../types";

import {
  POLKADOT_WALLET_FETCH,
  POLKADOT_WALLET_ERROR,
  POLKADOT_WALLET_DATA,
  POLKADOT_WALLET_SET,
  POLKADOT_WALLET_RESET,
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

export interface PolkadotWalletFetch {
  type: typeof POLKADOT_WALLET_FETCH;
}

export interface PolkadotWalletError {
  type: typeof POLKADOT_WALLET_ERROR;
  error: CommonError;
}

export interface PolkadotWalletData {
  type: typeof POLKADOT_WALLET_DATA;
  payload: PolkadotWalletFetchPayload;
}
export interface PolkadotWalletSetAccount {
  type: typeof POLKADOT_WALLET_SET;
  payload: InjectedAccount;
}

export interface ResetPolkadotWallet {
  type: typeof POLKADOT_WALLET_RESET;
}

export type GetPolkadotWalletAction =
  | PolkadotWalletFetch
  | PolkadotWalletError
  | PolkadotWalletData
  | PolkadotWalletSetAccount
  | ResetPolkadotWallet;

export const polkadotWalletData = (
  payload: PolkadotWalletFetchPayload
): PolkadotWalletData => ({
  type: POLKADOT_WALLET_DATA,
  payload,
});

export const polkadotWalletError = (error: CommonError): PolkadotWalletError => ({
  type: POLKADOT_WALLET_ERROR,
  error,
});

export const polkadotWalletFetch = (): PolkadotWalletFetch => ({
  type: POLKADOT_WALLET_FETCH,
});

export const setProxyAccount = (
  payload: PolkadotWalletSetAccount["payload"]
): PolkadotWalletSetAccount => ({
  type: POLKADOT_WALLET_SET,
  payload,
});

export const resetPolkadotWallet = () => ({
  type: POLKADOT_WALLET_RESET,
});
