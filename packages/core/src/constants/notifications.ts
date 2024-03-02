import {
  Order,
  OrderSide,
  OrderType,
} from "@orderbook/core/utils/orderbookService";
import { NotificationPayload } from "@orderbook/core/providers/public/settings";

export const NOTIFICATIONS = {
  placeOrder: (
    _side: OrderSide,
    _type: OrderType,
    quantity: number,
    baseTicker: string,
    quoteTicker: string
  ): NotificationPayload => {
    const isSell = _side === "Ask";
    const side = isSell ? "Sell" : "Buy";
    const type = _type.charAt(0) + _type.toLowerCase().slice(1);
    return {
      category: "General",
      message: `${type} ${side} Order Placed`,
      description: `Placed exchange ${type.toLowerCase()} ${side.toLowerCase()} order for ${quantity} ${baseTicker} by using ${quoteTicker}`,
      type: "Success",
    };
  },
  partialFilledOrder: (order: Order): NotificationPayload => {
    const isSell = order.side === "Ask";
    const type = order.type.charAt(0) + order.type.toLowerCase().slice(1);
    const side = isSell ? "Sell" : "Buy";
    return {
      category: "General",
      message: `${type} ${side} Order Partially Filled`,
      description: `Partial filled exchange ${type.toLowerCase()} ${side.toLowerCase()} order for ${order.quantity} ${order.market.baseAsset.ticker} by using ${order.market.quoteAsset.ticker}`,
      type: "Information",
    };
  },
  filledOrder: (order: Order): NotificationPayload => {
    const isSell = order.side === "Ask";
    const type = order.type.charAt(0) + order.type.toLowerCase().slice(1);
    const side = isSell ? "Sell" : "Buy";
    return {
      category: "General",
      message: `${type} ${side} Order Filled`,
      description: `Filled exchange ${type.toLowerCase()} ${side.toLowerCase()} order for ${order.quantity} ${order.market.baseAsset.ticker} by using ${order.market.quoteAsset.ticker}`,
      type: "Information",
    };
  },
};
