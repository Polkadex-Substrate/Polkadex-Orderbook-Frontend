import { API } from "aws-amplify";
import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { recentTradesData, recentTradesError, RecentTradesFetch } from "../actions";
import * as queries from "../../../../graphql/queries";

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
