import { Auth } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { userReset } from "../../profile";
import { logOutData, logOutError, LogoutFetch } from "../actions";

export function* logoutSaga(action: LogoutFetch) {
  try {
    yield call(logOut);
    yield put(logOutData());
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: logOutError,
        },
      })
    );

    if (error.message.indexOf("identity.session.not_found") > -1) {
      yield put(userReset());
    }
  }
}

async function logOut() {
  const res = await Auth.signOut();
  return res;
}
