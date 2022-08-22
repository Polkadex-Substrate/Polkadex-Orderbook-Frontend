import { put, call } from "redux-saga/effects";
import { API, Auth } from "aws-amplify";
import router from "next/router";

import { signInData, signInError, SignInFetch } from "../actions";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";

let userEmail = "";
export function* signInSaga(action: SignInFetch) {
  try {
    const { email, password } = action.payload;
    userEmail = email;
    const res = yield call(signIn, email, password);
    yield put(signInData({ email, isConfirmed: true }));
  } catch (error) {
    console.error(error);
    if (error.name === "UserNotConfirmedException") {
      yield put(signInData({ email: userEmail, isConfirmed: false }));
      yield call(router.push, "/codeVerification");
      return;
    }
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: signInError,
        },
      })
    );
  }
}

async function signIn(email: string, password: string) {
  const res = await Auth.signIn(email, password);
  return res;
}
