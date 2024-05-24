// TODO: Move messages

import { useTheaProvider } from "@orderbook/core/providers";
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { signAndSendExtrinsic, sleep } from "@orderbook/core/helpers";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { NOTIFICATIONS } from "@orderbook/core/constants";
import { Chain } from "@polkadex/thea";

const withdrawMessage =
  "After withdrawal initiation, expect tokens on the destination chain in a few minutes";
const depositMessage =
  "Deposit Success. Processed transactions take a few minutes to appear in History";

export function useBridge({ onSuccess }: { onSuccess: () => void }) {
  const { api } = useNativeApi();
  const { onHandleAlert, onHandleError, onPushNotification } =
    useSettingsProvider();
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

      // TODO: Need to consider Existensial Deposit here (polkadex-ts)
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

      await signAndSendExtrinsic(
        api,
        ext,
        { signer: sourceAccount.signer },
        sourceAccount.address,
        true
      );

      onSuccess();
      onHandleAlert(isPolkadexChain ? withdrawMessage : depositMessage);
      if (isPolkadexChain) await sleep(4000);
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
