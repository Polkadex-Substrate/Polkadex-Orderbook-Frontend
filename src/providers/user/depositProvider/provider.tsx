import { useReducer } from "react";
import BigNumber from "bignumber.js";
import { ApiPromise } from "@polkadot/api";

import { useNativeApi } from "../../public/nativeApi";
import { useSettingsProvider } from "../../public/settings";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { depositsReducer, initialState } from "./reducer";

import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { UNIT_BN } from "@polkadex/web-constants";

export const DepositProvider: T.DepositsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(depositsReducer, initialState);

  const { connected: isApiReady, api } = useNativeApi();
  const { onHandleError, onHandleNotification } = useSettingsProvider();

  const onFetchDeposit = async ({ asset, amount, mainAccount }) => {
    try {
      if (isApiReady && mainAccount?.account?.address !== "") {
        onHandleNotification({
          type: "InformationAlert",
          message: {
            title: "Processing Deposit",
            description:
              "Please wait while the deposit is processed and the block is finalized. This may take a few mins.",
          },
          time: new Date().getTime(),
        });
        dispatch(A.depositsFetch());

        const res = await depositToEnclave(api, mainAccount, asset, amount);

        if (res.isSuccess) {
          dispatch(A.depositsData());
          onHandleNotification({
            type: "SuccessAlert",
            message: {
              title: "Deposit Successful",
              description:
                "Congratulations! You have successfully deposited assets to your trading account.",
            },
            time: new Date().getTime(),
            hasConfetti: true,
          });

          dispatch(A.depositsReset());
        } else {
          throw new Error("Deposit failed");
        }
      }
    } catch (error) {
      console.log(error, "error");
      onHandleError({
        error,
        processingType: "alert",
      });
      dispatch(A.depositsError(error));
    }
  };

  async function depositToEnclave(
    api: ApiPromise,
    account: ExtensionAccount,
    asset: Record<string, string | null>,
    amount: string | number
  ): Promise<ExtrinsicResult> {
    const amountStr = new BigNumber(amount).multipliedBy(UNIT_BN).toString();
    const ext = api.tx.ocex.deposit(asset, amountStr);
    const res = await signAndSendExtrinsic(
      api,
      ext,
      { signer: account.signer },
      account?.account.address,
      true
    );
    return res;
  }

  return (
    <Provider
      value={{
        ...state,
        onFetchDeposit,
      }}>
      {children}
    </Provider>
  );
};
