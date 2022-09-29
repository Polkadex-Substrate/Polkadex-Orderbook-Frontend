import { Auth } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import {
  forgotPasswordData,
  forgotPasswordError,
  ForgotPasswordFetch,
  sendError,
} from "@polkadex/orderbook-modules";

export function* forgotPasswordSaga(action: ForgotPasswordFetch) {
  const { username, code, newPassword } = action.payload;
  try {
    const data = yield call(forgotPassword, username, code, newPassword);
    console.log(data);
    yield put(forgotPasswordData());
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
