import { useState } from "react";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appsyncOrderbookService } from "@orderbook/core/utils/orderbookService";
import { useTransactionManager } from "@polkadex/react-providers";

import { ClaimRewardArgs, NOTIFICATIONS, QUERY_KEYS } from "../..";

export const useClaimReward = () => {
  const queryClient = useQueryClient();
  const [loadingEpochs, setLoadingEpochs] = useState<number[]>([]);
  const { api, lmp } = useNativeApi();
  const {
    selectedAddresses: { mainAddress },
    getSigner,
  } = useProfile();
  const { onHandleError, onHandleAlert, onPushNotification } =
    useSettingsProvider();
  const { addToTxQueue } = useTransactionManager();

  const { mutateAsync, status } = useMutation({
    mutationFn: async (args: ClaimRewardArgs) => {
      const { epoch, market, reward } = args;
      setLoadingEpochs((prev) => {
        return [...prev, epoch];
      });

      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      if (!lmp) throw new Error("LMP config not defined");

      const signer = getSigner(mainAddress);
      if (!signer) throw new Error("Signer not defined");

      const signedExtrinsic =
        await appsyncOrderbookService.operation.claimReward({
          address: mainAddress,
          epoch,
          lmp,
          market,
          signer,
        });
      addToTxQueue(signedExtrinsic);
      return { reward, epoch, market };
    },
    onError: (error: Error, args) => {
      onHandleError?.(error.message);
      setLoadingEpochs((prev) => {
        return prev.filter((i) => i !== args?.epoch);
      });
    },
    onSuccess: (e) => {
      queryClient.invalidateQueries({
        queryKey: QUERY_KEYS.lmpRewards(e.market, mainAddress),
      });
      onHandleAlert("Reward Claimed");
      onPushNotification(
        NOTIFICATIONS.claimReward({ reward: `${e.reward.toFixed(4)} PDEX` })
      );
    },
    onSettled: (e) => {
      setLoadingEpochs((prev) => {
        return prev.filter((i) => i !== e?.epoch);
      });
    },
  });

  return { mutateAsync, status, loadingEpochs };
};
