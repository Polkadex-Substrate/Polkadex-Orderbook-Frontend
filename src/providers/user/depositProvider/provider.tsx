import { useCallback, useEffect, useReducer } from "react";
import { fetchAllFromAppSync } from "@polkadex/orderbook/helpers/appsync";
import * as queries from "../../../graphql/queries";
import BigNumber from "bignumber.js";
import { ApiPromise } from "@polkadot/api";
import * as A from "./actions";
import { Provider } from "./context";
import { depositsReducer, initialState } from "./reducer";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  selectRangerApi,
  selectRangerIsReady,
} from "@polkadex/orderbook/modules/public/ranger/selectors";
import { notificationPush, sendError } from "@polkadex/orderbook-modules";
import { useDispatch } from "react-redux";
import { ExtensionAccount } from "@polkadex/orderbook/modules/types";
import { ExtrinsicResult, signAndSendExtrinsic } from "@polkadex/web-helpers";
import { UNIT_BN } from "@polkadex/web-constants";

export const DepositProvider = ({ children }) => {
  const [state, dispatch] = useReducer(depositsReducer, initialState);
  const api = useReduxSelector(selectRangerApi);
  const isApiReady = useReduxSelector(selectRangerIsReady);
  const onfetchDeposit = async ({ asset, amount, mainAccount }) => {
    console.log("fetch deposit called");

    try {
      console.log("inside try", asset, amount, mainAccount);

      console.log(isApiReady, "isapiready", api);

      if (isApiReady && mainAccount?.account?.address !== "") {
        alert(
          "Processing Deposit, Please wait while the deposit is processed and the block is finalized. This may take a few mins."
        );
        dispatch(A.depositsFetch({ asset, amount, mainAccount }));
        const res = await depositToEnclave(api, mainAccount, asset, amount);
        console.log(res, "res");

        if (res.isSuccess) {
          dispatch(A.depositsData());
          alert(
            "Deposit Successful, Congratulations! You have successfully deposited assets to your trading account. "
          );

          dispatch(A.depositsReset());
        } else {
          throw new Error("Deposit failed");
        }
      }
    } catch (error) {
      console.log(error, "error");
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
        onfetchDeposit,
      }}>
      {children}
    </Provider>
  );
};
