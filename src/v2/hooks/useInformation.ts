import { getSymbolFromId, isNegative } from "../helpers";

import { selectCurrentMarket, selectMarketTickers } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";

const defaultTicker = {
  amount: 0,
  low: 0,
  last: 0,
  high: 0,
  volume: 0,
  price_change_percent: "+0.00%",
};

export function useInformation() {
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const marketTickers = useReduxSelector(selectMarketTickers);

  const getTickerValue = (value: string) =>
    (marketTickers[currentMarket?.id] || defaultTicker)[value];

  return {
    pairName: currentMarket?.name,
    pairTicker: currentMarket?.tokenTickerName,
    quoteUnit: getSymbolFromId("quote", currentMarket?.symbolArray),
    lastPrice: Decimal.format(getTickerValue("last"), currentMarket?.price_precision, ","),
    volume24h: Decimal.format(getTickerValue("volume"), currentMarket?.price_precision, ","),
    priceHigh: Decimal.format(getTickerValue("high"), currentMarket?.price_precision, ","),
    priceLow: Decimal.format(getTickerValue("low"), currentMarket?.price_precision, ","),
    price24h: getTickerValue("price_change_percent"),
    isNegative: isNegative(getTickerValue("price_change_percent")),
  };
}
