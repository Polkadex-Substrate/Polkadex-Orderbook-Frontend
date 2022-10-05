import { put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import {
  ImportTradeAccount,
  notificationPush,
  removeTradeAccountFromBrowser,
  tradeAccountPush,
} from "@polkadex/orderbook-modules";

let tradeAddress = "";

export function* importTradeAccountFetchSaga(action: ImportTradeAccount) {
  const { mnemonic, name, password } = action.payload;
  try {
    const { pair } = keyring.addUri(mnemonic, password?.length > 0 ? password : null, {
      name: name,
    });
    tradeAddress = pair.address;
    yield put(tradeAccountPush({ pair }));
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
