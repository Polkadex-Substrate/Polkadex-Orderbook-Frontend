import { call, put } from "redux-saga/effects";

import { alertPush, sendError } from "../../../";
import {
  walletsWithdrawCcyData,
  walletsWithdrawCcyError,
  WalletsWithdrawCcyFetch,
} from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";
import { getCsrfToken } from "@polkadex/web-helpers";

// TODO: CHANGE TO USE ENCLAVE WS
export function* walletsWithdrawCcySaga(action: WalletsWithdrawCcyFetch) {
  return;
  try {
    yield call(
      API.post(walletsWithdrawCcyOptions(getCsrfToken())),
      "/account/withdraws",
      action.payload
    );
    yield put(walletsWithdrawCcyData());
    yield put(
      alertPush({
        type: "Successful",
        message: {
          title: "Withdraw Successful",
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
          actionError: walletsWithdrawCcyError,
        },
      })
    );
  }
}
