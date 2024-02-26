// TODO: Missing total
"use client";

import { Market } from "@orderbook/core/utils/orderbookService/types";
import { useProfile } from "@orderbook/core/providers/user/profile";

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
  const { price, amount, total } = useProfile();
  return (
    <div className="flex flex-auto gap-2 flex-wrap">
      <BuyOrder
        market={market}
        availableQuoteAmount={availableQuoteAmount}
        price={price}
        amount={amount}
        total={total}
      />
      <SellOrder
        market={market}
        availableBaseAmount={availableBaseAmount}
        price={price}
        amount={amount}
        total={total}
      />
    </div>
  );
};
