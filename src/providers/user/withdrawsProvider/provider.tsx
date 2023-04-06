import { useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState } from "./reducer";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import * as mutations from "../../../graphql/mutations";
import { Signer } from "@polkadot/types/types";

import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { selectTradeAccount, withdrawsReducer } from "@polkadex/orderbook-modules";
import { useProfile } from "../profile";
import { useNativeApi } from "../../public/nativeApi";
import { UserAccount } from "../profile/types";
import { getNonce } from "@polkadex/orderbook/helpers/getNonce";
import { createWithdrawPayload } from "@polkadex/orderbook/helpers/createWithdrawHelpers";
import { signPayload } from "@polkadex/orderbook/helpers/enclavePayloadSigner";
import { sendQueryToAppSync } from "@polkadex/orderbook/helpers/appsync";
import { useExtensionWallet } from "../extensionWallet";

export const WithdrawsProvider: T.WithdrawsComponent = ({
  onError,
  onNotification,
  children,
}) => {
  const [state, dispatch] = useReducer(withdrawsReducer, initialState);
  const profileState = useProfile();
  const nativeApiState = useNativeApi();
  const { selectMainAccount } = useExtensionWallet();
  const currentAccount: UserAccount = profileState.selectedAccount;
  const address = currentAccount.tradeAddress;
  const keyringPair = useReduxSelector(selectTradeAccount(address));

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
        onNotification("Withdraw Successful, Your withdraw has been processed.");
      }
    } catch (error) {
      dispatch(A.withdrawsData());
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

  const onFetchClaimWithdraw = async ({ sid }: A.WithdrawsClaimFetch["payload"]) => {
    try {
      const api = nativeApiState.api;
      const currentAccount: UserAccount = profileState.selectedAccount;
      const { account, signer } = selectMainAccount(currentAccount.mainAddress);
      const isApiReady = nativeApiState.connected;
      if (isApiReady && account?.address !== "") {
        onNotification(
          "...Please wait while the withdraw is processing and until the block is finalized... this may take a few mins"
        );
        const res = await claimWithdrawal(api, signer, account?.address, sid);
        if (res.isSuccess) {
          dispatch(A.withdrawsClaimData({ sid }));
          // TODO?: Check delay
          // for ux
          setTimeout(() => {
            onNotification(
              "Claim Withdraw Successful-----Congratulations! You have successfully withdrawn your assets to your funding account."
            );
            dispatch(A.withdrawClaimReset());
          }, 3000);
        } else {
          throw new Error("Claim Withdraw failed");
        }
      }
    } catch (error) {
      dispatch(A.withdrawClaimCancel(sid));
      onError("Error in withdrawal");
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
