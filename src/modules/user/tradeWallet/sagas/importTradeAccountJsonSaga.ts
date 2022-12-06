import { put } from "redux-saga/effects";
import { keyring } from "@polkadot/ui-keyring";

import {
  importTradeAccountData,
  tradeAccountPush,
  registerTradeAccountData,
  ImportTradeAccountJsonFetch,
  removeTradeAccountFromBrowser,
  notificationPush,
  registerTradeAccountError,
  userAccountSelectFetch,
} from "@polkadex/orderbook-modules";

let tradeAddress = "";

export function* importTradeAccountJsonSaga(action: ImportTradeAccountJsonFetch) {
  const { file, password } = action.payload;
  try {
    const modifiedFile = file;
    const pair = keyring.restoreAccount(modifiedFile, password);
    tradeAddress = pair?.address;
    yield put(tradeAccountPush({ pair }));
    yield put(
      registerTradeAccountData({
        account: {
          name: String(pair.meta?.name),
          address: tradeAddress,
        },
      })
    );
    yield put(importTradeAccountData());
    // automatically set as in use.
    yield put(
      userAccountSelectFetch({
        tradeAddress,
      })
    );
  } catch (error) {
    if (tradeAddress?.length)
      yield put(removeTradeAccountFromBrowser({ address: tradeAddress }));
    yield put(registerTradeAccountError(error));
    yield put(
      notificationPush({
        type: "ErrorAlert",
        message: {
          title: "Cannot import account",
          description: "Invalid password or file",
        },
        time: new Date().getTime(),
      })
    );
  }
}
