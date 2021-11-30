import { RootState } from "../../";
import { OrderCommon } from "../../types";

export const selectOrdersHistory = (state: RootState): OrderCommon[] =>
  state.user.ordersHistory.list;

export const selectCurrentPageIndex = (state: RootState): number =>
  state.user.ordersHistory.pageIndex;

export const selectOrdersFirstElemIndex = (state: RootState, limit: number): number =>
  state.user.ordersHistory.pageIndex * limit + 1;

export const selectOrdersLastElemIndex = (state: RootState, limit: number): number =>
  state.user.ordersHistory.pageIndex * limit + state.user.ordersHistory.list.length;

export const selectOrdersNextPageExists = (state: RootState): boolean =>
  state.user.ordersHistory.nextPageExists;

export const selectOrdersHistoryLoading = (state: RootState): boolean =>
  state.user.ordersHistory.fetching;
