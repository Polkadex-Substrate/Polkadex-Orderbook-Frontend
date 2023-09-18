import {
  Ticker,
  TickerQueryResult,
} from "@orderbook/core/providers/public/marketsProvider";

export const convertToTicker = (
  elem: TickerQueryResult,
  market: string,
): Ticker => {
  const priceChange = Number(elem.c) - Number(elem.o);
  const priceChangePercent = (priceChange / Number(elem.o)) * 100;
  return {
    m: market,
    priceChange24Hr: priceChange,
    priceChangePercent24Hr: priceChangePercent,
    open: Number(elem.o),
    close: Number(elem.c),
    high: Number(elem.h),
    low: Number(elem.l),
    volumeBase24hr: Number(elem.vb),
    volumeQuote24Hr: Number(elem.vq),
  };
};
