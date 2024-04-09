import { useCallback, useReducer } from "react";
import { ApiPromise } from "@polkadot/api";
import { Signer } from "@polkadot/types/types";
import * as mutations from "@orderbook/core/graphql/mutations";
import { useNativeApi } from "@orderbook/core/providers/public//nativeApi";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import {
  createWithdrawSigningPayload,
  ExtrinsicResult,
  signAndSendExtrinsic,
  getNonce,
  sendQueryToAppSync,
  signPayload,
  SignatureEnumSr25519,
} from "@orderbook/core/helpers";
import { useFunds } from "@orderbook/core/hooks";
import {
  useUserAccounts,
  useTransactionManager,
} from "@polkadex/react-providers";

import { useProfile } from "../profile";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { initialState, withdrawsReducer } from "./reducer";

export const WithdrawsProvider: T.WithdrawsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(withdrawsReducer, initialState);
  const { onChangeChainBalance } = useFunds();
  const { selectedAddresses } = useProfile();
  const nativeApiState = useNativeApi();
  const settingsState = useSettingsProvider();
  const { mainAddress, tradeAddress } = selectedAddresses;
  const { wallet } = useUserAccounts();
  const { addToTxQueue } = useTransactionManager();
  type UserActionLambdaResp = {
    is_success: boolean;
    body: string;
  };

  const executeWithdraw = useCallback(
    async (
      withdrawPayload: [string, string, object, SignatureEnumSr25519],
      address: string
    ) => {
      const payload = JSON.stringify({ Withdraw: withdrawPayload });
      return await sendQueryToAppSync({
        query: mutations.withdraw,
        variables: { input: { payload } },
        token: address,
      });
    },
    []
  );

  const onFetchWithdraws = useCallback(
    async ({ asset, amount }: A.WithdrawsFetch["payload"]) => {
      dispatch(A.withdrawsFetch({ asset, amount }));
      try {
        const keyringPair = wallet.getPair(tradeAddress);
        const nonce = getNonce();
        const api = nativeApiState.api;

        // TODO: Handle error or fix types
        if (tradeAddress !== "" && keyringPair && api) {
          const payload = { asset_id: { asset }, amount, timestamp: nonce };
          const signingPayload = createWithdrawSigningPayload(
            api,
            asset,
            amount,
            nonce
          );
          const signature = signPayload(api, keyringPair, signingPayload);
          const res = await executeWithdraw(
            [mainAddress, tradeAddress, payload, signature],
            tradeAddress
          );
          if (res.data.withdraw) {
            const resp: UserActionLambdaResp = JSON.parse(res.data.withdraw);
            if (!resp.is_success) {
              dispatch(A.withdrawsData());
              settingsState.onHandleError(resp.body);
              return;
            }
          }
          dispatch(A.withdrawsData());
          settingsState.onHandleAlert(
            "Your withdrawal is being processed and will be available for you to claim in a few minutes"
          );
        }
      } catch (error) {
        const errorText = (error as Error).message || (error as string);
        dispatch(A.withdrawsData());
        settingsState.onHandleError(errorText);
      }
    },
    [
      executeWithdraw,
      mainAddress,
      nativeApiState?.api,
      settingsState,
      tradeAddress,
      wallet,
    ]
  );

  const onFetchClaimWithdraw = async ({
    selectedWallet,
    sid,
    assetIds = [],
    tokenFeeId,
  }: T.OnFetchClaimWithdraw) => {
    try {
      const api = nativeApiState.api;

      const isApiReady = nativeApiState.connected;

      if (!api || !isApiReady)
        throw new Error("You are not connected to blockchain");

      if (!selectedWallet?.address)
        throw new Error("Funding account doesn't exists");

      // TODO: Move this toast as callback to signAndSendExtrinsic,
      settingsState.onHandleAlert(
        "Processing Claim Withdraw, please wait while the withdraw is processed and the block is finalized. This may take a few mins."
      );
      dispatch(A.withdrawsClaimFetch({ sid, assetIds }));

      const res = await claimWithdrawal(
        api,
        selectedWallet.signer,
        selectedWallet.address,
        sid,
        tokenFeeId
      );
      if (res.isSuccess) {
        dispatch(A.withdrawsClaimData({ sid }));
        // TODO?: Check delay
        // for ux
        setTimeout(() => {
          settingsState.onHandleAlert(
            "Congratulations! You have successfully withdrawn your assets to your funding account."
          );

          dispatch(A.withdrawClaimReset());
        }, 3000);
      } else {
        throw new Error("Claim Withdraw failed");
      }
    } catch (error) {
      dispatch(A.withdrawClaimCancel(sid));
      settingsState.onHandleError((error as Error)?.message ?? error);
      dispatch(A.withdrawsError((error as Error)?.message ?? error));
    } finally {
      for (const assetId of assetIds) {
        await onChangeChainBalance(assetId);
      }
    }
  };

  const claimWithdrawal = useCallback(
    async (
      api: ApiPromise,
      signer: Signer,
      account: string,
      sid: number,
      assetId?: string
    ): Promise<ExtrinsicResult> => {
      const ext = api.tx.ocex.claimWithdraw(sid, account);
      return await signAndSendExtrinsic(
        addToTxQueue,
        api,
        ext,
        { signer },
        account,
        true,
        assetId
      );
    },
    [addToTxQueue]
  );

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
