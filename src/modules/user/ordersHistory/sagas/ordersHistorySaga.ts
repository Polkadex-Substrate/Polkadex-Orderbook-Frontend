import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import {
  userOrdersHistoryData,
  userOrdersHistoryError,
  UserOrdersHistoryFetch,
} from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const ordersOptions: RequestOptions = {
  apiVersion: "engine",
};

export function* ordersHistorySaga(action: UserOrdersHistoryFetch) {
  try {
    const { pageIndex, limit, type } = action.payload;
    const params = `${type === "all" ? "" : "&state=wait"}`;
    const data = yield call(
      API.get(ordersOptions),
      `/market/orders?page=${pageIndex + 1}&limit=${limit}${params}`
    );
    let nextPageExists = false;

    if (data.length === limit) {
      const checkData = yield call(
        API.get(ordersOptions),
        `/market/orders?page=${(pageIndex + 1) * limit + 1}&limit=${1}${params}`
      );

      if (checkData.length === 1) {
        nextPageExists = true;
      }
    }

    yield put(userOrdersHistoryData({ list: data, nextPageExists, pageIndex }));
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
