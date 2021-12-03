import { call, put, select } from "redux-saga/effects";

import { transactionsData } from "../actions";
import { alertPush } from "../../../public/alertHandler";
import { selectUserInfo } from "../../profile";

import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "@polkadex/orderbook/helpers/formatPayload";
import { API, RequestOptions } from "@polkadex/orderbook-config";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};
export function* transactionsSaga() {
  try {
    const { address, keyringPair } = yield select(selectUserInfo);
    const payload = { account: address };
    const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
    const data = formatPayload(signature, payload);
    // TODO: Replace url
    const res = yield call(() => API.post(ordersOption)("/fetch_transactions ", data));
    if (res.Fine) {
      yield put(transactionsData(res.Fine));
    } else {
      throw new Error("user transaction fetch failed");
    }
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
