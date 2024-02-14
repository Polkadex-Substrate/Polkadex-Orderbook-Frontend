// TODO: Missing total
"use client";

import { Market } from "@orderbook/core/utils/orderbookService/types";
import { useOrders } from "@orderbook/core/providers/user/orders";

import { BuyOrder } from "./buy";
import { SellOrder } from "./sell";

export const LimitOrder = ({
  market,
  availableQuoteAmount,
  availableBaseAmount,
}: {
  market?: Market;
  availableQuoteAmount: number;
  availableBaseAmount: number;
}) => {
  const { currentPrice, amount } = useOrders();

  return (
    <div className="flex flex-auto gap-2 flex-wrap">
      <BuyOrder
        market={market}
        availableQuoteAmount={availableQuoteAmount}
        currentPrice={currentPrice}
        amount={amount}
      />
      <SellOrder
        market={market}
        availableBaseAmount={availableBaseAmount}
        currentPrice={currentPrice}
        amount={amount}
      />
    </div>
  );
};
