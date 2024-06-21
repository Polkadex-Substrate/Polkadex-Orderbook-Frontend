// TODO: Move this to packages/core/hooks
import { SubmittableExtrinsic } from "@polkadot/api/promise/types";
import { useMutation } from "@tanstack/react-query";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { NOTIFICATIONS } from "@orderbook/core/constants";
import { Chain } from "@polkadex/thea";
import { signAndSubmitPromiseWrapper } from "@polkadex/blockchain-api";
import { useDirectDepositProvider } from "@orderbook/core/providers/user/direct";

export function useDeposit({ onSuccess }: { onSuccess: () => void }) {
  const { onHandleAlert, onHandleError, onPushNotification } =
    useSettingsProvider();
  const {
    transferConfig,
    sourceAccount,
    destinationPDEXBalance,
    onRefetchSourceBalances,
    selectedAsset,
    destinationAccount,
    onRefetchTransferConfig,
  } = useDirectDepositProvider();

  return useMutation({
    mutationFn: async ({ amount }: { amount: number }) => {
      if (!transferConfig || !sourceAccount || !destinationAccount) {
        throw new Error("Bridge issue");
      }

      /* Checks for Source chain */
      if (
        transferConfig.sourceFeeBalance.amount -
          transferConfig.sourceFee.amount <=
        transferConfig.sourceFeeExistential.amount
      ) {
        throw new Error(
          "Insufficient balance to pay the transaction fee at source chain"
        );
      }

      /* Checks for Destination chain */
      const isPolkadexAutoSwap = !destinationPDEXBalance;
      if (
        !isPolkadexAutoSwap && // Ensure there is no Autoswap
        selectedAsset?.ticker !==
          transferConfig.destinationNativeExistential.ticker // Ensure it's a non-native asset for destination chain
      ) {
        // Ensure that destination account have native balance more than existential amount
        if (
          destinationPDEXBalance <=
          transferConfig.destinationNativeExistential.amount
        ) {
          throw new Error(
            "Insufficient native token balance at the destination chain"
          );
        }
      }

      const ext = await transferConfig.transfer<SubmittableExtrinsic>(amount);

      await signAndSubmitPromiseWrapper({
        signer: sourceAccount.signer,
        tx: ext,
        address: sourceAccount.address,
        criteria: "IS_FINALIZED",
      });

      onSuccess();
      onHandleAlert(
        "Deposit Success. Expect tokens in the orderbook in a few minutes"
      );
      await onRefetchSourceBalances?.();
      await onRefetchTransferConfig?.();
      return amount;
    },
    onError: (error: Error) => onHandleError?.(error.message),
    onSuccess: (amount: number) =>
      onPushNotification(
        NOTIFICATIONS.directDeposit({
          sourceChain: transferConfig?.sourceChain as Chain,
          asset: selectedAsset?.ticker as string,
          amount,
        })
      ),
  });
}
