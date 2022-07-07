import { call, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import { sendError } from "../../..";
import { polkadotWalletData, InjectedAccount } from "../actions";

export function* loadProxyAccountsSaga() {
  try {
    const allAccounts: InjectedAccount[] = yield call(getAllPoladotWalletAccounts);
    yield put(polkadotWalletData({ allAccounts }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
      })
    );
  }
}

async function getAllPoladotWalletAccounts(): Promise<InjectedAccount[]> {
  try {
    const { cryptoWaitReady } = await import("@polkadot/util-crypto");
    await cryptoWaitReady();
    keyring.loadAll({ ss58Format: 88, type: "sr25519" });
    const allAccounts = keyring.getAccounts();
    return allAccounts.map((account) => {
      return {
        address: account.address,
        meta: account.meta,
        type: account.publicKey,
      };
    });
  } catch (error) {
    console.log(error.message);
  }
}
