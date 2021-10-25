import { call, put, select } from "redux-saga/effects";

import {
  alertPush,
  sendError,
  selectUserInfo,
  userOpenOrdersAppend,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
} from "src/modules";
import { API, isFinexEnabled, RequestOptions } from "src/api";
import { getCsrfToken, getOrderAPI } from "src/helpers";

const executeOptions = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: getOrderAPI(),
    headers: { "X-CSRF-Token": csrfToken },
  };
};

export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {
    const { market, side, volume, price, ord_type } = action.payload;
    const { proxyKeyring, mainAddress, nonce, baseAsset, quoteAsset } = yield select(
      selectUserInfo
    );
    const polkadexWorker = (window as any).polkadexWorker;

    const _placeOrder = yield call(() =>
      polkadexWorker.placeOrder(
        proxyKeyring,
        mainAddress,
        nonce,
        baseAsset,
        quoteAsset,
        ord_type, //! ordertype
        side, //! orderSide
        price,
        volume //! quantity
      )
    );
    if (_placeOrder.success) {
      const params = isFinexEnabled()
        ? {
            market: market,
            side: side,
            amount: volume,
            price: price,
            type: ord_type,
          }
        : action.payload;
      const order = yield call(
        API.post(executeOptions(getCsrfToken())),
        "/market/orders",
        params
      );
      yield put(orderExecuteData());

      if (getOrderAPI() === "finex") {
        if (order.type !== "market") {
          yield put(userOpenOrdersAppend(order));
        }
      } else {
        if (order.ord_type !== "market") {
          yield put(userOpenOrdersAppend(order));
        }
      }

      yield put(alertPush({ message: ["success.order.created"], type: "success" }));
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: orderExecuteError,
        },
      })
    );
  }
}
