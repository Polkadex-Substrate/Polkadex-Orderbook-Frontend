import { call, put, select } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { ApiPromise } from "@polkadot/api";

import { MainAccount, selectCurrentMainAccount } from "../../mainAccount";
import {
  registerTradeAccountData,
  registerTradeAccountError,
  RegisterTradeAccountFetch,
} from "../actions";

import { selectRangerApi } from "@polkadex/orderbook/modules/public/ranger";
import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { alertPush } from "@polkadex/orderbook/modules/public/alertHandler";

let tradeAddress: string;
export function* registerTradeAccountSaga(action: RegisterTradeAccountFetch) {
  try {
    const api = yield select(selectRangerApi);
    const mainAccount: MainAccount = yield select(selectCurrentMainAccount);
    if (!mainAccount.address) {
      throw new Error("Pleaes select a main account!");
    }
    const { mnemonic, password, name } = action.payload;
    const { pair } = keyring.addUri(mnemonic, password, { name: name });
    tradeAddress = pair.address;
    if (api && mainAccount.address) {
      // TODO: change to notifications here
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
        addProxyToAccount(api, tradeAddress, mainAccount.injector, mainAccount.address)
      );
      // TODO: change to notifications here
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
        yield put(registerTradeAccountData());
      } else {
        throw new Error(res.message);
      }
    }
  } catch (error) {
    if (tradeAddress) {
      keyring.forgetAccount(tradeAddress);
    }
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: registerTradeAccountError,
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
