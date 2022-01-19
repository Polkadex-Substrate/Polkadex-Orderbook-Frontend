import { call, put, select } from "redux-saga/effects";

import { depositsData } from "../actions";
import { depositsError } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage, formatPayload } from "@polkadex/web-helpers";
import { selectUserInfo, sendError } from "@polkadex/orderbook-modules";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* fetchDepositsSaga() {
  try {
    const { address, keyringPair } = yield select(selectUserInfo);
    if (address !== "" && keyringPair) {
      const payload = { account: address };
      const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
      const data = formatPayload(signature, payload);
      const res = yield call(() => API.post(ordersOption)("/fetch_deposits", data));
      if (res.Fine) {
        yield put(depositsData(res.Fine));
      } else {
        throw new Error("Depost fetch failed");
      }
    }
  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: depositsError,
        },
      })
    );
  }
}
