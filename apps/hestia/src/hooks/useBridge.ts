// TODO: Move messages

import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { signAndSendExtrinsic, sleep } from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { signAndSubmitPromiseWrapper } from "@polkadex/blockchain-api";

const withdrawMessage =
  "After withdrawal initiation, expect tokens on the destination chain in 2-3 minutes";
const depositMessage =
  "Deposit Success. Processed transactions take up to 20 minutes to appear on the History";

export function useBridge({ onSuccess }: { onSuccess: () => void }) {
  const { api } = useNativeApi();
  const { onHandleAlert, onHandleError } = useSettingsProvider();
  const {
    transferConfig,
    sourceAccount,
    isPolkadexChain,
    onRefetchSourceBalances,
  } = useTheaProvider();

  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!transferConfig || !sourceAccount || !api) {
        onHandleError?.("Bridge issue");
        return;
      }

      const ext = await transferConfig.transfer<SubmittableExtrinsic>(amount);
      if (isPolkadexChain)
        await signAndSendExtrinsic(
          api,
          ext,
          { signer: sourceAccount.signer },
          sourceAccount.address,
          true
        );
      else
        await signAndSubmitPromiseWrapper({
          signer: sourceAccount.signer,
          tx: ext,
          address: sourceAccount.address,
          criteria: "IS_FINALIZED",
        });

      onSuccess();
      onHandleAlert(isPolkadexChain ? withdrawMessage : depositMessage);
      if (isPolkadexChain) await sleep(4000);
      await onRefetchSourceBalances?.();
    },
    onError: (error: Error) => onHandleError?.(error.message),
  });
}
