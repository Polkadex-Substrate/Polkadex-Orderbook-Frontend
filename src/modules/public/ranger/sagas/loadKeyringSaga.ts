import { call, put } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";

import { sendError } from "../../errorHandler";

/* Load all available addresses and accounts */
export function* loadKeyringSaga() {
  try {
    const { cryptoWaitReady } = yield call(() => import("@polkadot/util-crypto"));
    yield call(() => cryptoWaitReady());
    keyring.loadAll({
      ss58Format: 88,
      type: "sr25519",
      isDevelopment: process.env.DEVELOPMENTMODE === "true",
    });
  } catch (error) {
    yield put(
      sendError({
        error: `Init Keyring error: ${error.message}`,
        processingType: "alert",
      })
    );
  }
}
