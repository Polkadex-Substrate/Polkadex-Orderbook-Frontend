import { state } from "@polkadot/types/interfaces/definitions";

import { RootState } from "../..";

import { InjectedAccount } from ".";

import { getFromStorage } from "@polkadex/orderbook/helpers/storage";
import { getIsTradeAccountPasswordProtected } from "@polkadex/orderbook/helpers/localStorageHelpers";

export const selectTradeAccountsLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.isFetching;

export const selectTradeAccountsSuccess = (state: RootState): boolean =>
  state.user.polkadotWallet.success;

export const selectBrowserTradeAccounts = (state: RootState): InjectedAccount[] =>
  state.user.polkadotWallet.allBrowserAccounts;

export const selectCurrentTradeAccount = (state: RootState): InjectedAccount =>
  state.user.polkadotWallet.selectedAccount;

export const selectCurrentTradeAccountIsPassword = (state: RootState): boolean =>
  state.user.polkadotWallet.selectedAccount.isPasswordProtected;

export const selectHasCurrentTradeAccount = (state: RootState): boolean =>
  state.user.polkadotWallet.selectedAccount.address !== "";

export const selectLinkedMainAddress = (state: RootState): string => {
  return state.user.polkadotWallet.mainAddress;
};

export const selectRegisterTradeAccountLoading = (state: RootState): boolean =>
  state.user.polkadotWallet.registerAccountLoading;

export const selectRegisterTradeAccountSuccess = (state: RootState): boolean =>
  state.user.polkadotWallet.registerAccountSuccess;
