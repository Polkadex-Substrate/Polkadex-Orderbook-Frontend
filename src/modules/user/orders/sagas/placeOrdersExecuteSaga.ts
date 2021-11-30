import { call, put, select } from "redux-saga/effects";

import {
  sendError,
  selectUserInfo,
  userOpenOrdersAppend,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
} from "../../..";
import { notificationPush } from "../../notificationHandler";

import { getCurrentDate } from "@polkadex/web-helpers";

export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {
    const { side, volume, price, ord_type } = action.payload;
    const { proxyKeyring, mainAddress, nonce, baseAsset, quoteAsset } = yield select(
      selectUserInfo
    );
    const polkadexWorker = (window as any).polkadexWorker;

    const _placeOrder = yield call(() =>
      polkadexWorker.placeOrder({
        proxyKeyring,
        mainAddress,
        nonce,
        baseAsset,
        quoteAsset,
        ordertype: ord_type,
        orderSide: side,
        price,
        quantity: volume,
      })
    );
    // TODO: Add order status alerts
    if (_placeOrder.success) {
      yield put(orderExecuteData());
      yield put(
        userOpenOrdersAppend({
          // TODO: Check order types
          // id: _placeOrder.message,
          // timestamp: getCurrentDate(),
          // status: string,
          // symbol?: string[] | null;
          // order_type: ord_type,
          // order_side: side,
          // price: price,
          // average: number;
          // amount: volume;
          // filled: number;
          // trades?: null[] | null;
          // fee: 0
          date: getCurrentDate(),
          baseUnit: baseAsset,
          quoteUnit: quoteAsset,
          type: ord_type,
          side: side,
          price: price,
          amount: volume,
          uuid: _placeOrder.message,
          total: `${volume}`,
          isSell: side === "sell",
          filled: "filled",
        })
      );
      yield put(
        notificationPush({
          type: "Loading",
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
