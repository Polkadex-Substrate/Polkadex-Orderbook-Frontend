import { RootState } from "../..";

import { TradeAccount } from "@polkadex/orderbook/modules/types";

export const selectTradeAccountsLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.isFetching;

export const selectTradeAccountsSuccess = (state: RootState): boolean =>
  state.user.polkadotWallet.success;

export const selectBrowserTradeAccounts = (state: RootState): TradeAccount[] =>
  state.user.polkadotWallet.allBrowserAccounts;

export const selectTradeAccount =
  (address: string) =>
  (state: RootState): TradeAccount =>
    selectBrowserTradeAccounts(state).find((account) => account?.address === address);

export const selectRegisterTradeAccountLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.registerAccountLoading;

export const selectRegisterTradeAccountSuccess = (state: RootState): boolean =>
  state.user.polkadotWallet.registerAccountSuccess;

export const selectRegisterTradeAccountRemoving = (state: RootState): Array<string> =>
  state.user.polkadotWallet.removesInLoading;
