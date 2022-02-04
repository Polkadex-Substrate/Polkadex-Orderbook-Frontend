import { call, delay, put, select } from "redux-saga/effects";
import { Keyring } from "@polkadot/api";

import {
  sendError,
  selectUserInfo,
  userOpenOrdersAppend,
  orderExecuteDataDelete,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
  userOrdersHistoryFetch,
} from "../../..";
import { notificationPush } from "../../notificationHandler";

import { defaultConfig, API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { formatPayload } from "src/helpers/formatPayload";
import { OrderSide, OrderType } from "@polkadex/orderbook/modules/types";

const { alertDisplayTime } = defaultConfig;

const ordersOption: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};
// TODO change keyring to alice/bob
export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {
    const { side, price, order_type, amount, symbol } = action.payload;
    if (order_type === "Limit" && Number(price) * Number(amount) <= 0) {
      throw new Error("Invalid price or amount");
    }
    if (order_type === "Market" && Number(amount) <= 0) {
      throw new Error("Invalid amount");
    }
    const { address, keyringPair } = yield select(selectUserInfo);
    if (address !== "" && keyringPair) {
      const payload = createOrderPayload(side, price, order_type, amount, symbol, address);
      const signature = yield call(() => signMessage(keyringPair, JSON.stringify(payload)));
      const data = formatPayload(signature, payload);
      const res = yield call(() => API.post(ordersOption)("/place_order", data));
      if (res.FineWithMessage) {
        yield put(orderExecuteData());
        console.log(res.Fine);
        yield delay(5000);
        yield put(orderExecuteDataDelete());
        yield put(userOrdersHistoryFetch());
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
          actionError: orderExecuteError,
        },
      })
    );
  }
}
const createOrderPayload = (
  side: OrderSide,
  price: string,
  order_type: OrderType,
  amount: string,
  symbol: number[],
  address: string
) => {
  if (order_type === "Limit") {
    return {
      symbol: symbol,
      order_side: side,
      order_type,
      price,
      amount,
      account: address,
    };
  } else {
    return {
      symbol: symbol,
      order_side: side,
      order_type,
      amount,
      account: address,
    };
  }
};
