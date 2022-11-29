import { put, select } from "redux-saga/effects";

import { selectNewlyAddedTradeAccounts, tradeAccountsFetch } from "../../tradeWallet";
import { registerMainAccountError } from "../actions";

import { sendError, userAccountSelectFetch } from "@polkadex/orderbook-modules";
import { TradeAccount } from "@polkadex/orderbook/modules/types";

export function* registerMainAccountUpdateSaga() {
  try {
    yield put(tradeAccountsFetch());
    const tradeAccount: TradeAccount = yield select(selectNewlyAddedTradeAccounts);
    // make trade account in use 
    if (tradeAccount) {
      yield put(
        userAccountSelectFetch({
          tradeAddress: tradeAccount.address,
        })
      );
    }
  } catch (error) {
    console.log("error:", error);
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        extraOptions: {
          actionError: registerMainAccountError,
        },
      })
    );
  }
}
