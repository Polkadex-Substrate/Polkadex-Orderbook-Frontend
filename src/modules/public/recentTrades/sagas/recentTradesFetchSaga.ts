import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { recentTradesData, recentTradesError, RecentTradesFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";



export function* recentTradesFetchSaga(action: RecentTradesFetch) {
  try {
    const market = action.payload;
    if (!market.id) {
      throw new Error(`ERROR: Empty market provided to recentTradesFetchSaga`);
    }
    // TODO: Replace with polkadex endpoint when available
    // yield put(recentTradesData(trades));
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
