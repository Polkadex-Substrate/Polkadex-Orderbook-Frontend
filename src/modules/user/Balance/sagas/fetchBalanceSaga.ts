import { call } from "redux-saga/effects";

import { UserBalanceFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* fetchBalanceSaga(action: UserBalanceFetch) {
  try {
    const { address, keyringPair } = action.payload.account;
    const payload = { account: address };
    const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
    const data = formatPayload(signature, payload);
    const res = yield call(() => API.post(ordersOption)("/fetch_balance", data));
    console.log(res);
  } catch (error) {
    console.log(error);
  }
}
