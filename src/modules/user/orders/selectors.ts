import { RootState } from "../../";

const selectOrdersState = (state: RootState): RootState["user"]["orders"] => state.user.orders;

export const selectOrderExecuteLoading = (state: RootState): boolean =>
  selectOrdersState(state).executeLoading;

export const selectOrderExecuteSucess = (state: RootState): boolean =>
  selectOrdersState(state).executeSuccess;

export const selectCurrentPrice = (state: RootState): number | undefined =>
  selectOrdersState(state).currentPrice;

export const selectAmount = (state: RootState): string => selectOrdersState(state).amount;

export const selectOrderType = (state: RootState): string =>
  selectOrdersState(state).orderType;

export const selectCancelLoading = (state: RootState): boolean =>
  selectOrdersState(state).cancelLoading;

export const selectCancelSucess = (state: RootState): boolean =>
  selectOrdersState(state).cancelSuccess;
