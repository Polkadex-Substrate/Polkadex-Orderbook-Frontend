import { call, put, select } from "redux-saga/effects";

import { tradesData, tradesError } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";
import { selectUserInfo, sendError } from "@polkadex/orderbook-modules";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* fetchTradesSaga() {
  try {
    const { address, keyringPair } = yield select(selectUserInfo);
    const payload = { account: address };
    const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
    const data = formatPayload(signature, payload);
    const res = yield call(() => API.post(ordersOption)("/fetch_user_trades", data));
    if (res.Fine) {
      const trades = res.Fine.sort((a, b) => b.timestamp - a.timestamp);
      yield put(tradesData(trades));
    } else {
      throw new Error("user trade fetch failed");
    }
  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: tradesError,
        },
      })
    );
  }
}
