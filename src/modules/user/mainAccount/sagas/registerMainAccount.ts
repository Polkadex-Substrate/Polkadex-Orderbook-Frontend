import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import keyring from "@polkadot/ui-keyring";

import { notificationPush, selectRangerApi, sendError } from "../../..";
import { registerMainAccountData, RegisterMainAccountFetch } from "../actions";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";

let tradeAddr = "";
export function* registerMainAccountSaga(action: RegisterMainAccountFetch) {
  try {
    const { mainAccount, tradeAddress } = action.payload;
    tradeAddr = tradeAddress;
    const api = yield select(selectRangerApi);
    if (mainAccount.address) {
      yield put(
        notificationPush({
          message: { title: "Registering account..." },
          type: "InformationAlert",
          time: new Date().getTime(),
        })
      );
      const res = yield call(() =>
        registerMainAccount(api, tradeAddress, mainAccount.injector, mainAccount.address)
      );
      if (res.isSuccess) {
        yield put(
          notificationPush({
            message: { title: "Successfully Registered" },
            type: "SuccessAlert",
            time: new Date().getTime(),
          })
        );
        yield put(registerMainAccountData());
      }
    }
  } catch (error) {
    keyring.forgetAccount(tradeAddr);
    yield put(
      notificationPush({
        message: { title: "Cannot Register Account !", description: error.message },
        type: "ErrorAlert",
        time: new Date().getTime(),
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
