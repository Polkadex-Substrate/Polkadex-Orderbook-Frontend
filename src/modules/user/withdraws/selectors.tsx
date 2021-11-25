import { RootState } from "../..";

import { Withdraws } from ".";

export const selectWithdrawsSuccess = (state: RootState): boolean =>
  state.user.withdraws.success;
export const selectWithdrawsError = (state: RootState): string => state.user.withdraws.error;
export const selectWithdrawsLoading = (state: RootState): boolean =>
  state.user.withdraws.loading;
export const selectWithdrawsData = (state: RootState): Withdraws => state.user.withdraws.data;
