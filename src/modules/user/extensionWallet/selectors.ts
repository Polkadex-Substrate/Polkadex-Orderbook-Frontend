import { RootState } from "../..";
import { InjectedAccount } from "../polkadotWallet";

export const selectExtensionWalletLoading = (state: RootState): boolean =>
  state.user.extensionWallet.isFetching;

export const selectExtensionWalletSuccess = (state: RootState): boolean =>
  state.user.extensionWallet.success;

export const selectExtensionWalletAccounts = (state: RootState): InjectedAccount[] =>
  state.user.extensionWallet.allAccounts;

export const selectMainExtensionAccount = (state: RootState): InjectedAccount =>
  state.user.extensionWallet.selectedAccount;
