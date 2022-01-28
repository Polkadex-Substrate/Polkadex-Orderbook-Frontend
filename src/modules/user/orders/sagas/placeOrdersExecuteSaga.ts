import { call, put, select } from "redux-saga/effects";
import { Keyring } from "@polkadot/api";

import {
  sendError,
  selectUserInfo,
  userOpenOrdersAppend,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
  userOrdersHistoryFetch,
} from "../../..";
import { notificationPush } from "../../notificationHandler";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};
// TODO change keyring to alice/bob
export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {
    const { side, price, order_type, amount, symbol } = action.payload;
    if (Number(price) * Number(amount) <= 0) {
      throw new Error("Invalid price or amount");
    }
    const { address, keyringPair } = yield select(selectUserInfo);
    if (address !== "" && keyringPair) {
      const payload = {
        symbol: symbol,
        order_side: side,
        order_type,
        price,
        amount,
        account: address,
      };
      const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
      const data = formatPayload(signature, payload);
      const res = yield call(() => API.post(ordersOption)("/place_order", data));
      if (res.FineWithMessage) {
        yield put(orderExecuteData());
        console.log(res.Fine);
        yield put(
          notificationPush({
            type: "Loading",
            message: {
              title: res.FineWithMessage.message,
              description: "Congrats your order has been created",
            },
          })
        );
        yield put(userOrdersHistoryFetch());
      } else {
        throw new Error("Place order failed");
      }
    }
  } catch (error) {
    console.log({ error });
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
