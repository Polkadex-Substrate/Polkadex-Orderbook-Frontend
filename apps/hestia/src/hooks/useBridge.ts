// TODO: Move messages

import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { signAndSendExtrinsic, sleep } from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { signAndSubmitPromiseWrapper } from "@polkadex/blockchain-api";

const withdrawMessage =
  "After withdrawal initiation, expect tokens on the destination chain in a few minutes";
const depositMessage =
  "Deposit Success. Processed transactions take a few minutes to appear in History";

export function useBridge({ onSuccess }: { onSuccess: () => void }) {
  const { api } = useNativeApi();
  const { onHandleAlert, onHandleError } = useSettingsProvider();
  const {
    transferConfig,
    sourceAccount,
    isPolkadexChain,
    onRefetchSourceBalances,
    selectedAsset,
    destinationChain,
    destinationConnector,
    destinationAccount,
  } = useTheaProvider();

  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!transferConfig || !sourceAccount || !api) {
        throw new Error("Bridge issue");
      }

      if (
        transferConfig.sourceFee.amount > transferConfig.sourceFeeBalance.amount
      ) {
        throw new Error("Insufficient transaction fee balance on source chain");
      }

      // For DED and PINK withdrawal
      if (
        destinationChain?.name === "AssetHub" &&
        ["DED", "PINK"].includes(selectedAsset?.ticker || "")
      ) {
        const usdtAsset =
          destinationConnector
            ?.getAllAssets()
            .filter((a) => a.ticker === "USDT") || [];

        const usdtBalance =
          (
            await destinationConnector?.getBalances(
              destinationAccount?.address as string,
              usdtAsset
            )
          )?.[0].amount || 0;

        if (usdtBalance < 0.7)
          throw new Error(
            `Insufficient USDT balance to cover the existential deposit on Asset Hub`
          );
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
