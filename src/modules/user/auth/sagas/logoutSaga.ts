import { put } from "redux-saga/effects";

import { sendError } from "../../../";
import { userReset } from "../../profile";
import { logoutError, LogoutFetch } from "../actions";

export function* logoutSaga(action: LogoutFetch) {
  try {
    yield put(userReset());
    process.browser && localStorage.removeItem("csrfToken");
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: logoutError,
        },
      })
    );

    if (error.message.indexOf("identity.session.not_found") > -1) {
      yield put(userReset());
    }
  }
}
