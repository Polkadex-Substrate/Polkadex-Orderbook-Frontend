import { call, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import { sendError } from "../../..";
import { polkadotWalletData, InjectedAccount } from "../actions";

export function* polkadotWalletSaga() {
  try {
    const allAccounts: InjectedAccount[] = yield call(getAllPoladotWalletAccounts);
    yield put(polkadotWalletData({ allAccounts }));
    yield call(initKeyring);
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
      })
    );
  }
}
async function initKeyring() {
  const { cryptoWaitReady } = await import("@polkadot/util-crypto");
  await cryptoWaitReady();
  keyring.loadAll({ type: "sr25519" });
  throw new Error("Init Keyring Error");
}

async function getAllPoladotWalletAccounts(): Promise<InjectedAccount[]> {
  const allAccounts = keyring.getAccounts() || [];
  return allAccounts.map((account) => {
    return {
      address: account.address,
      meta: account.meta,
      type: account.publicKey,
    };
  });
}
