import { put, delay, call, select } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { KeyringPair } from "@polkadot/keyring/types";
import { ApiPromise, Keyring } from "@polkadot/api";
import { mnemonicToMiniSecret, naclKeypairFromSeed } from "@polkadot/util-crypto";

import { sendError, selectMainAccount, selectRangerApi } from "../../../";
import { ConnectPhoneFetch, signUpData, signUpError, SignUpFetch } from "../actions";
import { notificationPush } from "../../notificationHandler";
import { MainAccount } from "../../mainAccount";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";

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
      const res = yield call(() =>
        registerAccount(api, proxyAddress, mainAccount.injector, mainAccount.address)
      );
      if (res.isSuccess) {
        yield put(
          notificationPush({
            type: "Loading",
            message: {
              title: "Your Account has been created",
            },
          })
        );
        yield delay(3000);
        yield put(signUpData());
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
// TODO: Check if registerAccount has been successful
export const registerAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  injector: any,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, injector, mainAddress);
  return res;
};
