import { USER_TRADES_DATA, USER_TRADES_FETCH } from "./constants";

import { ProxyAccount } from "@polkadex/orderbook-modules";

export interface UserTradesDataPayload {
  // we don't know the types yet
  trades: any;
}
export interface UserTradesFetch {
  type: typeof USER_TRADES_FETCH;
  payload: { account: ProxyAccount };
}
export interface UserTradesData {
  type: typeof USER_TRADES_DATA;
  payload: UserTradesDataPayload;
}
export type DepositAction = UserTradesFetch | UserTradesData;

export const userTradesFetch = (payload: UserTradesFetch["payload"]): UserTradesFetch => ({
  type: USER_TRADES_FETCH,
  payload,
});
export const userTradesData = (payload: UserTradesDataPayload): UserTradesData => ({
  type: USER_TRADES_DATA,
  payload,
});
