import { useMemo } from "react";
import { useMarkets, useTickers } from "@orderbook/core/hooks";
import { isNegative } from "@orderbook/core/helpers";
import classNames from "classnames";

import { MarketCard } from "./marketCard";

type Props = {
  pair?: string;
  market?: string;
  change: number;
  price: number;
  positive: boolean;
};

export const Markets = () => {
  const { list: markets } = useMarkets();
  const { tickers } = useTickers();

  const data: Props[] = useMemo(() => {
    return tickers.map((ticker) => {
      const market = markets.find((m) => m.id === ticker.market);
      const positive = !isNegative(ticker.priceChangePercent24Hr.toString());
      return {
        pair: market?.baseAsset?.ticker,
        market: market?.quoteAsset?.ticker,
        change: Math.abs(ticker.priceChangePercent24Hr),
        price: ticker.currentPrice,
        positive,
      };
    });
  }, [markets, tickers]);

  const length = useMemo(() => data.length, [data.length]);

  return (
    <div className="overflow-hidden">
      <div
        className={classNames(
          "inline-flex gap-4",
          length > 4 && "animate-infiniteHorizontalScroll"
        )}
      >
        <AllMarkets data={data} />
        {length > 4 && <AllMarkets data={data} />}
      </div>
    </div>
  );
};

const AllMarkets = ({ data }: { data: Props[] }) => (
  <div className="inline-flex gap-2">
    {data.map(
      ({ market, pair, change, price, positive }) =>
        pair &&
        market && (
          <MarketCard
            key={`${market}/${pair}`}
            pair={pair}
            market={market}
            change={change}
            price={price}
            positive={positive}
          />
        )
    )}
  </div>
);
