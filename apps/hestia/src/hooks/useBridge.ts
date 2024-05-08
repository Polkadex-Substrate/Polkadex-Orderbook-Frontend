/**
 * This hook manages state and actions related to:
 * -
 */

import { useCallback, useState } from "react";
import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";

export function useBridge() {
  const [amount, setAmount] = useState("0.00");
  const {
    sourceConnector,
    destinationChain,
    selectedAsset,
    destinationAccount,
    sourceAccount,
  } = useTheaProvider();
  const onBridge = useCallback(async () => {
    if (
      amount &&
      sourceConnector &&
      destinationChain &&
      selectedAsset &&
      destinationAccount &&
      sourceAccount
    )
      try {
        const transferConfig = await sourceConnector?.getTransferConfig(
          destinationChain,
          selectedAsset,
          destinationAccount.address,
          sourceAccount.address
        );
        const ext = await transferConfig.transfer<SubmittableExtrinsic>(
          Number(amount)
        );
        console.log(">>>", ext);
        await ext.signAndSend(sourceAccount.address, {
          signer: sourceAccount.signer,
        });
        window.alert("Success");
      } catch (error) {
        console.log("ERROR", error);
      }
    else window.alert("Error");
  }, [
    amount,
    sourceConnector,
    destinationChain,
    destinationAccount,
    sourceAccount,
    selectedAsset,
  ]);
  return { onBridge, setAmount, amount };
}
