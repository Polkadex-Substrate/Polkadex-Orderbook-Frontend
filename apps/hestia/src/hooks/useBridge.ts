import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { signAndSendExtrinsic, sleep } from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { NOTIFICATIONS } from "@orderbook/core/constants";
import { Chain } from "@polkadex/thea";

export function useBridge({ onSuccess }: { onSuccess: () => void }) {
  const { api } = useNativeApi();
  const { onHandleAlert, onHandleError, onPushNotification } =
    useSettingsProvider();
  const {
    transferConfig,
    sourceAccount,
    isSourcePolkadex,
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
        transferConfig.sourceFeeBalance.amount -
          transferConfig.sourceFee.amount <=
        transferConfig.sourceFeeExistential.amount
      ) {
        throw new Error(
          "Insufficient balance to pay the transaction fee at source chain"
        );
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
          )?.[0]?.amount || 0;

        if (usdtBalance < 0.7)
          throw new Error(
            `Insufficient USDT balance to cover the existential deposit on Asset Hub`
          );
      }

      const ext = await transferConfig.transfer<SubmittableExtrinsic>(amount);

      await signAndSendExtrinsic(
        api,
        ext,
        { signer: sourceAccount.signer },
        sourceAccount.address,
        true
      );

      onSuccess();
      onHandleAlert(
        "Transfer Success. Expect tokens on the destination chain in a few minutes"
      );
      if (isSourcePolkadex) await sleep(4000);
      await onRefetchSourceBalances?.();
      return amount;
    },
    onError: (error: Error) => onHandleError?.(error.message),
    onSuccess: (amount: number) =>
      onPushNotification(
        NOTIFICATIONS.crossChainTransfer({
          sourceChain: transferConfig?.sourceChain as Chain,
          destinationChain: transferConfig?.destinationChain as Chain,
          asset: selectedAsset?.ticker as string,
          amount,
        })
      ),
  });
}
