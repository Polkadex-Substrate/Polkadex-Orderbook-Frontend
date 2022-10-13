import { delay, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import {
  importTradeAccountData,
  notificationPush,
  removeTradeAccountFromBrowser,
  tradeAccountPush,
  registerTradeAccountData,
  ImportTradeAccountFetch,
} from "@polkadex/orderbook-modules";

let tradeAddress = "";

export function* importTradeAccountFetchSaga(action: ImportTradeAccountFetch) {
  const { mnemonic, name, password } = action.payload;
  console.log(mnemonic, name, password);
  try {
    const { pair } = keyring.addUri(mnemonic, password?.length > 0 ? password : null, {
      name: name,
    });
    tradeAddress = pair?.address;
    yield put(tradeAccountPush({ pair }));
    yield delay(2000);
    yield put(
      registerTradeAccountData({
        mnemonic,
        account: {
          name,
          address: tradeAddress,
        },
      })
    );
    yield put(importTradeAccountData());
  } catch (error) {
    if (tradeAddress?.length)
      yield put(removeTradeAccountFromBrowser({ address: tradeAddress }));
    yield put(
      notificationPush({
        type: "ErrorAlert",
        message: {
          title: "Cannot import account",
          description: "Please check your mnemonic",
        },
        time: new Date().getTime(),
      })
    );
  }
}
