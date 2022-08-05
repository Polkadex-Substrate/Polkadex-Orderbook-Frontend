import { call, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { API } from "aws-amplify";

import { sendError } from "../../..";
import { tradeAccountsData, InjectedAccount } from "../actions";
import * as queries from "../../../../graphql/queries";

export function* loadProxyAccountsSaga() {
  try {
    const allBrowserAccounts: InjectedAccount[] = yield call(getAllTradeAccountsInBrowser);
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

async function getAllTradeAccountsInBrowser(): Promise<InjectedAccount[]> {
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
