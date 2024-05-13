/**
 * This hook manages state and actions related to:
 * -
 */

import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { signAndSendExtrinsic, sleep } from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";

const withdrawMessage =
  "After withdrawal initiation, expect tokens on the destination chain in 2-3 minutes";

export function useBridge({ onSuccess }: { onSuccess: () => void }) {
  const { api } = useNativeApi();
  const { onHandleAlert, onHandleError } = useSettingsProvider();
  const {
    transferConfig,
    sourceAccount,
    isPolkadexChain,
    onRefreshTransactions,
  } = useTheaProvider();
  return useMutation({
    mutationFn: async ({
      amount,
      tokenFeeId = "PDEX",
    }: {
      amount: number;
      tokenFeeId: string;
    }) => {
      if (!transferConfig || !sourceAccount || !api) {
        onHandleError?.("Bridge issue");
        return;
      }

      const ext = await transferConfig.transfer<SubmittableExtrinsic>(amount);

      await signAndSendExtrinsic(
        api,
        ext,
        { signer: sourceAccount.signer },
        sourceAccount.address,
        true,
        tokenFeeId
      );
      onSuccess();
      onHandleAlert(
        isPolkadexChain
          ? withdrawMessage
          : "Deposit Success. Processed transactions take up to 20 minutes to appear on the History"
      );
      if (isPolkadexChain) {
        await sleep(3000);
        await onRefreshTransactions();
      }
    },
    onError: (error: Error) => onHandleError?.(error.message),
  });
}
