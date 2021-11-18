import { call, put } from "redux-saga/effects";

import { alertPush, sendError } from "../../../";
import { ordersHistoryCancelError, OrdersHistoryCancelFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { getCsrfToken } from "@polkadex/web-helpers";

const ordersCancelOptions = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: "engine",
    headers: { "X-CSRF-Token": csrfToken },
  };
};

export function* ordersHistoryCancelSaga(action: OrdersHistoryCancelFetch) {
  try {
    const { id } = action.payload;
    yield call(API.post(ordersCancelOptions(getCsrfToken())), `/market/orders/${id}/cancel`, {
      id,
    });
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
          actionError: ordersHistoryCancelError,
        },
      })
    );
  }
}
