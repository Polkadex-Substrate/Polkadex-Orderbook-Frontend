import { RootState } from "../..";
import { InjectedAccount, selectLinkedMainAddress } from "../tradeAccount";

import { MainAccount } from "./actions";

export const selectExtensionWalletLoading = (state: RootState): boolean =>
  state.user.extensionWallet.isFetching;

export const selectExtensionWalletSuccess = (state: RootState): boolean =>
  state.user.extensionWallet.success;

export const selectExtensionWalletAccounts = (state: RootState): InjectedAccount[] =>
  state.user.extensionWallet.allBrowserAccounts;

export const selectCurrentMainAccount = (state: RootState): MainAccount =>
  state.user.extensionWallet.selectedAccount;

export const selectIsCurrentAccountRegistered = (state: RootState): boolean =>
  state.user.extensionWallet?.associatedTradeAccounts?.length > 0;

export const selectAssociatedTradeAccounts = (state: RootState): string[] =>
  state.user.extensionWallet?.associatedTradeAccounts;

export const selectAssociatedTradeAccountsLoading = (state: RootState): boolean =>
  state.user.extensionWallet?.associatedAccountsLoading;

export const selectIsCurrentMainAccountInWallet = (state: RootState): boolean => {
  return selectCurrentMainAccount(state).injector !== null;
};
export const selectLinkedMainAccount = (state: RootState): InjectedAccount | undefined => {
  const currUserMainAddress = selectLinkedMainAddress(state);
  const linkedAccount = selectExtensionWalletAccounts(state).find(
    (account) => account.address === currUserMainAddress
  );
  return linkedAccount;
};

export const selectIsRegisterMainAccountLoading = (state: RootState): boolean =>
  state.user.extensionWallet.registerMainAccountLoading;

export const selectIsRegisterMainAccountSuccess = (state: RootState): boolean =>
  state.user.extensionWallet.registerMainAccountSuccess;

export const selectIsSetMainAccountLoading = (state: RootState): boolean =>
  state.user.extensionWallet.setMainAccountLoading;
