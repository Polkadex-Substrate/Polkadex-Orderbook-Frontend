import { TickerQueryResult } from "../providers/public/marketsProvider";

export const convertToTicker = (elem: TickerQueryResult, market: string) => {
  const priceChange = Number(elem.c) - Number(elem.o);
  const priceChangePercent = (priceChange / Number(elem.o)) * 100;
  return {
    m: market,
    priceChange24Hr: priceChange,
    priceChangePercent24Hr: priceChangePercent,
    open: elem.o,
    close: elem.c,
    high: elem.h,
    low: elem.l,
    volumeBase24hr: elem.vb,
    volumeQuote24Hr: elem.vq,
  };
};
