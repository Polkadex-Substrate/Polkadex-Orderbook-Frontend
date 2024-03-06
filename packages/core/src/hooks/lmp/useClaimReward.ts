import { useState } from "react";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { appsyncOrderbookService } from "@orderbook/core/utils/orderbookService";

import { NOTIFICATIONS, QUERY_KEYS } from "../..";

type ClaimRewardArgs = { market: string; epoch: number; reward: number };

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

  const { mutateAsync, status } = useMutation({
    mutationFn: async ({ epoch, market, reward }: ClaimRewardArgs) => {
      setLoadingEpochs((prev) => {
        return [...prev, epoch];
      });

      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      if (!lmp) throw new Error("LMP config not defined");

      const signer = getSigner(mainAddress);
      if (!signer) throw new Error("Signer not defined");

      await appsyncOrderbookService.operation.claimReward({
        address: mainAddress,
        api,
        epoch,
        lmp,
        market,
        signer,
      });

      return { reward, epoch, market };
    },
    onError: (error: Error) => onHandleError?.(error.message),
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
