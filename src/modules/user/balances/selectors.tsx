import { RootState } from "../../";

import { Balance } from ".";

export const selectBalancesSuccess = (state: RootState): boolean =>
  state.user.balances.success;

export const selectBalancesError = (state: RootState): string => state.user.balances.error;

export const selectBalancesLoading = (state: RootState): boolean =>
  state.user.balances.loading;

export const selectUserBalance = (state: RootState): Balance[] => state.user.balances.balances;

export const selectGetFreeTradeBalance =
  (state: RootState): ((assetId: string) => string) =>
  (assetId: string) => {
    const balance = state?.user?.balances?.balances?.find(
      (balance) => balance?.asset_id?.toString() === assetId
    );
    if (!balance?.asset_id) return "0";
    return balance.free_balance;
  };
