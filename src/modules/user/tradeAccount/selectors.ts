import { RootState } from "../..";

import { InjectedAccount } from ".";

export const selectTradeAccountsLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.isFetching;

export const selectTradeAccountsSuccess = (state: RootState): boolean =>
  state.user.polkadotWallet.success;

export const selectAllTradeAccounts = (state: RootState): string[] =>
  state.user.polkadotWallet.allAccounts;

export const selectBrowserTradeAccounts = (state: RootState): InjectedAccount[] =>
  state.user.polkadotWallet.allBrowserAccounts;

export const selectHasBrowserTradeAccounts = (state: RootState): boolean =>
  !!state.user.polkadotWallet?.allBrowserAccounts?.map((acc) => ({
    id: acc.address,
    address: acc.address,
    name: acc.meta.name,
    isActive: acc.address === state.user.polkadotWallet?.selectedAccount?.address,
  })).length;

export const selectCurrentTradeAccount = (state: RootState): InjectedAccount =>
  state.user.polkadotWallet.selectedAccount;

export const selectHasUser = (state: RootState): boolean =>
  state.user.polkadotWallet.selectedAccount.address !== "";
