import { call, put } from "redux-saga/effects";

import { alertPush, sendError } from "../../../";
import { ordersCancelAllData, ordersCancelAllError, OrdersCancelAllFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { getCsrfToken } from "@polkadex/web-helpers";

const ordersCancelAllOptions = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: "engine",
    headers: { "X-CSRF-Token": csrfToken },
  };
};

export function* ordersCancelAllSaga(action: OrdersCancelAllFetch) {
  try {
    yield call(
      API.post(ordersCancelAllOptions(getCsrfToken())),
      "/market/orders/cancel",
      action.payload
    );
    yield put(ordersCancelAllData());
    yield put(
      alertPush({
        type: "Successful",
        message: {
          title: "Order Canceled",
          description: "Congrats your order has been created",
        },
      })
    );
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: ordersCancelAllError,
        },
      })
    );
  }
}
