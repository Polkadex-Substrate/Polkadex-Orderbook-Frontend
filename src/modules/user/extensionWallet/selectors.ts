import { RootState } from "../..";

import { ExtensionAccount } from "@polkadex/orderbook/modules/types";

export const selectExtensionWalletAccounts = (state: RootState): ExtensionAccount[] =>
  state.user.extensionWallet.allAccounts;

export const selectIsAddressInExtension =
  (address: string) =>
  (state: RootState): boolean => {
    return (
      address &&
      selectExtensionWalletAccounts(state)?.some(({ account }) => account?.address === address)
    );
  };

export const selectMainAccount =
  (address: string) =>
  (state: RootState): ExtensionAccount =>
    address &&
    selectExtensionWalletAccounts(state)?.find(
      ({ account }) => account?.address?.toLowerCase() === address?.toLowerCase()
    );

export const selectIsRegisterMainAccountLoading = (state: RootState): boolean =>
  state.user.extensionWallet.registerMainAccountLoading;

export const selectIsRegisterMainAccountSuccess = (state: RootState): boolean =>
  state.user.extensionWallet.registerMainAccountSuccess;
