import { call, put } from "redux-saga/effects";
import { ApiPromise, WsProvider } from "@polkadot/api";
import keyring from "@polkadot/ui-keyring";

import { sendError } from "../../..";
import { PolkadotWalletFetch, polkadotWalletData, InjectedAccount } from "../actions";
import { types } from "../types";

import { defaultConfig } from "@polkadex/orderbook-config";

const { polkadotJsWs } = defaultConfig;

export function* polkadotWalletSaga(action: PolkadotWalletFetch) {
  try {
    const api = yield call(() => createPolkadotWalletApi());
    const allAccounts: InjectedAccount[] = yield call(getAllPoladotWalletAccounts);
    yield put(polkadotWalletData({ api, allAccounts }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
      })
    );
  }
}
async function createPolkadotWalletApi() {
  // const { ApiPromise, WsProvider } =await import('@polkadot/api');
  const wsProvider = new WsProvider(polkadotJsWs);
  const api = await ApiPromise.create({ provider: wsProvider, types });
  return api;
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
