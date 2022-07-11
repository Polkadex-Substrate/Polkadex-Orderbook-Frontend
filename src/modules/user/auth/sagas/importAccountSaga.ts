import { call, put } from "redux-saga/effects";
import { keyring } from "@polkadot/ui-keyring";
import { API } from "aws-amplify";

import { alertPush, sendError } from "../../../";
import { importAccountError, ImportAccountFetch, importAccountData } from "../actions";
import { getMainAddrFromUserByProxyAccountRes } from "../helpers";

import { findUserByProxyAccount } from "@polkadex/orderbook/graphql/queries";

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
    if (proxyAddress) keyring.forgetAddress(proxyAddress);
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

const checkIfProxyAccountRegistered = async (address: string) => {
  const res: any = await API.graphql({
    query: findUserByProxyAccount,
    variables: { proxy_account: address },
  });
  if (res.data?.findUserByProxyAccount.items.length === 0) {
    throw new Error("This proxy account has not been registered yet!");
  }
  const queryResStr = res.data?.findUserByProxyAccount.items[0];
  const main_addr = getMainAddrFromUserByProxyAccountRes(queryResStr);
  if (!main_addr) {
    throw new Error("This proxy account has not been registered yet!");
  }
};

const checkifProxyAccountDuplicateName = (accountName: string) => {
  const accounts = keyring.getAccounts();
  const account = accounts.find((acc) => acc.meta.name === accountName);
  if (account) {
    throw new Error("This proxy account name is already used!");
  }
};
