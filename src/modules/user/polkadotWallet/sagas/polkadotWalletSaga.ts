import { call, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import { sendError } from "../../..";
import { polkadotWalletData, InjectedAccount } from "../actions";

export function* polkadotWalletSaga() {
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
    keyring.loadAll({ type: "sr25519" });
    const allAccounts = keyring.getAccounts();
    console.log(allAccounts);

    // Check if Alice account already exists other wise add it to the keyring
    // Just for testing purpose
    const isAlice = allAccounts.find(
      (account) => account.address === "5GrwvaEF5zXb26Fz9rcQpDWS57CtERHpNehXCPcNoHGKutQY"
    );
    if (!isAlice) {
      keyring.addUri("//Alice", "0000", { name: "Alice default" });
    }

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
