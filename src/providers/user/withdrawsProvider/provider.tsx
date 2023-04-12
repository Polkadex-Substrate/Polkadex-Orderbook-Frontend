import { useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";

import { useTrades } from "../trades";
import * as mutations from "../../../graphql/mutations";
import { useProfile } from "../profile";
import { useNativeApi } from "../../public/nativeApi";
import { UserAccount } from "../profile/types";
import { useExtensionWallet } from "../extensionWallet";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState } from "./reducer";

import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { selectTradeAccount, withdrawsReducer } from "@polkadex/orderbook-modules";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { createWithdrawPayload } from "@polkadex/orderbook/helpers/createWithdrawHelpers";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

export const WithdrawsProvider: T.WithdrawsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(withdrawsReducer, initialState);
  const profileState = useProfile();
  const nativeApiState = useNativeApi();
  const settingsState = useSettingsProvider();
  const { selectMainAccount } = useExtensionWallet();
  const currentAccount: UserAccount = profileState.selectedAccount;
  const address = currentAccount.tradeAddress;
  const keyringPair = useReduxSelector(selectTradeAccount(address));
  const { onUserTradesError } = useTrades();

  const onFetchWithdraws = async ({ asset, amount }) => {
    try {
      const nonce = getNonce();
      const api = nativeApiState.api;
      if (address !== "" && keyringPair && api) {
        const payload = createWithdrawPayload(api, asset, amount, nonce);
        const signature = signPayload(api, keyringPair, payload);
        const res = await executeWithdraw([address, payload, signature], address);
        console.info("withdraw res: ", res);
        dispatch(A.withdrawsData());
        settingsState.onHandleNotification({
          type: "SuccessAlert",
          message: {
            title: "Withdraw Successful",
            description: "Your withdraw has been processed.",
          },
          time: new Date().getTime(),
        });
      }
    } catch (error) {
      dispatch(A.withdrawsData());
      settingsState.onHandleError({
        error,
        processingType: "alert",
      });
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

  const onFetchClaimWithdraw = async ({ sid }: A.WithdrawsClaimFetch["payload"]) => {
    try {
      const api = nativeApiState.api;
      const currentAccount: UserAccount = profileState.selectedAccount;
      const { account, signer } = selectMainAccount(currentAccount.mainAddress);
      const isApiReady = nativeApiState.connected;
      if (isApiReady && account?.address !== "") {
        settingsState.onHandleNotification({
          type: "InformationAlert",
          message: {
            title: "Processing Claim Withdraw",
            description:
              "Please wait while the withdraw is processed and the block is finalized. This may take a few mins.",
          },
          time: new Date().getTime(),
        });
        const res = await claimWithdrawal(api, signer, account?.address, sid);
        if (res.isSuccess) {
          dispatch(A.withdrawsClaimData({ sid }));
          // TODO?: Check delay
          // for ux
          setTimeout(() => {
            settingsState.onHandleNotification({
              type: "SuccessAlert",
              message: {
                title: "Claim Withdraw Successful",
                description:
                  "Congratulations! You have successfully withdrawn your assets to your funding account.",
              },
              time: new Date().getTime(),
              hasConfetti: true,
            });

            dispatch(A.withdrawClaimReset());
          }, 3000);
        } else {
          throw new Error("Claim Withdraw failed");
        }
      }
    } catch (error) {
      dispatch(A.withdrawClaimCancel(sid));
      settingsState.onHandleError({
        error,
        processingType: "alert",
      });
      dispatch(A.withdrawsError(error));
    }
  };

  async function claimWithdrawal(
    api: ApiPromise,
    signer: Signer,
    account: string,
    sid: number
  ): Promise<ExtrinsicResult> {
    const ext = api.tx.ocex.claimWithdraw(sid, account);
    return await signAndSendExtrinsic(api, ext, { signer }, account, true);
  }

  const handleClaimWithdraws = (sid: number) => {
    onFetchClaimWithdraw({ sid });
  };

  return (
    <Provider
      value={{
        ...state,
        onFetchWithdraws,
        handleClaimWithdraws,
      }}>
      {children}
    </Provider>
  );
};
