import { call, put, select } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import FileSaver from "file-saver";
import { KeyringPair } from "@polkadot/keyring/types";

import { transformAddress } from "@polkadex/orderbook/providers/user/profile/helpers";
import {
  notificationPush,
  selectTradeAccount,
  exportTradeAccountData,
  ExportTradeAccountFetch,
} from "@polkadex/orderbook-modules";

export function* exportTradeAccountFetchSaga(action: ExportTradeAccountFetch) {
  const { address, password = "" } = action.payload;
  const selectedAccount: KeyringPair = yield select(selectTradeAccount(address));
  try {
    const pairToJson = keyring.backupAccount(selectedAccount, password);
    selectedAccount.lock();

    const blob = new Blob([JSON.stringify(pairToJson)], { type: "text/plain;charset=utf-8" });
    FileSaver.saveAs(
      blob,
      `${selectedAccount?.meta?.name}-${transformAddress(selectedAccount?.address)}.json`
    );
  } catch (error) {
    yield put(
      notificationPush({
        type: "ErrorAlert",
        message: {
          title: "Cannot export this account",
          description: "Incorrect Password",
        },
        time: new Date().getTime(),
      })
    );
  } finally {
    yield put(exportTradeAccountData());
  }
}
