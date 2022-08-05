import { put, call } from "redux-saga/effects";
import { API, Auth } from "aws-amplify";

import { signInData, signInError, SignInFetch } from "../actions";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";

export function* signInSaga(action: SignInFetch) {
  try {
    const { email, password } = action.payload;
    const res = yield call(signIn, email, password);
    yield put(signInData({ email }));
  } catch (error) {
    console.error(error);
    if (error.name === "UserNotConfirmedException") {
      // TODO
      // nofify that the user is hasn't confirmed his account and redirect to the code verification page.
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
