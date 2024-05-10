/**
 * This hook manages state and actions related to:
 * -
 */

import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

export function useBridge({ onSuccess }: { onSuccess: () => void }) {
  const { onHandleAlert, onHandleError } = useSettingsProvider();
  const { transferConfig, sourceAccount } = useTheaProvider();
  return useMutation({
    mutationFn: async ({
      amount,
      tokenFeeId,
    }: {
      amount: number;
      tokenFeeId: string;
    }) => {
      if (!transferConfig || !sourceAccount) {
        onHandleError?.("Bridge issue");
        return;
      }

      const ext = await transferConfig.transfer<SubmittableExtrinsic>(
        Number(amount)
      );
      // const assetId =
      //   tokenFeeId && tokenFeeId !== "PDEX" ? { assetId: tokenFeeId } : {};

      await ext.signAndSend(sourceAccount.address, {
        signer: sourceAccount.signer,
        // assetId,
      });
      onSuccess();
      onHandleAlert("Bridge Success");
    },
    onError: (error: Error) => onHandleError?.(error.message),
  });
}
