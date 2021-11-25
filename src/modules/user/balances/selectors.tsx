import { RootState } from "../../";

import { UserBalance } from "./actions";

export const selectBalancesSuccess = (state: RootState): boolean =>
  state.user.balances.success;
export const selectBalancesError = (state: RootState): string => state.user.balances.error;
export const selectBalancesLoading = (state: RootState): boolean =>
  state.user.balances.loading;
export const selectUserBalance = (state: RootState): UserBalance =>
  state.user.balances.balances;
