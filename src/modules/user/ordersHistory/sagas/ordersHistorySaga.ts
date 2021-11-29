import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import {
  userOrdersHistoryData,
  userOrdersHistoryError,
  UserOrdersHistoryFetch,
} from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { OrderCommon } from "src/modules/types";
import { formatPayload } from "src/helpers/formatPayload";

const ordersOptions: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* ordersHistorySaga(action: UserOrdersHistoryFetch) {
  try {
    const { userAccount } = action.payload;
    const payload = { account: userAccount.address };
    if (userAccount.address) {
      const signature = yield call(() =>
        signMessage(userAccount.keyringPair, JSON.stringify(payload))
      );
      const data = formatPayload(signature, payload);
      const { Fine }: OrderCommon = yield call(() =>
        API.post(ordersOptions)("/fetch_orders", data)
      );
      yield put(userOrdersHistoryData({ list: Fine }));
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userOrdersHistoryError,
        },
      })
    );
  }
}
