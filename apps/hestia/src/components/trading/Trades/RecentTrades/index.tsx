// TODO: Check table scroll
// TODO: Improve no data message

"use client";

import { MIN_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";
import {
  decimalPlaces,
  getCurrentMarket,
  useMarkets,
  useRecentTrades,
} from "@orderbook/core/index";

import { RecentTradesModule } from "./module";

export const RecentTrades = ({ id }: { id: string }) => {
  const { list: allMarkets } = useMarkets();
  const currentMarket = getCurrentMarket(allMarkets, id);

  const quoteTicker = currentMarket?.quoteAsset?.ticker ?? "";
  const baseTicker = currentMarket?.baseAsset?.ticker ?? "";

  const pricePrecision =
    (currentMarket && decimalPlaces(currentMarket.price_tick_size)) ??
    MIN_DIGITS_AFTER_DECIMAL;

  const amountPrecision =
    (currentMarket && decimalPlaces(currentMarket.qty_step_size)) ??
    MIN_DIGITS_AFTER_DECIMAL;

  const { isDecreasing, list } = useRecentTrades(currentMarket?.id as string);

  const precision = Math.max(pricePrecision, amountPrecision);

  return (
    <RecentTradesModule
      quoteTicker={quoteTicker}
      baseTicker={baseTicker}
      precision={precision}
      isDecreasing={isDecreasing}
      data={list}
    />
  );
};
