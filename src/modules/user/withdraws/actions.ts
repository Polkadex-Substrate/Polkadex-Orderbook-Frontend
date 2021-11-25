import { USER_WITHDRAWS_DATA, USER_WITHDRAWS_FETCH } from "./constants";

import { ProxyAccount } from "@polkadex/orderbook-modules";

export interface UserWithdrawsDataPayload {
  // we don't know the types yet
  widthdraws: any;
}
export interface UserWithdrawsFetch {
  type: typeof USER_WITHDRAWS_FETCH;
  payload: { account: ProxyAccount };
}
export interface UserWithdrawsData {
  type: typeof USER_WITHDRAWS_DATA;
  payload: UserWithdrawsDataPayload;
}
export type DepositAction = UserWithdrawsFetch | UserWithdrawsData;

export const userWithdrawsFetch = (payload: UserWithdrawsFetch["payload"]): UserWithdrawsFetch => ({
  type: USER_WITHDRAWS_FETCH,
  payload,
});
export const userWithdrawsData = (payload: UserWithdrawsDataPayload): UserWithdrawsData => ({
  type: USER_WITHDRAWS_DATA,
  payload,
});
