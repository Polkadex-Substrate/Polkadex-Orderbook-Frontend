import { call, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import { sendError } from "../../..";
import { PolkadotWalletFetch, polkadotWalletData, InjectedAccount } from "../actions";
import { types } from "../types";

import { defaultConfig } from "@polkadex/orderbook-config";

const { polkadotJsWs } = defaultConfig;

export function* polkadotWalletSaga(action: PolkadotWalletFetch) {
  try {
    const allAccounts: InjectedAccount[] = yield call(getAllPoladotWalletAccounts);
    console.log({ allAccounts });
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
  const { cryptoWaitReady } = await import("@polkadot/util-crypto");
  await cryptoWaitReady();
  keyring.loadAll({ type: "sr25519" });
  const allAccounts = keyring.getAccounts();
  return allAccounts.map((account) => {
    return {
      address: account.address,
      meta: account.meta,
      type: account.publicKey,
    };
  });
}
