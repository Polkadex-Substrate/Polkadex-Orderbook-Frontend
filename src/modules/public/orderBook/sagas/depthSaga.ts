import { call, put } from "redux-saga/effects";

import { sendError } from "../../../";
import { depthData, depthError, DepthFetch } from "../actions";

import { API, RequestOptions } from "@polkadex/orderbook-config";

/*
TODO: convert saga from openware endpoint when we have a dept endpoint available
*/

/*
export function* depthSaga(action: DepthFetch) {
  try {
    const market = action.payload;
    const depth = yield call(API.get(depthOptions), `/public/markets/${market.id}/depth`);
    yield put(depthData(depth));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "console",
        extraOptions: {
          actionError: depthError,
        },
      })
    );
  }
}
*/
