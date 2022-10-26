import { Auth } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import { notificationPush, sendError, userAuthFetch, userReset } from "../../../";
import { logOutData, logOutError } from "../actions";

export function* logoutSaga() {
  try {
    yield call(() => Auth.signOut());
    yield put(logOutData());
    yield put(
      notificationPush({
        type: "SuccessAlert",
        message: {
          title: "Logged out",
          description: "You have been logged out.",
        },
        time: new Date().getTime(),
      })
    );
    yield put(userReset());
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
      yield put(userAuthFetch());
    }
  }
}
