import { RootState } from "../../";

import { Balance } from ".";

export const selectBalancesSuccess = (state: RootState): boolean =>
  state.user.balances.success;

export const selectBalancesError = (state: RootState): string => state.user.balances.error;

export const selectBalancesLoading = (state: RootState): boolean =>
  state.user.balances.loading;

export const selectUserBalanceTimestamp = (state: RootState): number =>
  state.user.balances.balances?.timestamp;

export const selectUserBalance = (state: RootState): Balance[] =>
  state.user.balances.balances?.userBalance;
