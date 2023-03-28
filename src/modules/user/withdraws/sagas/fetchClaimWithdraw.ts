import { call, delay, put, select } from "redux-saga/effects";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import {
  notificationPush,
  sendError,
  withdrawClaimReset,
  withdrawsClaimData,
  WithdrawsClaimFetch,
  withdrawsError,
  withdrawClaimCancel,
  selectMainAccount,
  UserAccount,
} from "@polkadex/orderbook-modules";
import {
  selectRangerApi,
  selectRangerIsReady,
} from "@polkadex/orderbook/modules/public/ranger";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";

export function* fetchClaimWithdrawSaga(action: WithdrawsClaimFetch) {
  try {
    const profileState = useProfile();
    const { sid } = action.payload;
    const api = yield select(selectRangerApi);
    const currentAccount: UserAccount = profileState.selectedAccount;
    const { account, signer } = yield select(selectMainAccount(currentAccount.mainAddress));
    const isApiReady = yield select(selectRangerIsReady);
    if (isApiReady && account?.address !== "") {
      yield put(
        notificationPush({
          type: "InformationAlert",
          message: {
            title: "Processing Claim Withdraw",
            description:
              "Please wait while the withdraw is processed and the block is finalized. This may take a few mins.",
          },
          time: new Date().getTime(),
        })
      );
      const res = yield call(claimWithdrawal, api, signer, account?.address, sid);
      if (res.isSuccess) {
        yield put(withdrawsClaimData({ sid }));
        // TODO?: Check delay
        yield delay(3000);
        yield put(
          notificationPush({
            type: "SuccessAlert",
            message: {
              title: "Claim Withdraw Successful",
              description:
                "Congratulations! You have successfully withdrawn your assets to your funding account.",
            },
            time: new Date().getTime(),
            hasConfetti: true,
          })
        );
        yield put(withdrawClaimReset());
      } else {
        throw new Error("Claim Withdraw failed");
      }
    }
  } catch (error) {
    yield put(withdrawClaimCancel(action.payload.sid));
    yield put(
      sendError({
        error,
        processingType: "alert",
        extraOptions: {
          actionError: withdrawsError,
        },
      })
    );
  }
}

async function claimWithdrawal(
  api: ApiPromise,
  signer: Signer,
  account: string,
  sid: number
): Promise<ExtrinsicResult> {
  const ext = api.tx.ocex.claimWithdraw(sid, account);
  const res = await signAndSendExtrinsic(api, ext, { signer }, account, true);
  return res;
}
