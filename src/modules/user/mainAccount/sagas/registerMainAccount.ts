import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import keyring from "@polkadot/ui-keyring";

import { notificationPush, selectExtensionWalletAccounts, selectRangerApi } from "../../..";
import {
  registerMainAccountData,
  registerMainAccountError,
  RegisterMainAccountFetch,
} from "../actions";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { setIsTradeAccountPassworded } from "@polkadex/orderbook/helpers/localStorageHelpers";

let tradeAddr = "";

export function* registerMainAccountSaga(action: RegisterMainAccountFetch) {
  try {
    const { mainAccount, tradeAddress, password } = action.payload;
    tradeAddr = tradeAddress;
    const api = yield select(selectRangerApi);
    yield select(selectExtensionWalletAccounts);
    if (mainAccount.address) {
      yield put(
        notificationPush({
          message: {
            title: "Registering account...",
            description:
              "Please sign the transaction and wait for block finalization. This may take a few minutes",
          },
          type: "LoadingAlert",
          time: new Date().getTime(),
        })
      );
      const res = yield call(() =>
        registerMainAccount(api, tradeAddress, mainAccount.injector, mainAccount.address)
      );
      if (res.isSuccess) {
        yield put(registerMainAccountData());
        setIsTradeAccountPassworded(tradeAddress, password?.length > 0);
      } else {
        keyring.forgetAccount(tradeAddr);
      }
    }
  } catch (error) {
    keyring.forgetAccount(tradeAddr);
    yield put(registerMainAccountError());
    yield put(
      notificationPush({
        message: { title: "Cannot Register Account!", description: error.message },
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
