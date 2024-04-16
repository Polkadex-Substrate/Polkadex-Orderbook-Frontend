"use client";

import { Market, Ticker } from "@orderbook/core/utils/orderbookService/types";

import { BuyOrder } from "./buy";
import { SellOrder } from "./sell";

export const MarketOrder = ({
  market,
  ticker,
  availableQuoteAmount,
  availableBaseAmount,
  isBuy,
  isResponsive,
}: {
  market?: Market;
  ticker: Ticker;
  availableQuoteAmount: number;
  availableBaseAmount: number;
  isBuy?: boolean;
  isResponsive?: boolean;
}) => {
  if (isResponsive)
    return isBuy ? (
      <BuyOrder
        market={market}
        availableQuoteAmount={availableQuoteAmount}
        isResponsive={isResponsive}
        ticker={ticker}
      />
    ) : (
      <SellOrder
        market={market}
        availableBaseAmount={availableBaseAmount}
        isResponsive={isResponsive}
        ticker={ticker}
      />
    );

  return (
    <div className="flex flex-auto gap-2 flex-wrap">
      <BuyOrder
        market={market}
        ticker={ticker}
        availableQuoteAmount={availableQuoteAmount}
      />
      <SellOrder
        market={market}
        ticker={ticker}
        availableBaseAmount={availableBaseAmount}
      />
    </div>
  );
};
