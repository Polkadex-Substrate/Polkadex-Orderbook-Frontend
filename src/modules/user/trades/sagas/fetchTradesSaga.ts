import { call, put } from "redux-saga/effects";

import { TradesFetch } from "../actions";
import { tradesData, tradesError } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";
import { sendError } from "@polkadex/orderbook-modules";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* fetchTradesSaga(action: TradesFetch) {
  console.log("fetchTradesSaga", action.payload.account);

  try {
    const { address, keyringPair } = action.payload.account;
    if (address !== "" && keyringPair) {
      const payload = { account: address };
      const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
      const data = formatPayload(signature, payload);
      const res = yield call(() => API.post(ordersOption)("/fetch_user_trades", data));
      if (res.Fine) {
        yield put(tradesData(res.File));
      } else {
        throw new Error("user trade fetch failed");
      }
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
