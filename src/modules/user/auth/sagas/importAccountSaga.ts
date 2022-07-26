import { put, delay, call, select } from "redux-saga/effects";
import { Keyring } from "@polkadot/api";

import {
  sendError,
  selectMainAccount,
  selectRangerApi,
  connectPhoneData,
  alertPush,
} from "../../../";
import { ConnectPhoneFetch, signUpError } from "../actions";
import { MainAccount } from "../../mainAccount";
import { addProxyToAccount } from "../helper";

export function* connectPhoneSaga(action: ConnectPhoneFetch) {
  try {
    const api = yield select(selectRangerApi);
    const mainAccount: MainAccount = yield select(selectMainAccount);
    const { mnemonic } = action.payload;
    const keyring = new Keyring();
    keyring.setSS58Format(88);
    const pair = keyring.createFromUri(mnemonic);
    const proxyAddress = pair.address;
    if (api && mainAccount.address) {
      yield put(
        alertPush({
          type: "Loading",
          message: {
            title: "Processing your transaction...",
            description:
              "Please sign the transaction and wait for block finalization. This may take a few minutes",
          },
        })
      );
      const res = yield call(() =>
        addProxyToAccount(api, proxyAddress, mainAccount.injector, mainAccount.address)
      );
      if (res.isSuccess) {
        yield put(
          alertPush({
            type: "Successful",
            message: {
              title: "Congratulations!",
              description:
                "New proxy account registered, please scan the QR code using polkadex app",
            },
          })
        );
        yield delay(3000);
        yield put(connectPhoneData());
      } else {
        throw new Error(res.message);
      }
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: signUpError,
        },
      })
    );
  }
}
