import { put } from "redux-saga/effects";

import { sendError } from "../../../";
import { recentTradesError, RecentTradesFetch } from "../actions";

export function* recentTradesFetchSaga(action: RecentTradesFetch) {
  try {
    const market = action.payload;
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "console",
        extraOptions: {
          actionError: recentTradesError,
        },
      })
    );
  }
}
