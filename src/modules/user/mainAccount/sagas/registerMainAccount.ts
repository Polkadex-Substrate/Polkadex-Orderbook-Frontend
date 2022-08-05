import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";

import { selectRangerApi, sendError } from "../../..";
import { registerMainAccountData, RegisterMainAccountFetch } from "../actions";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";

export function* registerMainAccountSaga(action: RegisterMainAccountFetch) {
  try {
    const { mainAccount, tradeAddress } = action.payload;
    const api = yield select(selectRangerApi);
    if (mainAccount.address) {
      const res = yield call(() =>
        registerMainAccount(api, tradeAddress, mainAccount.injector, mainAccount.address)
      );
      yield put(registerMainAccountData());
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
      })
    );
  }
}

export const registerMainAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  injector: any,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, injector, mainAddress, true);
  return res;
};
