import { ApiPromise } from "@polkadot/api";

import { RootState } from "../..";

import { InjectedAccount } from ".";

export const selectIsKeyringLoaded = (state: RootState): ApiPromise | boolean =>
  state.user.polkadotWallet.isKeyringLoaded;

export const selectPolkadotWalletLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.loading;

export const selectPolkadotWalletAccounts = (state: RootState): InjectedAccount[] =>
  state.user.polkadotWallet.allAccounts;

export const selectMainAccount = (state: RootState): InjectedAccount =>
  state.user.polkadotWallet.selectedAccount;
