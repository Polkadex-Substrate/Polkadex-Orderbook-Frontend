import { call, put } from "redux-saga/effects";

import { WithdrawsFetch } from "../actions";
import { tradesError } from "../../trades";
import { withdrawsData } from "..";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";
import { sendError } from "@polkadex/orderbook-modules";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* fetchWithdrawsSaga(action: WithdrawsFetch) {
  try {
    const { address, keyringPair } = action.payload.account;
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
          actionError: tradesError,
        },
      })
    );
  }
}
