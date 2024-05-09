/**
 * This hook manages state and actions related to:
 * -
 */

import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

export function useBridge() {
  const {
    sourceConnector,
    destinationChain,
    selectedAsset,
    destinationAccount,
    sourceAccount,
  } = useTheaProvider();

  const { onHandleAlert, onHandleError } = useSettingsProvider();
  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (
        !sourceAccount ||
        !destinationChain ||
        !selectedAsset ||
        !destinationAccount
      )
        return;
      const transferConfig = await sourceConnector?.getTransferConfig(
        destinationChain,
        selectedAsset,
        destinationAccount.address,
        sourceAccount.address
      );
      if (!transferConfig) {
        onHandleError?.("transferConfig error");
        return;
      }

      const ext = await transferConfig.transfer<SubmittableExtrinsic>(
        Number(amount)
      );

      await ext.signAndSend(sourceAccount.address, {
        signer: sourceAccount.signer,
      });
      onHandleAlert("Success");
    },
    onError: (error: Error) => onHandleError?.(error.message),
    onSuccess: () => onHandleAlert(`Orders cancelled`),
  });
}
