import { call, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import { sendError } from "../../..";
import { tradeAccountsData, InjectedAccount, TradeAccountsFetch } from "../actions";

export function* loadTradeAccountsSaga(action: TradeAccountsFetch) {
  try {
    // yield call(loadKeyring);
    const allBrowserAccounts: InjectedAccount[] = yield call(getAllTradeAccountsInBrowser);
    console.log(allBrowserAccounts);
    // TODO:
    // get all trade accounts from the blockchain and merge them with the browser accounts
    yield put(tradeAccountsData({ allAccounts: allBrowserAccounts }));
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
      })
    );
  }
}

async function loadKeyring() {
  try {
    const { cryptoWaitReady } = await import("@polkadot/util-crypto");
    await cryptoWaitReady();
    keyring.loadAll({ ss58Format: 88, type: "sr25519" });
  } catch (error) {
    console.log(error.message);
  }
}

async function getAllTradeAccountsInBrowser(): Promise<InjectedAccount[]> {
  const allAccounts = keyring.getAccounts();
  return allAccounts.map((account) => {
    return {
      address: account.address,
      meta: account.meta,
      type: account.publicKey,
    };
  });
}
