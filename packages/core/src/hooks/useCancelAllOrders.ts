import { useMutation } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import {
  createCancelAllPayload,
  isValidAddress,
} from "@orderbook/core/helpers";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { useSettingsProvider } from "../providers/public/settings";
import { useProfile } from "../providers/user/profile";
import { useNativeApi } from "../providers/public/nativeApi";

export const useCancelAllOrders = () => {
  const { wallet } = useUserAccounts();
  const { onHandleError, onHandleAlert, onHandleInfo } = useSettingsProvider();
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const { api } = useNativeApi();

  return useMutation({
    mutationFn: async ({ market }: { market: string }) => {
      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      if (!tradeAddress) throw new Error("No trading account selected");

      const keyringPair = wallet.getPair(tradeAddress);
      if (!isValidAddress(tradeAddress) || !keyringPair)
        throw new Error("Invalid Trading Account");

      if (keyringPair?.isLocked)
        throw new Error("Please unlock your account first");

      onHandleInfo?.("Cancelling orders...");

      const data = createCancelAllPayload(
        api,
        keyringPair,
        market,
        mainAddress,
        tradeAddress
      );

      const payload = JSON.stringify({
        CancelAll: [data.payload, data.signature],
      });
      await appsyncOrderbookService.operation.cancelAll({
        payload,
        token: tradeAddress,
      });
    },
    onError: (error: Error) => onHandleError?.(error.message),
    onSuccess: () => onHandleAlert(`Orders cancelled`),
  });
};
