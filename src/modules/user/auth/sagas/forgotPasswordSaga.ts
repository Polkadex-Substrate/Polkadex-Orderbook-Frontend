import { Auth } from "aws-amplify";
import { call, delay, put, select } from "redux-saga/effects";
import Router from "next/router";

import {
  forgotPasswordData,
  forgotPasswordError,
  ForgotPasswordFetch,
  sendError,
  selectForgotPasswordEmail,
  forgotPasswordReset,
} from "@polkadex/orderbook-modules";

export function* forgotPasswordSaga(action: ForgotPasswordFetch) {
  const { code, newPassword } = action.payload;
  const email = yield select(selectForgotPasswordEmail);
  try {
    yield call(forgotPassword, email, code, newPassword);
    yield put(forgotPasswordData());
    yield delay(5000);
    Router.push("/signIn");
    yield put(forgotPasswordReset(true));
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

const forgotPassword = async (username: string, code: string, newPassword: string) => {
  const data = await Auth.forgotPasswordSubmit(username, code, newPassword);
  return data;
};
