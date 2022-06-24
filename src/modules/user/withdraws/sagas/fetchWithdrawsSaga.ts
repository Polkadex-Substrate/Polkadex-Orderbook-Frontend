import { call, put, select } from "redux-saga/effects";

import { userTradesError } from "../../trades";
import { withdrawsData } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage, formatPayload } from "@polkadex/web-helpers";
import { selectUserInfo, sendError } from "@polkadex/orderbook-modules";

// TOOD: CHANGE TO USE ENCLAVE WS
export function* fetchWithdrawsSaga() {
  return;
  try {
    const { address, keyringPair } = yield select(selectUserInfo);
    if (address !== "" && keyringPair) {
      const payload = { account: address };
      const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
      const data = formatPayload(signature, payload);
      const res = yield call(() => API.post(ordersOption)("/fetch_withdraws", data));
      if (res.Fine) {
        yield put(withdrawsData(res.Fine));
      } else {
        throw new Error("withdraw fetch failed");
      }
    }
  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userTradesError,
        },
      })
    );
  }
}
