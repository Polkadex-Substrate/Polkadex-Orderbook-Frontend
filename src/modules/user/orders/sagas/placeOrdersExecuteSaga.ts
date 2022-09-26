import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";
import keyring from "@polkadot/ui-keyring";

import {
  sendError,
  orderExecuteDataDelete,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
  selectRangerApi,
  selectCurrentTradeAccount,
  notificationPush,
  selectLinkedMainAddress,
} from "../../..";

import * as mutation from "./../../../../graphql/mutations";

import { createOrderPayload } from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {
    const { side, price, order_type, amount, symbol } = action.payload;
    if (order_type === "LIMIT" && Number(price) * Number(amount) <= 0) {
      throw new Error("Invalid price or amount");
    }
    if (order_type === "MARKET" && Number(amount) <= 0) {
      throw new Error("Invalid amount");
    }
    const { address } = yield select(selectCurrentTradeAccount);
    const mainAddress = yield select(selectLinkedMainAddress);
    const keyringPair = keyring.getPair(address);
    const timestamp = getNonce();
    const api = yield select(selectRangerApi);
    const client_order_id = getNewClientId();
    if (address !== "" && keyringPair && api) {
      const order = createOrderPayload(
        api,
        address,
        order_type,
        side,
        symbol[0],
        symbol[1],
        amount,
        price,
        timestamp,
        client_order_id,
        mainAddress
      );
      const signature = signPayload(api, keyringPair, order);
      const res = yield call(() => executePlaceOrder([order, signature], address));
      console.info("placed order: ", res);
      if (res.data.place_order) {
        yield put(
          notificationPush({
            type: "SuccessAlert",
            message: {
              title: "Order placed",
              description: `OrderId: ${res.data.place_order}`,
            },
            time: new Date().getTime(),
          })
        );
      }
      yield put(orderExecuteData());
      yield put(orderExecuteDataDelete());
    }
  } catch (error) {
    console.error("order error: ", error);
    yield put(orderExecuteDataDelete());
    const msg = error?.errors[0]?.message;
    const errortext = parseError(msg);
    console.log("msg: ", msg);
    yield put(
      notificationPush({
        type: "ErrorAlert",
        message: {
          title: "Order failed",
          description: errortext,
        },
        time: new Date().getTime(),
      })
    );
  }
}

const getNewClientId = () => {
  // 32 byte Uint8Array of random string with "webapp-" prefix
  const client_order_id = new Uint8Array(32);
  client_order_id.set(new TextEncoder().encode("webapp-"));
  for (let i = 9; i < 32; i++) {
    client_order_id[i] = Math.floor(Math.random() * 256);
  }
  return client_order_id;
};

const executePlaceOrder = async (orderPayload: any[], proxyAddress: string) => {
  const payloadStr = JSON.stringify({ PlaceOrder: orderPayload });
  console.log("payload: ", payloadStr);
  const res = await sendQueryToAppSync(
    mutation.place_order,
    { input: { payload: payloadStr } },
    proxyAddress
  );

  return res;
};

const parseError = (msg: any) => {
  if (typeof msg === "string") {
    return msg;
  } else {
    return JSON.stringify(msg);
  }
};
