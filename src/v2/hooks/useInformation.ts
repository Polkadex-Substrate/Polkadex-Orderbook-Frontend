import { getSymbolFromId, isNegative } from "../helpers";

import { selectCurrentMarket, selectCurrentMarketTickers } from "@polkadex/orderbook-modules";
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
  const currTicker = useReduxSelector(selectCurrentMarketTickers);

  const getTickerValue = (value: string) => {
    if (currTicker && Object.keys(currTicker).includes(value)) {
      return currTicker[value];
    }
    return "0";
  };
  return {
    pairName: currentMarket?.name,
    pairTicker: currentMarket?.tokenTickerName,
    quoteUnit: currentMarket?.quote_ticker,
    baseUnit: currentMarket?.base_ticker,
    lastPrice: Decimal.format(getTickerValue("last"), currentMarket?.price_precision, ","),
    volume24h: Decimal.format(getTickerValue("volume"), currentMarket?.price_precision, ","),
    priceHigh: Decimal.format(getTickerValue("high"), currentMarket?.price_precision, ","),
    priceLow: Decimal.format(getTickerValue("low"), currentMarket?.price_precision, ","),
    price24h: getTickerValue("price_change_percent"),
    isNegative: isNegative(getTickerValue("price_change_percent")),
  };
}
