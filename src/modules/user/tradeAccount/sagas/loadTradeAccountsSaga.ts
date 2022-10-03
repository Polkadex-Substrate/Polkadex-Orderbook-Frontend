import { call, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { isReady } from "@polkadot/wasm-crypto";

import { sendError } from "../../..";
import { tradeAccountsData, TradeAccountsFetch } from "../actions";

import { TradeAccount } from "@polkadex/orderbook/modules/types";

export function* loadTradeAccountsSaga(_action: TradeAccountsFetch) {
  try {
    // yield call(loadKeyring);
    const allBrowserAccounts: TradeAccount[] = yield call(getAllTradeAccountsInBrowser);
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
  const { cryptoWaitReady } = await import("@polkadot/util-crypto");
  if (!isReady()) await cryptoWaitReady();
}

async function getAllTradeAccountsInBrowser(): Promise<TradeAccount[]> {
  await loadKeyring();
  const allAccounts = keyring.getPairs();
  return allAccounts;
}
