import { put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import {
  ImportTradeAccount,
  importTradeAccountData,
  notificationPush,
} from "@polkadex/orderbook-modules";

export function* importTradeAccountFetchSaga(action: ImportTradeAccount) {
  const { mnemonic, name, password } = action.payload;
  try {
    const { pair } = keyring.addUri(mnemonic, password?.length > 0 ? password : null, {
      name: name,
    });
    yield put(importTradeAccountData({ pair }));
    yield put(
      notificationPush({
        type: "SuccessAlert",
        message: {
          title: "Congratulations!",
          description: "Your trade account has been imported!",
        },
        time: new Date().getTime(),
      })
    );
  } catch (error) {
    console.log(error);
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
