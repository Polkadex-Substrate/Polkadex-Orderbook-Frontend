import { useMutation } from "@tanstack/react-query";
import { useUserAccounts } from "@polkadex/react-providers";
import {
  createOrderPayload,
  formatNumber,
  getNewClientId,
  getNonce,
  isValidAddress,
  signPayload,
} from "@orderbook/core/helpers";

import {
  OrderSide,
  OrderType,
  Market,
  appsyncOrderbookService,
} from "../utils/orderbookService";
import { useSettingsProvider } from "../providers/public/settings";
import { useProfile } from "../providers/user/profile";
import { useNativeApi } from "../providers/public/nativeApi";
import { NOTIFICATIONS } from "../constants";

type CreateOrderArgs = {
  symbol: string[];
  side: OrderSide;
  price: string;
  orderType: OrderType;
  amount: number;
  market: Market;
};

export const useCreateOrder = () => {
  const { wallet } = useUserAccounts();
  const { onHandleError, onHandleAlert, onPushNotification } =
    useSettingsProvider();
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();
  const { api } = useNativeApi();

  return useMutation({
    mutationFn: async (args: CreateOrderArgs) => {
      const { symbol, side, price, orderType, amount } = args;
      if (!api?.isConnected)
        throw new Error("You are not connected to blockchain");

      const keyringPair = wallet.getPair(tradeAddress);
      if (!isValidAddress(tradeAddress) || !keyringPair)
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
        formatNumber(price),
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

      return args;
    },
    onError: (error: Error) => onHandleError?.(error.message),
    onSuccess: (order: CreateOrderArgs) => {
      const { side, orderType, amount, market } = order;
      onHandleAlert("Order placed");
      onPushNotification(
        NOTIFICATIONS.placeOrder(
          side,
          orderType,
          amount,
          market.baseAsset.ticker,
          market.quoteAsset.ticker
        )
      );
    },
  });
};
