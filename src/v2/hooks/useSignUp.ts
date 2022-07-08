import { useEffect, useRef } from "react";
import { useReactToPrint } from "react-to-print";
import { useRouter } from "next/router";

import {
  selectExtensionWalletAccounts,
  selectExtensionWalletLoading,
  selectExtensionWalletSuccess,
  selectMainAccount,
  selectSignUpLoading,
  selectSignUpSuccess,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";

export function useSignUp({ mnemonic = "" }) {
  const router = useRouter();
  const componentRef = useRef();
  const signUpSuccess = useReduxSelector(selectSignUpSuccess);
  const signUpLoading = useReduxSelector(selectSignUpLoading);
  const isLoading = useReduxSelector(selectExtensionWalletLoading);
  const isSuccess = useReduxSelector(selectExtensionWalletSuccess);
  const selectedExtensionAccount = useReduxSelector(selectMainAccount);
  const extensionAccounts = useReduxSelector(selectExtensionWalletAccounts);

  const handlePrint = useReactToPrint({
    content: () => componentRef.current,
    documentTitle: "PolkadexPaperWallet",
    pageStyle: `
    @media all {
      div {
        width: 100%;
        height: 100%;
      }
      main, body {
        background: white !important;
      }
    }

    @media print {
      html, body {
        height: initial !important;
        width: initial !important;
      }
      body {
        -webkit-print-color-adjust: exact;
        -moz-print-color-adjust: exact;
        -ms-print-color-adjust: exact;
        print-color-adjust: exact;
      }
    }

    @page {
      size: landscape;
    }
    `,
  });

  useEffect(() => {
    if (signUpSuccess)
      router.push({ pathname: "/connectToPhone", query: { mnemonic } }, "connectToPhone");
  }, [signUpSuccess, router, mnemonic]);

  return {
    isSuccess,
    signUpLoading,
    isLoading,
    handlePrint,
    signUpSuccess,
    componentRef,
    selectedExtensionAccount,
    extensionAccounts,
  };
}
