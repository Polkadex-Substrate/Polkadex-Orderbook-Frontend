import { call, delay, put, select } from "redux-saga/effects";

import { userOrdersHistoryFetch } from "../../ordersHistory";
import { balancesFetch } from "../../balances";
import {
  orderCancelData,
  orderCancelDataDelete,
  orderCancelError,
  OrderCancelFetch,
} from "..";

import { formatPayload, signMessage } from "@polkadex/web-helpers";
import { selectUserInfo, sendError } from "@polkadex/orderbook-modules";
import { API, RequestOptions } from "@polkadex/orderbook-config";

// TODO: CHANGE TO USE ENCLAVE WS TO CACNEL ORDER
export function* cancelOrderSaga(action: OrderCancelFetch) {
  return;
  try {
    const { order_id } = action.payload;
    const { address, keyringPair } = yield select(selectUserInfo);
    if (address !== "" && keyringPair) {
      const payload = createCancelOrderPayload(order_id, address);
      const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
      const data = formatPayload(signature, payload);
      const res = yield call(() => API.post(ordersOption)("/cancel_order", data));
      if (res.FineWithMessage) {
        yield put(orderCancelData());
        console.log(res.Fine);
        yield delay(1000);
        yield put(orderCancelDataDelete());
        yield put(userOrdersHistoryFetch());
        yield put(balancesFetch());
      } else {
        throw new Error(res.Bad);
      }
    }
  } catch (error) {
    console.log({ error });
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: orderCancelError,
        },
      })
    );
  }
}
const createCancelOrderPayload = (order_id: string, account: string) => ({
  order_id: Number(order_id),
  account,
});
