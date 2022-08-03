import { RootState } from "../..";

export const selectDepositsSuccess = (state: RootState): boolean =>
  state.user.deposits.success;
export const selectDepositsError = (state: RootState): string => state.user.deposits.error;
export const selectDepositsLoading = (state: RootState): boolean =>
  state.user.deposits.loading;
