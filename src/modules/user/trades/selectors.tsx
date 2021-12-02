import { RootState } from "../..";

import { UserTrade } from ".";

export const selectTradesSuccess = (state: RootState): boolean => state.user.trades.success;
export const selectTradesError = (state: RootState): string => state.user.trades.error;
export const selectTradesLoading = (state: RootState): boolean => state.user.trades.loading;
export const selectTradesData = (state: RootState): UserTrade[] => state.user.trades.data;
