import { RootState } from "../../";

import { Balance, BalanceBase } from ".";

export const selectBalancesSuccess = (state: RootState): boolean =>
  state.user.balances.success;

export const selectBalancesError = (state: RootState): string => state.user.balances.error;

export const selectBalancesLoading = (state: RootState): boolean =>
  state.user.balances.loading;

export const selectUserBalance = (state: RootState): Balance[] => state.user.balances.balances;

export const selectGetFreeProxyBalance =
  (state: RootState): ((assetId: string) => string) =>
  (assetId: string) => {
    const balance = state.user.balances.balances.find(
      (balance) =>
        balance.assetId === assetId || (balance.assetId === "PDEX" && assetId === "-1")
    );
    if (!balance) return "0";
    return balance.free_balance;
  };
