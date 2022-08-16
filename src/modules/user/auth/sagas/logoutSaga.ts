import { Auth } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import { notificationPush, sendError } from "../../../";
import { userData, userFetch } from "../../profile";
import { logOutData, logOutError, LogoutFetch } from "../actions";

export function* logoutSaga(action: LogoutFetch) {
  try {
    yield call(logOut);
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
    yield put(
      userData({ email: "", isConfirmed: true, isAuthenticated: false, userExists: true })
    );
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
      yield put(userFetch());
    }
  }
}

async function logOut() {
  const res = await Auth.signOut();
  return res;
}
