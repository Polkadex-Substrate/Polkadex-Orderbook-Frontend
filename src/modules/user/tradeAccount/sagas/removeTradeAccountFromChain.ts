import { call, delay, put, select } from "redux-saga/effects";
import keyring from "@polkadot/ui-keyring";
import { ApiPromise } from "@polkadot/api";

import {
  MainAccount,
  selectCurrentMainAccount,
  setAssociatedAccountsFetch,
} from "../../mainAccount";
import {
  registerTradeAccountData,
  registerTradeAccountError,
  RegisterTradeAccountFetch,
  registerTradeAccountReset,
  removeProxyAccountFromChainData,
  RemoveProxyAccountFromChainFetch,
} from "../actions";
import { notificationPush } from "../../notificationHandler";

import { selectRangerApi } from "@polkadex/orderbook/modules/public/ranger";
import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";

export function* removeProxyAccountFromChain(action: RemoveProxyAccountFromChainFetch) {
  try {
    const api = yield select(selectRangerApi);
    const mainAccount: MainAccount = yield select(selectCurrentMainAccount);
    if (!mainAccount?.address) {
      throw new Error("Pleaes select a main account!");
    }
    const { address: tradeAddress } = action.payload;
    if (api && mainAccount.address) {
      // TODO: change to notifications here
      yield put(
        notificationPush({
          type: "LoadingAlert",
          message: {
            title: "Processing your transaction...",
            description:
              "Please sign the transaction and wait for block finalization. This may take a few minutes",
          },
          time: new Date().getTime(),
        })
      );
      const res = yield call(() =>
        removeProxyFromAccount(api, tradeAddress, mainAccount.injector, mainAccount.address)
      );
      // TODO: change to notifications here
      if (res.isSuccess) {
        yield put(
          notificationPush({
            type: "SuccessAlert",
            message: {
              title: "Congratulations!",
              description: "Your trade account has been removed from the chain!",
            },
            time: new Date().getTime(),
          })
        );
        yield put(removeProxyAccountFromChainData());
        keyring.forgetAccount(tradeAddress);
      } else {
        throw new Error(res.message);
      }
    }
  } catch (error) {
    yield put(removeProxyAccountFromChainData());

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

export const removeProxyFromAccount = async (
  api: ApiPromise,
  proxyAddress: string,
  injector: any,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.removeProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, injector, mainAddress, true);
  return res;
};
