import { RootState } from "../../";
import { OrderCommon } from "../../types";

export const selectOrdersHistory = (state: RootState): OrderCommon[] =>
  state.user.ordersHistory.list;

export const selectOpenOrders = (state: RootState): OrderCommon[] =>
  state.user.ordersHistory.openOrders;

export const selectOpenOrdersHistory = (state: RootState): OrderCommon[] =>
  state.user.ordersHistory.list.filter((order) => order.status === "Accepted");

export const selectCurrentPageIndex = (state: RootState): number =>
  state.user.ordersHistory.pageIndex;

export const selectOrdersFirstElemIndex = (state: RootState, limit: number): number =>
  state.user.ordersHistory.pageIndex * limit + 1;

export const selectOrdersLastElemIndex = (state: RootState, limit: number): number =>
  state.user.ordersHistory.pageIndex * limit + state.user.ordersHistory.list.length;

export const selectOrdersHistoryLoading = (state: RootState): boolean =>
  state.user.ordersHistory.loading;
