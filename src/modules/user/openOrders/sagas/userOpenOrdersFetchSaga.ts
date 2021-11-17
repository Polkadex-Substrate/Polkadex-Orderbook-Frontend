import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { userOpenOrdersData, userOpenOrdersError, UserOpenOrdersFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const ordersOptions: RequestOptions = {
  apiVersion: "engine",
};

export function* userOpenOrdersFetchSaga(action: UserOpenOrdersFetch) {
  try {
    const { market } = action.payload;
    const list = yield call(
      API.get(ordersOptions),
      `/market/orders?market=${market.id}&state=wait`
    );

    yield put(userOpenOrdersData(list));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userOpenOrdersError,
        },
      })
    );
  }
}
