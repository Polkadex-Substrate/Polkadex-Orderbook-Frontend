import { call, put } from "redux-saga/effects";
import { keyring } from "@polkadot/ui-keyring";
import { API } from "aws-amplify";

import { alertPush, sendError } from "../../../";
import { importAccountError, ImportAccountFetch, importAccountData } from "../actions";
import { checkIfProxyAccountRegistered } from "../helpers";

let proxyAddress: string;
export function* importAccountSaga(action: ImportAccountFetch) {
  try {
    const { mnemonic, password, accountName } = action.payload;
    checkifProxyAccountDuplicateName(accountName);
    const { pair } = keyring.addUri(mnemonic, password, { name: accountName });
    proxyAddress = pair.address;
    yield call(checkIfProxyAccountRegistered, proxyAddress);
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
    if (proxyAddress) keyring.forgetAccount(proxyAddress);
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

const checkifProxyAccountDuplicateName = (accountName: string) => {
  const accounts = keyring.getAccounts();
  const account = accounts.find((acc) => acc.meta.name === accountName);
  if (account) {
    throw new Error("This proxy account name is already used!");
  }
};
