import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useMutation } from "@tanstack/react-query";

import { NOTIFICATIONS } from "../..";

type ClaimRewardArgs = { market: string; epoch: number };

export const useClaimReward = () => {
  const { api, lmp } = useNativeApi();
  const {
    selectedAddresses: { mainAddress },
  } = useProfile();
  const { onHandleError, onHandleAlert, onPushNotification } =
    useSettingsProvider();

  return useMutation({
    mutationFn: async ({ epoch, market }: ClaimRewardArgs) => {
      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      if (!lmp) throw new Error("LMP config not defined");

      const res = await lmp.claimRewardsTx(epoch, market);
      console.log(res);
    },
    onError: (error: Error) => onHandleError?.(error.message),
    onSuccess: () => {
      onHandleAlert("Reward Claimed");
      onPushNotification(NOTIFICATIONS.claimReward({ reward: "100 PDEX" }));
    },
  });
};
