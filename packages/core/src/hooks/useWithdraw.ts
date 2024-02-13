import { useMutation } from "@tanstack/react-query";
import { useNativeApi } from "@orderbook/core/providers/public//nativeApi";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useProfile } from "@orderbook/core/providers/user/profile";
import {
  createWithdrawSigningPayload,
  getNonce,
  signPayload,
} from "@orderbook/core/helpers";
import { useUserAccounts } from "@polkadex/react-providers";

import { useOrderbookService } from "../providers/public/orderbookServiceProvider/useOrderbookService";
import { appsyncOrderbookService } from "../utils/orderbookService";

type WithdrawArgs = {
  asset: string;
  amount: string | number;
};

export const useWithdraw = () => {
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const { api } = useNativeApi();
  const { onHandleNotification, onHandleError } = useSettingsProvider();
  const { wallet } = useUserAccounts();
  const { isReady } = useOrderbookService();

  const { mutateAsync, status } = useMutation({
    mutationFn: async ({ asset, amount }: WithdrawArgs) => {
      if (!isReady) throw new Error("Orderbook service not initialized");

      if (!api || !api?.isConnected)
        throw new Error("You are not connected to blockchain");

      const keyringPair = wallet.getPair(tradeAddress);
      if (tradeAddress?.trim().length === 0 || !keyringPair)
        throw new Error("Invalid Trading Account");

      const nonce = getNonce();
      const payload = { asset_id: { asset }, amount, timestamp: nonce };
      const signingPayload = createWithdrawSigningPayload(
        api,
        asset,
        amount,
        nonce
      );
      const signature = signPayload(api, keyringPair, signingPayload);

      await appsyncOrderbookService.operation.withdraw({
        address: tradeAddress,
        payload: [mainAddress, tradeAddress, payload, signature],
      });
    },
    onError: (error) => {
      const errorMessage = (error as Error).message ?? (error as string);
      onHandleError(errorMessage);
    },
    onSuccess: () =>
      onHandleNotification({
        type: "Success",
        message:
          "Your withdrawal is being processed and will be available for you to claim in a few minutes",
      }),
  });

  return { mutateAsync, loading: status === "loading" };
};
