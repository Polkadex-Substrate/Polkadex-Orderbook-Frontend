import { RootState, SuccessTradeWalletData } from "../..";

import { TradeAccount } from "@polkadex/orderbook/modules/types";

export const selectTradeAccountsLoading = (state: RootState): boolean =>
  state.user.tradeWallet.isFetching;

export const selectTradeAccountsSuccess = (state: RootState): boolean =>
  state.user.tradeWallet.successData.success;

export const selectBrowserTradeAccounts = (state: RootState): TradeAccount[] =>
  state.user.tradeWallet.allBrowserAccounts;

export const selectTradeAccount =
  (address: string) =>
  (state: RootState): TradeAccount =>
    selectBrowserTradeAccounts(state).find((account) => account?.address === address);

export const selectRegisterTradeAccountLoading = (state: RootState): boolean =>
  state.user.tradeWallet.registerAccountLoading;

export const selectRegisterTradeAccountSuccess = (state: RootState): boolean =>
  state.user.tradeWallet.registerAccountSuccess;

export const selectRegisterTradeAccountRemoving = (state: RootState): Array<string> =>
  state.user.tradeWallet.removesInLoading;

export const selectRegisterTradeAccountInfo = (state: RootState): SuccessTradeWalletData =>
  state.user.tradeWallet.successData;
