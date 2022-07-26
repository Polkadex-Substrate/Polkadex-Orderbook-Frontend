import { call, put } from "redux-saga/effects";
import { keyring } from "@polkadot/ui-keyring";
import axios from "axios";

import { alertPush, sendError } from "../../../";
import { importAccountError, ImportAccountFetch, importAccountData } from "../actions";

let proxyAddress: string;
export function* importAccountSaga(action: ImportAccountFetch) {
  try {
    const { mnemonic, password, accountName } = action.payload;
    const { pair } = keyring.addUri(mnemonic, password, { name: accountName });
    proxyAddress = pair.address;
    yield call(checkIfProxyAccountPresent, proxyAddress);
    yield put(
      alertPush({
        type: "Successful",
        message: {
          title: "Congratulations!",
          description: "Proxy account successfully imported!",
        },
      })
    );
    yield put(importAccountData());
  } catch (error) {
    proxyAddress && keyring.forgetAddress(proxyAddress);
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        extraOptions: {
          actionError: importAccountError,
        },
      })
    );
  }
}

const checkIfProxyAccountPresent = (address: string) => {
  return new Promise((resolve, reject) => {
    axios
      .get(`/api/user/proxy/main_account/${address}`)
      .then((res: any) => {
        if (res.data.data) {
          resolve(res.data.data);
        } else {
          reject(new Error("This proxy account has not been registered yet!"));
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
};
