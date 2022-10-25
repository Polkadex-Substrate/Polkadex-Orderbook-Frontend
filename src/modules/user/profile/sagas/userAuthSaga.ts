// TODO : Fix saga
import { put, select } from "redux-saga/effects";

import { notificationPush, sendError, selectUserInfo } from "../../../";
import { userAccountSelectFetch, userAuthError } from "../actions";

import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";

export function* userAuthSaga() {
  const { userExists, isConfirmed } = yield select(selectUserInfo);
  try {
    const defaultTradeAddress = window.localStorage.getItem(
      LOCAL_STORAGE_ID.DEFAULT_TRADE_ACCOUNT
    );
    if (defaultTradeAddress?.length)
      yield put(userAccountSelectFetch({ tradeAddress: defaultTradeAddress }));

    if (!isConfirmed && userExists) {
      yield put(
        notificationPush({
          type: "AttentionAlert",
          message: {
            title: "Please confirm your email.",
            description: "Sign in again and confirm your email.",
          },
          time: new Date().getTime(),
        })
      );
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: userAuthError,
        },
      })
    );
  }
}
