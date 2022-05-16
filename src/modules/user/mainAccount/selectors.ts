import { RootState } from "../..";
import { InjectedAccount } from "../proxyAccount";

import { MainAccount } from "./actions";

export const selectExtensionWalletLoading = (state: RootState): boolean =>
  state.user.extensionWallet.isFetching;

export const selectExtensionWalletSuccess = (state: RootState): boolean =>
  state.user.extensionWallet.success;

export const selectExtensionWalletAccounts = (state: RootState): InjectedAccount[] =>
  state.user.extensionWallet.allAccounts;

export const selectMainAccount = (state: RootState): MainAccount =>
  state.user.extensionWallet.selectedAccount;
