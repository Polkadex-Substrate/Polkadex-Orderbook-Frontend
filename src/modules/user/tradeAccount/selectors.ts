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

export const selectCurrentTradeAccount = (state: RootState): InjectedAccount =>
  state.user.polkadotWallet.selectedAccount;

export const selectCurrentTradeAccountIsPassword = (state: RootState): boolean =>
  state.user.polkadotWallet.selectedAccount.isPassworded;

export const selectHasCurrentTradeAccount = (state: RootState): boolean =>
  state.user.polkadotWallet.selectedAccount.address !== "";

export const selectLinkedMainAddress = (state: RootState): string => {
  return state.user.polkadotWallet.mainAddress;
};

export const selectRegisterTradeAccountLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.registerAccountLoading;
