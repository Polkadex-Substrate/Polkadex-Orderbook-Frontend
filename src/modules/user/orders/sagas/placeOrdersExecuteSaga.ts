import { call, put, select } from "redux-saga/effects";
import { API } from "aws-amplify";

import {
  sendError,
  selectUserInfo,
  orderExecuteDataDelete,
  orderExecuteData,
  orderExecuteError,
  OrderExecuteFetch,
  selectRangerApi,
} from "../../..";

import * as mutation from "./../../../../graphql/mutations";

import { createOrderPayload } from "@polkadex/orderbook/helpers/createOrdersHelpers";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";

export function* ordersExecuteSaga(action: OrderExecuteFetch) {
  try {
    const { side, price, order_type, amount, symbol } = action.payload;
    if (order_type === "LIMIT" && Number(price) * Number(amount) <= 0) {
      throw new Error("Invalid price or amount");
    }
    if (order_type === "MARKET" && Number(amount) <= 0) {
      throw new Error("Invalid amount");
    }
    const { address, keyringPair } = yield select(selectUserInfo);
    const nonce = getNonce();
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
        nonce,
        client_order_id
      );
      const signature = signPayload(api, keyringPair, order);
      const res = yield call(() => executePlaceOrder([order, signature]));
      console.info("placed order: ", res);
      yield put(orderExecuteData());
      yield put(orderExecuteDataDelete());
    }
  } catch (error) {
    console.error("order error: ", error);
    yield put(orderExecuteDataDelete());
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

const getNewClientId = () => {
  // 32 byte Uint8Array of random string with "webapp-" prefix
  const client_order_id = new Uint8Array(32);
  client_order_id.set(new TextEncoder().encode("webapp-"));
  for (let i = 9; i < 32; i++) {
    client_order_id[i] = Math.floor(Math.random() * 256);
  }
  return client_order_id;
};

const executePlaceOrder = async (orderPayload) => {
  const payload = { PlaceOrder: orderPayload };
  const res = await API.graphql({
    query: mutation.place_order,
    variables: { input: payload },
  });
  return res;
};
