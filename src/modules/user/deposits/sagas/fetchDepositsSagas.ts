import { call, put, select } from "redux-saga/effects";
import BigNumber from "bignumber.js";
import { ApiPromise } from "@polkadot/api";

import { depositsData, DepositsFetch } from "../actions";
import { depositsError } from "..";
import { selectMainAccount } from "../../mainAccount";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { alertPush, InjectedAccount, sendError } from "@polkadex/orderbook-modules";
import {
  selectRangerApi,
  selectRangerIsReady,
} from "@polkadex/orderbook/modules/public/ranger";
import { UNIT_BN } from "@polkadex/web-constants";

export function* fetchDepositsSaga(action: DepositsFetch) {
  try {
    console.log("depsoit saga called");
    const { asset, amount, mainAccount } = action.payload;
    const api = yield select(selectRangerApi);
    const isApiReady = yield select(selectRangerIsReady);
    if (isApiReady && mainAccount.address !== "") {
      yield put(
        alertPush({
          type: "Loading",
          message: {
            title: "Processing Deposit",
            description:
              "Please wait while the deposit is processed and the block is finalized. This may take a few mins.",
          },
        })
      );
      const res = yield call(depositToEnclave, api, mainAccount, asset, amount);
      if (res.isSuccess) {
        yield put(depositsData());
        yield put(
          alertPush({
            type: "Successful",
            message: {
              title: "Deposit Successful",
              description:
                "Congratulations! You have successfully deposited assets to your proxy account.",
            },
          })
        );
      } else {
        throw new Error("Depost failed");
      }
    }
  } catch (error) {
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: depositsError,
        },
      })
    );
  }
}

async function depositToEnclave(
  api: ApiPromise,
  account: InjectedAccount,
  asset: Record<string, string | null>,
  amount: string | number
): Promise<ExtrinsicResult> {
  const { web3FromAddress } = await import("@polkadot/extension-dapp");
  const injector = await web3FromAddress(account.address);
  const amountStr = new BigNumber(amount).multipliedBy(UNIT_BN).toString();
  const ext = api.tx.ocex.deposit(asset, amountStr);
  const res = await signAndSendExtrinsic(api, ext, injector, account.address, true);
  return res;
}
