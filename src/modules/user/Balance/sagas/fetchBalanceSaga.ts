import { call } from "redux-saga/effects";

import { UserBalanceFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* fetchBalanceSaga(action: UserBalanceFetch) {
  try {
    const proxyAddress: string = action.payload.proxyAddress;
    const data = { account: proxyAddress };
    const res = yield call(() => API.post(ordersOption)("/fetch_balance", data));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
