import { put, call } from "redux-saga/effects";
import { Auth } from "aws-amplify";

import { sendError } from "../../../";
import { signUpData, signUpError, SignUpFetch } from "../actions";

export function* signUpSaga(action: SignUpFetch) {
  try {
    const { email, password } = action.payload;
    const { user, userConfirmed } = yield call(signUp, email, password);
    yield put(signUpData({ userConfirmed, email }));
  } catch (error) {
    console.log("error: ", error);
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: signUpError,
        },
      })
    );
  }
}

async function signUp(email: string, password: string) {
  const { user, userConfirmed } = await Auth.signUp({
    username: email.toLowerCase(),
    password,
    attributes: {
      email,
    },
  });
  return { user, userConfirmed };
}
