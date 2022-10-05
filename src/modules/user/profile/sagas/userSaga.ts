import { select } from "redux-saga/effects";

import { selectUserAuthEmail, UserFetch } from "@polkadex/orderbook-modules";

export function* userSelectAccountSaga(_action: UserFetch) {
  const email = yield select(selectUserAuthEmail);
  // TODO: all linked main accounts for the user
  // TODO: fetch all linked trade accounts from main accounts
  // TODO: push data to reducer
}
