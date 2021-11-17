import { call, put, select } from "redux-saga/effects";

import {
  alertPush,
  sendError,
  selectUserInfo,
  userOpenOrdersAppend,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
} from "../../../";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { getCsrfToken } from "@polkadex/web-helpers";

const executeOptions = (csrfToken?: string): RequestOptions => {
  return {
    apiVersion: "engine",
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
      const params = {
        market: market,
        side: side,
        amount: volume,
        price: price,
        type: ord_type,
      };

      const order = yield call(
        API.post(executeOptions(getCsrfToken())),
        "/market/orders",
        params
      );
      yield put(orderExecuteData());
      yield put(userOpenOrdersAppend(order));
      yield put(
        alertPush({
          type: "Successful",
          message: {
            title: "Order Created",
            description: "Congrats your order has been created",
          },
        })
      );
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
