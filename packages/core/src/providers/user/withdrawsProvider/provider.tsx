import { useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";

import { useTrades } from "../trades";
import { useProfile, UserAccount } from "../profile";
import { useExtensionWallet } from "../extensionWallet";
import { selectTradeAccount } from "../tradeWallet/helper";
import { useTradeWallet } from "../tradeWallet";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState, withdrawsReducer } from "./reducer";

import * as mutations from "@/graphql/mutations";
import { useNativeApi } from "@/providers/public//nativeApi";
import { useSettingsProvider } from "@/providers/public/settings";
import {
  createWithdrawSigningPayload,
  ExtrinsicResult,
  signAndSendExtrinsic,
  getNonce,
  sendQueryToAppSync,
  signPayload,
} from "@/helpers";

export const WithdrawsProvider: T.WithdrawsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(withdrawsReducer, initialState);
  const profileState = useProfile();
  const nativeApiState = useNativeApi();
  const settingsState = useSettingsProvider();
  const { selectMainAccount } = useExtensionWallet();
  const currentAccount: UserAccount = profileState.selectedAccount;
  const { mainAddress, tradeAddress } = currentAccount;
  const { allBrowserAccounts } = useTradeWallet();
  const keyringPair = selectTradeAccount(tradeAddress, allBrowserAccounts);
  const { onUserTradesError } = useTrades();

  const onFetchWithdraws = async ({ asset, amount }) => {
    dispatch(A.withdrawsFetch({ asset, amount }));
    try {
      const nonce = getNonce();
      const api = nativeApiState.api;
      if (tradeAddress !== "" && keyringPair && api) {
        const payload = { asset_id: { asset }, amount, timestamp: nonce };
        const signingPayload = createWithdrawSigningPayload(
          api,
          asset,
          amount,
          nonce,
        );
        const signature = signPayload(api, keyringPair, signingPayload);
        const res = await executeWithdraw(
          [mainAddress, tradeAddress, payload, signature],
          tradeAddress,
        );
        console.info("withdraw res: ", res);
        dispatch(A.withdrawsData());
        settingsState.onHandleNotification({
          type: "Success",
          message:
            "Your withdrawal is being processed and will be available for you to claim in a few minutes",
        });
      }
    } catch (error) {
      dispatch(A.withdrawsData());
      settingsState.onHandleError(error?.message ?? error);
      onUserTradesError(error);
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

  const onFetchClaimWithdraw = async ({
    sid,
  }: A.WithdrawsClaimFetch["payload"]) => {
    try {
      const api = nativeApiState.api;
      const currentAccount: UserAccount = profileState.selectedAccount;
      const { account, signer } = selectMainAccount(currentAccount.mainAddress);
      const isApiReady = nativeApiState.connected;
      if (isApiReady && account?.address !== "") {
        // TODO: Move this toast as callback to signAndSendExtrinsic,
        settingsState.onHandleNotification({
          type: "Information",
          message:
            "Processing Claim Withdraw, please wait while the withdraw is processed and the block is finalized. This may take a few mins.",
        });
        dispatch(A.withdrawsClaimFetch({ sid }));

        const res = await claimWithdrawal(api, signer, account?.address, sid);
        if (res.isSuccess) {
          dispatch(A.withdrawsClaimData({ sid }));
          // TODO?: Check delay
          // for ux
          setTimeout(() => {
            settingsState.onHandleNotification({
              type: "Success",
              message:
                "Congratulations! You have successfully withdrawn your assets to your funding account.",
            });

            dispatch(A.withdrawClaimReset());
          }, 3000);
        } else {
          throw new Error("Claim Withdraw failed");
        }
      }
    } catch (error) {
      dispatch(A.withdrawClaimCancel(sid));
      settingsState.onHandleError(error?.message ?? error);
      dispatch(A.withdrawsError(error));
    }
  };

  async function claimWithdrawal(
    api: ApiPromise,
    signer: Signer,
    account: string,
    sid: number,
  ): Promise<ExtrinsicResult> {
    const ext = api.tx.ocex.claimWithdraw(sid, account);
    return await signAndSendExtrinsic(api, ext, { signer }, account, true);
  }

  return (
    <Provider
      value={{
        ...state,
        onFetchWithdraws,
        onFetchClaimWithdraw,
      }}
    >
      {children}
    </Provider>
  );
};
