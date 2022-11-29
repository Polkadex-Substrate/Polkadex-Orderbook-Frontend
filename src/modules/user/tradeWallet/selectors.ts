import { RootState, RegisterTradeAccount, PreviewAccountModal } from "../..";

import { TradeAccount } from "@polkadex/orderbook/modules/types";

export const selectTradeAccountsLoading = (state: RootState): boolean =>
  state.user.tradeWallet.isFetching;

export const selectBrowserTradeAccounts = (state: RootState): TradeAccount[] =>
  state.user.tradeWallet.allBrowserAccounts;

export const selectNewlyAddedTradeAccounts = (state: RootState): TradeAccount =>
  state.user.tradeWallet.newlyAddedTradeAccount;

export const selectTradeAccount =
  (address: string) =>
  (state: RootState): TradeAccount =>
    selectBrowserTradeAccounts(state).find(
      (account) => account?.address?.toLowerCase() === address?.toLowerCase()
    );

export const selectShouldShowProtectedPassword = (state: RootState): boolean =>
  state.user.tradeWallet?.allBrowserAccounts?.some(
    (account) =>
      account?.address?.toLowerCase() ===
      state.user.profile?.selectedAccount?.tradeAddress?.toLowerCase()
  );

export const selectRegisterTradeAccountLoading = (state: RootState): boolean =>
  state.user.tradeWallet.registerAccountLoading;

export const selectIsTradeAccountRemoveLoading = (
  state: RootState,
  address: string
): boolean => selectRegisterTradeAccountRemoving(state).includes(address);

export const selectRegisterTradeAccountSuccess = (state: RootState): boolean =>
  state.user.tradeWallet.registerAccountSuccess;

export const selectRegisterTradeAccountRemoving = (state: RootState): Array<string> =>
  state.user.tradeWallet.removesInLoading;

export const selectRegisterTradeAccountInfo = (state: RootState): RegisterTradeAccount =>
  state.user.tradeWallet.registerAccountModal;

export const selectImportTradeAccountSuccess = (state: RootState): boolean =>
  state.user.tradeWallet.importAccountSuccess;

export const selectPreviewTradeAccountSelect = (
  state: RootState
): PreviewAccountModal["selected"] => state.user.tradeWallet.previewAccountModal.selected;

export const selectIsPreviewTradeAccountActive = (state: RootState): boolean =>
  state.user.tradeWallet.previewAccountModal.isActive;

export const selectExportingTradeAccount = (state: RootState): boolean =>
  state.user.tradeWallet.exportAccountLoading;
