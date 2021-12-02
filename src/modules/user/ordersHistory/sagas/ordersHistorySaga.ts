// TODO: Create User middleware
import { call, put, select } from "redux-saga/effects";

import { userOrdersHistoryData, userOrdersHistoryError } from "../actions";
import { sendError } from "../../../";
import { selectUserInfo } from "../../profile";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { signMessage } from "@polkadex/web-helpers";
import { OrderCommon } from "src/modules/types";
import { formatPayload } from "src/helpers/formatPayload";

const ordersOptions: RequestOptions = {
  apiVersion: "polkadexHostUrl",
};

export function* ordersHistorySaga() {
  try {
    const userAccount = yield select(selectUserInfo);
    const payload = { account: userAccount.address };
    const signature = yield call(() =>
      signMessage(userAccount.keyringPair, JSON.stringify(payload))
    );
    const data = formatPayload(signature, payload);
    const res: any = yield call(() => API.post(ordersOptions)("/fetch_orders", data));
    const ordersArray1: OrderCommon[] = res.Fine;
    console.log({ ordersArray1 });
    const ordersArray: OrderCommon[] = [
      {
        uuid: "0xfd9d8vjdfdjf9djf9dfjd323ojre9fd9f",
        date: new Date(),
        baseUnit: "BTC",
        quoteUnit: "PDEX",
        side: "sell",
        price: 0.5,
        amount: 1.79,
        total: 9.905,
        filled: 0.121222222,
        type: "limit",
        state: "pending",
      },
      {
        uuid: "0xfd9d8vjdfkkjf9djf9dfjd323ojre9fd9f",
        date: new Date(),
        baseUnit: "BTC",
        quoteUnit: "PDEX",
        side: "sell",
        price: 0.51,
        amount: 5.445,
        total: 13.905,
        filled: 13.905,
        type: "limit",
        state: "filled",
      },
    ];

    yield put(userOrdersHistoryData({ list: ordersArray }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userOrdersHistoryError,
        },
      })
    );
  }
}
