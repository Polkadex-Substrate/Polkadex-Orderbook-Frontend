import { useMemo } from "react";
import { useMarkets, useTickers } from "@orderbook/core/hooks";
import { isNegative } from "@orderbook/core/helpers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import classNames from "classnames";

import { SkeletonCollection } from "../ReadyToUse";

import { MarketCard } from "./marketCard";

type Props = {
  pair: string;
  market: string;
  change: number;
  price: number;
  positive: boolean;
};

export const Markets = ({ favorite }: { favorite: boolean }) => {
  const { list: allMarkets, loading } = useMarkets();
  const { tickers, tickerLoading } = useTickers();
  const { favoriteMarkets: favouriteMarketIds } = useProfile();

  const selectedMarkets = useMemo(() => {
    if (favorite)
      return allMarkets.filter((m) => favouriteMarketIds.includes(m.id));
    else return allMarkets;
  }, [allMarkets, favorite, favouriteMarketIds]);

  const data: Props[] = useMemo(() => {
    return tickers
      .map((ticker) => {
        const market = selectedMarkets.find((m) => m.id === ticker.market);
        const positive = !isNegative(ticker.priceChangePercent24Hr.toString());
        if (market) {
          return {
            pair: market?.baseAsset?.ticker,
            market: market?.quoteAsset?.ticker,
            change: Math.abs(ticker.priceChangePercent24Hr),
            price: ticker.currentPrice,
            positive,
          };
        }
        return {} as Props;
      })
      .filter((t) => t.market && t.pair);
  }, [selectedMarkets, tickers]);

  const isCarouselActive = useMemo(() => data.length > 3, [data.length]);

  if (loading || tickerLoading)
    return (
      <div
        className={classNames(
          "flex items-center px-2",
          "[&>div]:flex-row",
          "[&>div]:p-0"
        )}
      >
        <SkeletonCollection rows={3} className="w-40 h-3" />
      </div>
    );

  return (
    <div className="overflow-hidden">
      <div
        className={classNames(
          "inline-flex gap-4",
          isCarouselActive && "animate-infiniteHorizontalScroll"
        )}
      >
        <AllMarkets data={data} />
        {isCarouselActive && <AllMarkets data={data} />}
      </div>
    </div>
  );
};

const AllMarkets = ({ data }: { data: Props[] }) => (
  <div className="inline-flex gap-2">
    {data.map(({ market, pair, change, price, positive }) => (
      <MarketCard
        key={`${market}/${pair}`}
        pair={pair}
        market={market}
        change={change}
        price={price}
        positive={positive}
      />
    ))}
  </div>
);
