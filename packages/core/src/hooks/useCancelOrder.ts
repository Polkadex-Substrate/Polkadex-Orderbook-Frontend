import { useMutation } from "@tanstack/react-query";
import {
  useExtensionAccounts,
  useUserAccounts,
} from "@polkadex/react-providers";
import {
  isAssetPDEX,
  isValidAddress,
  signPayload,
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
  const { onHandleError, onHandleAlert, onHandleInfo } = useSettingsProvider();
  const { extensionAccounts } = useExtensionAccounts();
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const { api } = useNativeApi();

  return useMutation({
    mutationFn: async ({ orderId, base, quote }: CancelOrderArgs) => {
      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      if (!tradeAddress) throw new Error("No trading account selected");

      const keyringPair = wallet.getPair(tradeAddress);
      const account = extensionAccounts.find(
        ({ address }) => address === mainAddress
      );
      if (!account && (!isValidAddress(tradeAddress) || !keyringPair))
        throw new Error("No valid Account Found");

      if (!account && keyringPair?.isLocked)
        throw new Error("Please unlock your account first");

      onHandleInfo?.("Cancelling order...");

      const baseAsset = isAssetPDEX(base) ? "PDEX" : base;
      const quoteAsset = isAssetPDEX(quote) ? "PDEX" : quote;
      const pair = `${baseAsset}-${quoteAsset}`;

      const isSignedByExtension = !keyringPair;
      let signature: { Sr25519: string };
      if (isSignedByExtension) {
        const signer = account?.signer;
        if (!signer) throw new Error("No signer for MainAccount found");
        const result = signer?.signRaw({
          address: mainAddress,
          data: pair,
        });
        signature = { Sr25519: result?.signature };
      } else {
        signature = signPayload(
          keyringPair,
          api.createType("order_id", orderId)
        );
      }

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
