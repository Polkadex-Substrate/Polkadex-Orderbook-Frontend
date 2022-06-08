import { debug } from "console";

import { put, delay, call, select } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { ApiPromise } from "@polkadot/api";

import { sendError, selectMainAccount, selectRangerApi, alertPush } from "../../../";
import { signUpData, signUpError, SignUpFetch } from "../actions";
import { notificationPush } from "../../notificationHandler";
import { MainAccount } from "../../mainAccount";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
keyring.setSS58Format(88);

let proxyAddress: string;
export function* signUpSaga(action: SignUpFetch) {
  try {
    const api = yield select(selectRangerApi);
    const mainAccount: MainAccount = yield select(selectMainAccount);
    if (!mainAccount.address) {
      throw new Error("Pleaes select a main account!");
    }
    const { mnemonic, password, accountName } = action.payload;
    const { pair } = keyring.addUri(mnemonic, password, { name: accountName });
    proxyAddress = pair.address;
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
        registerAccount(api, proxyAddress, mainAccount.injector, mainAccount.address)
      );

      if (res.isSuccess) {
        yield put(
          alertPush({
            type: "Successful",
            message: {
              title: "Congratulations!",
              description: "New proxy account registered",
            },
          })
        );
        yield put(signUpData());
      } else {
        throw new Error(res.message);
      }
    }
  } catch (error) {
    proxyAddress && keyring.forgetAddress(proxyAddress);
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
export const registerAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  injector: any,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.registerMainAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, injector, mainAddress, true);
  return res;
};
