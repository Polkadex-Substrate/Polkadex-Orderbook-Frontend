import { put } from "redux-saga/effects";

import { sendError } from "../../../";
import { currenciesError } from "../actions";

// TODO: UPDATE WHEN DATA IS READY
export function* currenciesFetchSaga() {
  try {
    return;
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: currenciesError,
        },
      })
    );
  }
}
