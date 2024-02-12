"use client";

import { Market } from "@orderbook/core/utils/orderbookService/types";

import { BuyOrder } from "./buy";
import { SellOrder } from "./sell";

export const MarketOrder = ({
  market,
  availableQuoteAmount,
  availableBaseAmount,
}: {
  market?: Market;
  availableQuoteAmount: number;
  availableBaseAmount: number;
}) => {
  return (
    <div className="flex flex-auto gap-2 flex-wrap">
      <BuyOrder
        market={market}
        availableQuoteAmount={Number(availableQuoteAmount)}
      />
      <SellOrder
        market={market}
        availableBaseAmount={Number(availableBaseAmount)}
      />
    </div>
  );
};
