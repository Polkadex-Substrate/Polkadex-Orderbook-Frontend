import { call, put } from "redux-saga/effects";
import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { OrderCommon } from "src/modules/types";
import { formatPayload } from "src/helpers/formatPayload";

import {
  userOrdersHistoryData,
  userOrdersHistoryError,
  UserOrdersHistoryFetch,
} from "../actions";
import { sendError } from "../../../";

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
      const res: any = yield call(() => API.post(ordersOptions)("/fetch_orders", data));
      const ordersArray: OrderCommon[] = res.Fine;
      yield put(userOrdersHistoryData({ list: ordersArray }));
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
