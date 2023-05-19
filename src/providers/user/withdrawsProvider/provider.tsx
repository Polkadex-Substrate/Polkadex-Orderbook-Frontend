import { useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";

import { useTrades } from "../trades";
import * as mutations from "../../../graphql/mutations";
import { useProfile } from "../profile";
import { useNativeApi } from "../../public/nativeApi";
import { UserAccount } from "../profile/types";
import { useExtensionWallet } from "../extensionWallet";
import { selectTradeAccount } from "../tradeWallet/helper";
import { useTradeWallet } from "../tradeWallet";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState, withdrawsReducer } from "./reducer";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
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
  const { allBrowserAccounts } = useTradeWallet();
  const keyringPair = selectTradeAccount(address, allBrowserAccounts);
  const { onUserTradesError } = useTrades();

  const onFetchWithdraws = async ({ asset, amount }) => {
    dispatch(A.withdrawsFetch({ asset, amount }));
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

  const onFetchClaimWithdraw = async ({ sid }: A.WithdrawsClaimFetch["payload"]) => {
    try {
      const api = nativeApiState.api;
      const currentAccount: UserAccount = profileState.selectedAccount;
      const { account, signer } = selectMainAccount(currentAccount.mainAddress);
      const isApiReady = nativeApiState.connected;
      if (isApiReady && account?.address !== "") {
        // TODO: Move this toast as callback to signAndSendExtrinsic,
        settingsState.onHandleNotification({
          type: "Info",
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
    sid: number
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
      }}>
      {children}
    </Provider>
  );
};
