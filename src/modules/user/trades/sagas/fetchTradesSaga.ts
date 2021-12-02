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
    // const res = yield call(() => API.post(ordersOption)("/fetch_user_trades", data));
    // TODO: Check res error

    const res = {
      Fine: [
        {
          id: "0x0a0sas0a0sas",
          timestamp: new Date().getTime(),
          symbol: ["BTC"],
          order_id: "0x020d00fdfd",
          order_type: "limit",
          order_side: "sell",
          price: 2.12001,
          amount: 1.868,
          fee: {
            currency: "BTC",
            cost: 0.0,
          },
        },
      ],
    };
    if (res.Fine) {
      yield put(tradesData(res.Fine));
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
