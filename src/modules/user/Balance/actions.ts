import { USER_BALANCE_DATA, USER_BALANCE_FETCH } from "./constants";

export interface UserBalanceDataPayload {
  balance: any;
}
export interface UserBalanceFetch {
  type: typeof USER_BALANCE_FETCH;
  payload: { proxyAddress: string };
}
export interface UserBalanceData {
  type: typeof USER_BALANCE_DATA;
  payload: UserBalanceDataPayload;
}
export type BalanceHistoryAction = UserBalanceFetch | UserBalanceData;

export const userBalanceFetch = (payload: UserBalanceFetch["payload"]): UserBalanceFetch => ({
  type: USER_BALANCE_FETCH,
  payload,
});
export const userBalanceData = (payload: UserBalanceDataPayload): UserBalanceData => ({
  type: USER_BALANCE_DATA,
  payload,
});
