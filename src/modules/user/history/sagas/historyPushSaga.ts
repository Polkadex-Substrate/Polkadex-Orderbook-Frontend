import { put, select } from "redux-saga/effects";

import { HistoryPush, pushHistoryFinish } from "../actions";
import { selectHistory } from "../selectors";

import { defaultConfig } from "@polkadex/orderbook-config";
import { sliceArray } from "@polkadex/web-helpers";

const { defaultStorageLimit } = defaultConfig;

export function* historyPushSaga(action: HistoryPush) {
  const actualList = yield select(selectHistory);
  const updatedTrades = [...[action.payload], ...actualList];
  const slicedTrades = sliceArray(updatedTrades, defaultStorageLimit);

  yield put(pushHistoryFinish(slicedTrades));
}
