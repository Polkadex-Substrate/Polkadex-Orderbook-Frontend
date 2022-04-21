import { useRef } from "react";
import { useReactToPrint } from "react-to-print";

import {
  selectMainAccount,
  selectPolkadotWalletAccounts,
  selectPolkadotWalletLoading,
  selectPolkadotWalletSuccess,
  selectSignUpLoading,
  selectSignUpSuccess,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { defaultConfig } from "@polkadex/orderbook-config";

export function useSignUp() {
  const componentRef = useRef();
  const signUpSuccess = useReduxSelector(selectSignUpSuccess);
  const signUpLoading = useReduxSelector(selectSignUpLoading);
  const selectedAccount = useReduxSelector(selectMainAccount);
  const isLoading = useReduxSelector(selectPolkadotWalletLoading);
  const accounts = useReduxSelector(selectPolkadotWalletAccounts);
  const isSuccess = useReduxSelector(selectPolkadotWalletSuccess);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const isPublicBranch = defaultConfig.polkadexFeature === "none";

  return {
    isSuccess,
    signUpLoading,
    isLoading,
    accounts,
    handlePrint,
    isPublicBranch,
    selectedAccount,
    signUpSuccess,
    componentRef,
  };
}
