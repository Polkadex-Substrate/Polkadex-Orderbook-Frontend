import { call } from "redux-saga/effects";

import { UserWithdrawsFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* fetchWithdrawsSaga(action: UserWithdrawsFetch) {
  try {
    const { address, keyringPair } = action.payload.account;
    if (address !== "" && keyringPair) {
      const payload = { account: address };
      const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
      const data = formatPayload(signature, payload);
      const res = yield call(() => API.post(ordersOption)("/fetch_withdraws", data));
      console.log(res);
    }
  } catch (error) {
    console.log(error);
  }
}
