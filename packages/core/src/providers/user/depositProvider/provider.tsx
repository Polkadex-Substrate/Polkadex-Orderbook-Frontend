import { useReducer } from "react";
import BigNumber from "bignumber.js";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { ExtrinsicResult, signAndSendExtrinsic } from "@orderbook/core/helpers";
import { UNIT_BN } from "@orderbook/core/constants";

import * as A from "./actions";
import * as T from "./types";
import { Provider } from "./context";
import { depositsReducer, initialState } from "./reducer";

export const DepositProvider: T.DepositsComponent = ({ children }) => {
  const [state, dispatch] = useReducer(depositsReducer, initialState);
  const { connected: isApiReady, api } = useNativeApi();
  const { onHandleError, onHandleNotification } = useSettingsProvider();

  const onFetchDeposit = async ({
    asset,
    amount,
    account,
  }: T.onFetchDeposit) => {
    try {
      if (api && isApiReady && account?.address !== "") {
        onHandleNotification({
          type: "Information",
          message: "Processing Deposit...",
        });
        dispatch(A.depositsFetch());

        const res = await depositToEnclave({
          api,
          account,
          asset,
          amount,
        });

        if (res.isSuccess) {
          dispatch(A.depositsData());
          onHandleNotification({
            type: "Success",
            message:
              "Congratulations! You have successfully deposited assets to your trading account.",
          });

          dispatch(A.depositsReset());
        } else {
          throw new Error("Deposit failed");
        }
      }
    } catch (error) {
      console.log(error, "error");
      onHandleError((error as Error).message);
      dispatch(A.depositsError(error as Error));
    }
  };

  async function depositToEnclave({
    api,
    account,
    asset,
    amount,
  }: T.DepositToEnclave): Promise<ExtrinsicResult> {
    const amountStr = new BigNumber(amount).multipliedBy(UNIT_BN).toString();
    const ext = api.tx.ocex.deposit(asset, amountStr);
    const res = await signAndSendExtrinsic(
      api,
      ext,
      { signer: account.signer },
      account?.address,
      true
    );
    return res;
  }

  return (
    <Provider
      value={{
        ...state,
        onFetchDeposit,
      }}
    >
      {children}
    </Provider>
  );
};
