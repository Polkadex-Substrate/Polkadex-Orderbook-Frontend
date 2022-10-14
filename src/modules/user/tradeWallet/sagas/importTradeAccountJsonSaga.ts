import { put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import {
  importTradeAccountData,
  tradeAccountPush,
  registerTradeAccountData,
  ImportTradeAccountJsonFetch,
  removeTradeAccountFromBrowser,
  notificationPush,
  registerTradeAccountError,
} from "@polkadex/orderbook-modules";

let tradeAddress = "";

export function* importTradeAccountJsonSaga(action: ImportTradeAccountJsonFetch) {
  const { file, name } = action.payload;
  try {
    const modifiedFile = file;
    if (name?.length) modifiedFile.meta.name = name;
    const pair = keyring.keyring.addFromJson(modifiedFile);
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
  } catch (error) {
    if (tradeAddress?.length)
      yield put(removeTradeAccountFromBrowser({ address: tradeAddress }));
    yield put(registerTradeAccountError(error));
    yield put(
      notificationPush({
        type: "ErrorAlert",
        message: {
          title: "Cannot import account",
          description: "Please check your json file",
        },
        time: new Date().getTime(),
      })
    );
  }
}
