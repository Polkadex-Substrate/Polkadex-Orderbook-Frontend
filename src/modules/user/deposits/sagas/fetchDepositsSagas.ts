import { call, put } from "redux-saga/effects";

import { depositsData, DepositsFetch } from "../actions";
import { depositsError } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";
import { sendError } from "@polkadex/orderbook-modules";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* fetchDepositsSaga(action: DepositsFetch) {
  try {
    const { address, keyringPair } = action.payload.account;
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
