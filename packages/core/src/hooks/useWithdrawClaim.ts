import { useMutation } from "@tanstack/react-query";
import { useNativeApi } from "@orderbook/core/providers/public//nativeApi";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useExtensionAccounts } from "@polkadex/react-providers";
import {
  getFundingAccountDetail,
  signAndSendExtrinsic,
} from "@orderbook/core/helpers";
import { useFunds } from "@orderbook/core/hooks";

import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";

type WithdrawClaimArgs = {
  sid: number;
  assetIds?: string[];
};

export const useWithdrawClaim = () => {
  const {
    selectedAddresses: { mainAddress },
    getSigner,
  } = useProfile();
  const { api } = useNativeApi();
  const { onHandleNotification, onHandleError } = useSettingsProvider();
  const { onChangeChainBalance } = useFunds();
  const { isReady } = useOrderbookService();
  const { extensionAccounts } = useExtensionAccounts();

  const { mutateAsync, status } = useMutation({
    mutationFn: async ({ sid, assetIds = [] }: WithdrawClaimArgs) => {
      if (!isReady) throw new Error("Orderbook service not initialized");

      if (!api || !api?.isConnected)
        throw new Error("You are not connected to blockchain");

      const extensionAccount = getFundingAccountDetail(
        mainAddress,
        extensionAccounts
      );
      if (!extensionAccount?.address)
        throw new Error("Funding account doesn't exists");

      const signer = getSigner(mainAddress);
      if (!signer) throw new Error("Signer is not defined");

      onHandleNotification({
        type: "Information",
        message:
          "Processing Claim Withdraw, please wait while the withdraw is processed and the block is finalized. This may take a few mins.",
      });

      const ext = api.tx.ocex.claimWithdraw(sid, extensionAccount?.address);
      const res = await signAndSendExtrinsic(
        api,
        ext,
        { signer },
        extensionAccount?.address,
        true
      );

      if (res.isSuccess) {
        // TODO: Check Delay while integrating the hook
        await new Promise((resolve) => setTimeout(resolve, 5000));

        // Refetch chain balance manually
        for (const assetId of assetIds) {
          await onChangeChainBalance(assetId);
        }
      } else {
        throw new Error("Claim failed");
      }
    },

    onError: (error) => {
      const errorMessage = (error as Error).message ?? (error as string);
      onHandleError(errorMessage);
    },
    onSuccess: () =>
      onHandleNotification({
        type: "Success",
        message:
          "Congratulations! You have successfully withdrawn your assets to your funding account.",
      }),
  });

  return { mutateAsync, loading: status === "loading" };
};
