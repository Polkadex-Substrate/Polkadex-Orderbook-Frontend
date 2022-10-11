import { put, call } from "redux-saga/effects";
import { Auth } from "aws-amplify";
import router from "next/router";
import { CognitoUser } from "amazon-cognito-identity-js";

import { signInData, signInError, SignInFetch } from "../actions";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";
import { notificationPush, userFetch } from "@polkadex/orderbook-modules";
import { AUTH_ERROR_CODES } from "@polkadex/orderbook/modules/user/auth/constants";

let userEmail = "";
export function* signInSaga(action: SignInFetch) {
  try {
    const { email, password } = action.payload;
    userEmail = email;
    const { user } = yield call(signIn, email, password);
    yield put(signInData({ user, email, isConfirmed: true }));
    yield put(userFetch());
  } catch (error) {
    console.log("error:", error);
    const errorCode = error?.name;
    switch (errorCode) {
      case AUTH_ERROR_CODES.NOT_AUTHORIZED: {
        yield errorAlert(error);
        return;
      }
      case AUTH_ERROR_CODES.USER_NOT_CONFIRMED: {
        yield put(signInData({ email: userEmail, isConfirmed: false }));
        yield call(router.push, "/codeVerification");
        yield alreadyRegisteredNotify();
        return;
      }
      default: {
        yield errorAlert(error);
      }
    }
  }
}

async function signIn(email: string, password: string): Promise<{ user: CognitoUser }> {
  const user: CognitoUser = await Auth.signIn(email, password);
  console.log("sign in user", user, user);
  return { user };
}

function* errorAlert(error) {
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

function* alreadyRegisteredNotify() {
  yield put(
    notificationPush({
      message: {
        title: "Sign in Failed!",
        description:
          "It looks like you have not confirmed your email. Please confirm your email and try again.",
      },
      time: new Date().getTime(),
      type: "AttentionAlert",
    })
  );
}
