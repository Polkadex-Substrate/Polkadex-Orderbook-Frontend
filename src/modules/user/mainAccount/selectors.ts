import { RootState, selectUserInfo } from "../..";
import { InjectedAccount } from "../tradeAccount";

import { MainAccount } from "./actions";

export const selectExtensionWalletLoading = (state: RootState): boolean =>
  state.user.extensionWallet.isFetching;

export const selectExtensionWalletSuccess = (state: RootState): boolean =>
  state.user.extensionWallet.success;

export const selectExtensionWalletAccounts = (state: RootState): InjectedAccount[] =>
  state.user.extensionWallet.allBrowserAccounts;

export const selectCurrentMainAccount = (state: RootState): MainAccount =>
  state.user.extensionWallet.selectedAccount;

export const selectIsCurrentMainAccountInWallet = (state: RootState): boolean => {
  return selectCurrentMainAccount(state).injector !== null;
};
export const selectLinkedMainAccount = (state: RootState): InjectedAccount | undefined => {
  const currUserMainAddress = selectUserInfo(state).main_addr;
  const linkedAccount = selectExtensionWalletAccounts(state).find(
    (account) => account.address === currUserMainAddress
  );
  return linkedAccount;
};
