import { useMutation } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import {
  createOrderPayload,
  getNewClientId,
  getNonce,
  signPayload,
} from "@orderbook/core/helpers";

import {
  OrderSide,
  OrderType,
  appsyncOrderbookService,
} from "../utils/orderbookService";
import { useSettingsProvider } from "../providers/public/settings";
import { useProfile } from "../providers/user/profile";
import { useNativeApi } from "../providers/public/nativeApi";

type CreateOrderArgs = {
  symbol: string[];
  side: OrderSide;
  price: number;
  orderType: OrderType;
  amount: number;
};

export const useCreateOrder = () => {
  const { wallet } = useUserAccounts();
  const { onHandleError, onHandleAlert } = useSettingsProvider();
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const { api } = useNativeApi();

  return useMutation({
    mutationFn: async ({
      symbol,
      side,
      price,
      orderType,
      amount,
    }: CreateOrderArgs) => {
      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      const keyringPair = wallet.getPair(tradeAddress);
      if (tradeAddress?.trim().length === 0 || !keyringPair)
        throw new Error("Invalid Trading Account");

      const timestamp = getNonce();
      const clientOrderId = getNewClientId();
      const order = createOrderPayload(
        api,
        tradeAddress,
        orderType,
        side,
        symbol[0],
        symbol[1],
        amount,
        price,
        timestamp,
        clientOrderId,
        mainAddress
      );

      const signature = signPayload(api, keyringPair, order);
      const payload = JSON.stringify({ PlaceOrder: [order, signature] });

      await appsyncOrderbookService.operation.placeOrder({
        payload,
        token: tradeAddress,
      });
    },
    onError: (error: Error) => onHandleError?.(error.message),
    onSuccess: () => onHandleAlert("Order placed"),
  });
};
