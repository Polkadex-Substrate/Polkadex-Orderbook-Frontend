import { Auth } from "aws-amplify";
import { call, delay, put } from "redux-saga/effects";
import Router from "next/router";

import {
  forgotPasswordReset,
  forgotPasswordData,
  forgotPasswordError,
  ForgotPasswordCode,
  sendError,
} from "@polkadex/orderbook-modules";

export function* forgotPasswordCodeSaga({ payload }: ForgotPasswordCode) {
  try {
    yield call(() => Auth.forgotPassword(payload.toLowerCase()));
    yield put(forgotPasswordData(payload));
    yield delay(5000);
    Router.push("/resetPasswordForm");
    yield put(forgotPasswordReset());
  } catch (error) {
    console.log(error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: forgotPasswordError,
        },
      })
    );
  }
}
