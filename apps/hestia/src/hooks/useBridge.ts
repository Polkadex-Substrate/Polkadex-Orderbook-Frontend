/**
 * This hook manages state and actions related to:
 * -
 */

import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

export function useBridge() {
  const { onHandleAlert, onHandleError } = useSettingsProvider();
  const { transferConfig, sourceAccount } = useTheaProvider();
  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!transferConfig || !sourceAccount) {
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
