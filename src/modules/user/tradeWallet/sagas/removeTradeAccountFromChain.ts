import { call, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";

import {
  previewAccountModalCancel,
  registerTradeAccountError,
  removeProxyAccountFromChainData,
  RemoveProxyAccountFromChainFetch,
  removeTradeAccountFromBrowser,
} from "../actions";
import { notificationPush } from "../../notificationHandler";

import { sendError } from "@polkadex/orderbook/modules/public/errorHandler";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { selectMainAccount, userProfileTradeAccountDelete } from "@polkadex/orderbook-modules";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";

export function* removeProxyAccountFromChainSaga(action: RemoveProxyAccountFromChainFetch) {
  try {
    const profileState = useProfile();
    const nativeApiState = useNativeApi();
    const api: ApiPromise = nativeApiState.api;
    const { address: tradeAddress } = action.payload;
    const linkedMainAddress =
      tradeAddress &&
      profileState.userData?.userAccounts?.find(
        ({ tradeAddress }) => tradeAddress === tradeAddress
      )?.mainAddress;

    if (!linkedMainAddress) {
      throw new Error("Invalid trade address.");
    }
    const { account, signer } = yield select(selectMainAccount(linkedMainAddress));
    if (!account?.address) {
      throw new Error("Please select a funding account!");
    }
    if (api.isConnected && account?.address) {
      const res = yield call(() =>
        removeProxyFromAccount(api, tradeAddress, signer, account.address)
      );
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
        yield put(previewAccountModalCancel());
        yield put(removeProxyAccountFromChainData({ address: action.payload.address }));
        yield put(removeTradeAccountFromBrowser({ address: tradeAddress }));
        yield put(userProfileTradeAccountDelete(tradeAddress));
      } else {
        throw new Error(res.message);
      }
    }
  } catch (error) {
    yield put(removeProxyAccountFromChainData({ address: action.payload.address }));
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
  signer: Signer,
  mainAddress: string
): Promise<ExtrinsicResult> => {
  const ext = api.tx.ocex.removeProxyAccount(proxyAddress);
  const res = await signAndSendExtrinsic(api, ext, { signer }, mainAddress, true);
  return res;
};
