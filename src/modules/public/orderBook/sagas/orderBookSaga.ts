import { call, put } from "redux-saga/effects";

import { alertPush } from "../../../";
import { depthData, orderBookData, orderBookError, OrderBookFetch } from "../actions";

import { getDepthFromOrderbook } from "./helper";

import { API, RequestOptions } from "@polkadex/orderbook-config";

const orderBookOptions: RequestOptions = {
  apiVersion: "apiPath",
};

export function* orderBookSaga(action: OrderBookFetch) {
  try {
    return
    const market = action.payload;
    const res = yield call(API.get(orderBookOptions), `/transactions`);
    const data = res.data;
    const { asks, bids } = getDepthFromOrderbook(data);
    yield put(orderBookData(data));
    yield put(depthData({ asks, bids }));
  } catch (error) {
    yield put(
      alertPush({
        message: {
          title: "Something has gone wrong (orderbook fetch)..",
          description: error.message,
        },
        type: "Error",
      })
    );
  }
}
