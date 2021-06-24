import { Decimal } from "src/components";
import { useReduxSelector } from "src/hooks";
import { selectCurrentMarket, selectMarketTickers } from "src/modules";

const defaultTicker = {
  amount: 0,
  low: 0,
  last: 0,
  high: 0,
  volume: 0,
  price_change_percent: "+0.00%",
};

const useCurrentMarket = () => {
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const marketTickers = useReduxSelector(selectMarketTickers);

  const getTickerValue = (value: string) =>
    (marketTickers[currentMarket?.id] || defaultTicker)[value];

  const getInformationValue = (value: "last" | "volume" | "high" | "low") =>
    `${Decimal.format(
      Number(getTickerValue(value)),
      currentMarket?.price_precision,
      ","
    )} ${bidUnit}`;

  const bidUnit = currentMarket?.quote_unit.toUpperCase();

  const isPositive =
    currentMarket && /\+/.test(getTickerValue("price_change_percent"));

  return {
    currentMarket,
    marketTickers,
    getInformationValue,
    isPositive,
    defaultTicker,
  };
};

export default useCurrentMarket;
