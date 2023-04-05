import { useReducer } from "react";
import BigNumber from "bignumber.js";
import { ApiPromise } from "@polkadot/api";
import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState } from "./reducer";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import * as mutations from "../../../graphql/mutations";

import {
  selectRangerApi,
  selectRangerIsReady,
} from "@polkadex/orderbook/modules/public/ranger/selectors";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { UNIT_BN } from "@polkadex/web-constants";
import { selectTradeAccount, withdrawsReducer } from "@polkadex/orderbook-modules";
import { useProfile } from "../profile";
import { useNativeApi } from "../../public/nativeApi";
import { UserAccount } from "../profile/types";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { createWithdrawPayload } from "@polkadex/orderbook/helpers/createWithdrawHelpers";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";

export const WithdrawsProvider: T.WithdrawsComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(withdrawsReducer, initialState);
  const profileState = useProfile();
  const nativeApiState = useNativeApi();
  const onFetchWithdraws = async (action: A.WithdrawsFetch) => {
    try {
      const { asset, amount } = action.payload;
      const currentAccount: UserAccount = profileState.selectedAccount;
      const address = currentAccount.tradeAddress;
      // const keyringPair = yield select(selectTradeAccount(address));
      const keyringPair = useReduxSelector(selectTradeAccount(address));
      const nonce = getNonce();
      const api = nativeApiState.api;
      if (address !== "" && keyringPair && api) {
        const payload = createWithdrawPayload(api, asset, amount, nonce);
        const signature = signPayload(api, keyringPair, payload);
        const res = await executeWithdraw([address, payload, signature], address);
        console.info("withdraw res: ", res);
        dispatch(A.withdrawsData());
        onNotification("Withdraw Successful, Your withdraw has been processed.");
      }
    } catch (error) {
      dispatch(A.withdrawsData());

      console.error("withdraw error: ", error);
      onError("error");
    }
  };

  const executeWithdraw = async (withdrawPayload, address) => {
    const payload = JSON.stringify({ Withdraw: withdrawPayload });
    return await sendQueryToAppSync({
      query: mutations.withdraw,
      variables: { input: { payload } },
      token: address,
    });
  };

  const onFetchClaimWithdraw = (action: A.WithdrawsClaimFetch) {
    try {
      const { sid } = action.payload;
      const api = nativeApiState.api;
      const currentAccount: UserAccount = profileState.selectedAccount;
      const { account, signer } = yield select(selectMainAccount(currentAccount.mainAddress));
      const isApiReady = nativeApiState.connected;
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

  return (
    <Provider
      value={{
        ...state,
        onFetchWithdraws,
      }}>
      {children}
    </Provider>
  );
};
