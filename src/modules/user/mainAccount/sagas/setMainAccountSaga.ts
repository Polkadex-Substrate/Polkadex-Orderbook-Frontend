import { call, put } from "redux-saga/effects";

import {
  setAssociatedAccountsFetch,
  setMainAccountData,
  SetMainAccountFetch,
} from "../actions";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";

export function* setMainAccountSaga({ payload }: SetMainAccountFetch) {
  try {
    const { injector } = yield call(() => fetchUserDataAsync(payload));
    const user = {
      account: payload,
      name: payload.meta.name,
      address: payload.address,
      injector: injector,
    };
    yield put(setMainAccountData({ user }));
    yield put(setAssociatedAccountsFetch());
  } catch (error) {
    yield put(
      sendError({
        error: error,
        processingType: "alert",
        // extraOptions: {
        //   actionError: userError,
        // },
      })
    );
  }
}

async function fetchUserDataAsync(payload: SetMainAccountFetch["payload"]) {
  try {
    const { web3FromAddress } = await import("@polkadot/extension-dapp");
    const injector = await web3FromAddress(payload.address);
    return { injector };
  } catch (error) {
    console.error(error);
    return { injector: null };
  }
}
