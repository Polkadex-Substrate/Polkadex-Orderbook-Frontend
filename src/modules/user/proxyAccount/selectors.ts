import { RootState } from "../..";

import { InjectedAccount } from ".";

export const selectPolkadotWalletLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.isFetching;

export const selectPolkadotWalletSuccess = (state: RootState): boolean =>
  state.user.polkadotWallet.success;

export const selectPolkadotWalletAccounts = (state: RootState): InjectedAccount[] =>
  state.user.polkadotWallet.allAccounts;

export const selectProxyAccount = (state: RootState): InjectedAccount =>
  state.user.polkadotWallet.selectedAccount;
