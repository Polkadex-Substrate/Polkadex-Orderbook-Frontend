import { put, call, select } from "redux-saga/effects";
import { keyring } from "@polkadot/ui-keyring";

import { sendError, selectMainAccount, selectRangerApi, alertPush } from "../../../";
import { signUpData, signUpError, SignUpFetch } from "../actions";
import { MainAccount } from "../../mainAccount";
import { addProxyToAccount, checkIfMainAccountExists, registerAccount } from "../helper";

import { ExtrinsicResult } from "@polkadex/web-helpers";

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
      // check if main account already registered
      const isMainAccountRegistered = yield call(
        checkIfMainAccountExists,
        api,
        mainAccount.address
      );
      let res: ExtrinsicResult;
      // register as a new main account if main account not registered in ocex pallet
      if (!isMainAccountRegistered)
        res = yield call(() =>
          registerAccount(api, proxyAddress, mainAccount.injector, mainAccount.address)
        );
      // add proxy to main account if main account is registered in ocex pallet
      else
        res = yield call(() =>
          addProxyToAccount(api, proxyAddress, mainAccount.injector, mainAccount.address)
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
    if (proxyAddress) {
      keyring.forgetAccount(proxyAddress);
    }
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
