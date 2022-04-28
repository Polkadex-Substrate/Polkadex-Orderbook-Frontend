import { call, put, select } from "redux-saga/effects";

import { setMainAccountData, SetMainAccountFetch } from "../actions";

import { selectRangerApi } from "@polkadex/orderbook/modules/public/ranger";
import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";

export function* setMainAccountSaga({ payload }: SetMainAccountFetch) {
  try {
    const api = yield select(selectRangerApi);
    if (api) {
      const { injector } = yield call(() => fetchUserDataAsync(payload));
      const user = {
        account: payload,
        name: payload.meta.name,
        address: payload.address,
        injector: injector,
      };
      yield put(setMainAccountData(user));
    }
  } catch (error) {
    yield put(
      sendError({
        error: error.message,
        processingType: "alert",
        // extraOptions: {
        //   actionError: userError,
        // },
      })
    );
  }
}

async function fetchUserDataAsync(payload: SetMainAccountFetch["payload"]) {
  const { web3FromAddress } = await import("@polkadot/extension-dapp");
  const injector = await web3FromAddress(payload.address);

  return { injector };
}
