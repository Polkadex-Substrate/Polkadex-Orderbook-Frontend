import { useMutation } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import {
  createCancelOrderPayloadSigned,
  isAssetPDEX,
  isValidAddress,
} from "@orderbook/core/helpers";

import { appsyncOrderbookService } from "../utils/orderbookService";
import { useSettingsProvider } from "../providers/public/settings";
import { useProfile } from "../providers/user/profile";
import { useNativeApi } from "../providers/public/nativeApi";

export type CancelOrderArgs = {
  orderId: string;
  base: string;
  quote: string;
};

export const useCancelOrder = () => {
  const { wallet } = useUserAccounts();
  const { onHandleError, onHandleAlert, onHandleNotification } =
    useSettingsProvider();
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const { api } = useNativeApi();

  return useMutation({
    mutationFn: async ({ orderId, base, quote }: CancelOrderArgs) => {
      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      const keyringPair = wallet.getPair(tradeAddress);
      if (!isValidAddress(tradeAddress) || !keyringPair)
        throw new Error("Invalid Trading Account");

      if (keyringPair?.isLocked)
        throw new Error("Please unlock your account first");

      onHandleNotification({
        type: "Information",
        message: "Cancelling order...",
      });

      const baseAsset = isAssetPDEX(base) ? "PDEX" : base;
      const quoteAsset = isAssetPDEX(quote) ? "PDEX" : quote;

      const { pair, signature } = createCancelOrderPayloadSigned(
        api,
        keyringPair,
        orderId,
        baseAsset,
        quoteAsset
      );

      const payload = JSON.stringify({
        CancelOrder: [orderId, mainAddress, tradeAddress, pair, signature],
      });

      await appsyncOrderbookService.operation.cancelOrder({
        payload,
        token: tradeAddress,
      });

      return orderId;
    },
    onError: (error: Error) => onHandleError?.(error.message),
    onSuccess: (e) => onHandleAlert(`Order cancelled: ${e}`),
  });
};
