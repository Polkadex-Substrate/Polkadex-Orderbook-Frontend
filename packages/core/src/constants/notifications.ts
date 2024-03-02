import { Order } from "@orderbook/core/utils/orderbookService";
import { NotificationPayload } from "@orderbook/core/providers/public/settings";

export const NOTIFICATIONS = {
  placeOrder: (order: Order): NotificationPayload => {
    const isSell = order.side === "Ask";
    const type = order.type.charAt(0) + order.type.toLowerCase().slice(1);
    const side = isSell ? "Sell" : "Buy";
    return {
      category: "General",
      message: `${type} ${side} Order Placed`,
      description: `Placed exchange ${type.toLowerCase()} ${side.toLowerCase()} order for ${order.quantity} ${order.market.baseAsset.ticker} by using ${order.market.quoteAsset.ticker}`,
      type: "Success",
    };
  },
};
