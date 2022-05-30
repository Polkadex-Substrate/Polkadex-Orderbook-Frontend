import { put, delay, call, select } from "redux-saga/effects";
import { ApiPromise, Keyring } from "@polkadot/api";

import { sendError, selectMainAccount, selectRangerApi, alertPush } from "../../../";
import { ConnectPhoneFetch, signUpData, signUpError } from "../actions";
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
      yield put(
        alertPush({
          type: "Loading",
          message: {
            title: "Processing you transaction...",
            description:
              "Please sign the transaction and wait for block finalization, this may take a minute",
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
                "New proxy account Registered, Please scan the QR code using polkadex app",
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
export const addProxyToAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  injector: any,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.addProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, injector, mainAddress, true);
  return res;
};
