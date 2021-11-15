import { ApiPromise } from "@polkadot/api";

import { RootState } from "../..";

import { InjectedAccount } from ".";

export const selectPolkadotWalletApi = (state: RootState): ApiPromise | undefined =>
  state.user.polkadotWallet.api;

export const selectPolkadotWalletLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.loading;

export const selectPolkadotWalletAccounts = (state: RootState): InjectedAccount[] =>
  state.user.polkadotWallet.allAccounts;

export const selectMainAccount = (state: RootState): InjectedAccount =>
  state.user.polkadotWallet.selectedAccount;
