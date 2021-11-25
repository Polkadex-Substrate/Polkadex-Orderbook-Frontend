import { USER_DEPOSITS_DATA, USER_DEPOSITS_FETCH } from "./constants";

import { ProxyAccount } from "@polkadex/orderbook-modules";

export interface UserDepositsDataPayload {
  // we don't know the types yet
  deposits: any;
}
export interface UserDepositsFetch {
  type: typeof USER_DEPOSITS_FETCH;
  payload: { account: ProxyAccount };
}
export interface UserDepositsData {
  type: typeof USER_DEPOSITS_DATA;
  payload: UserDepositsDataPayload;
}
export type DepositAction = UserDepositsFetch | UserDepositsData;

export const userDepositsFetch = (payload: UserDepositsFetch["payload"]): UserDepositsFetch => ({
  type: USER_DEPOSITS_FETCH,
  payload,
});
export const userDepositsData = (payload: UserDepositsDataPayload): UserDepositsData => ({
  type: USER_DEPOSITS_DATA,
  payload,
});
