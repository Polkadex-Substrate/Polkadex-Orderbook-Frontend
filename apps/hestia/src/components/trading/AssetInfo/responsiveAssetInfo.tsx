import { Loading, Skeleton, Typography } from "@polkadex/ux";
import { useMemo, useState } from "react";
import { Decimal } from "@orderbook/core/utils";
import { hasOnlyZeros, isNegative } from "@orderbook/core/helpers";
import { useMarkets, useTickers } from "@orderbook/core/hooks";
import { Market } from "@orderbook/core/utils/orderbookService";
import { RiArrowDownSLine } from "@remixicon/react";

import { Card } from "./card";

export const ResponsiveAssetInfo = ({
  currentMarket,
}: {
  currentMarket?: Market;
}) => {
  const { currentTicker, tickerLoading } = useTickers(currentMarket?.id);
  const { loading } = useMarkets();

  const currentPrice = currentTicker?.close ?? "0.00";

  const changeFormatted = useMemo(
    () =>
      Decimal.format(Number(currentTicker.priceChangePercent24Hr), 2, ",") +
      "%",
    [currentTicker.priceChangePercent24Hr]
  );

  const volumeFormattedQuote = useMemo(
    () =>
      Decimal.format(
        Number(currentTicker?.quoteVolume),
        currentMarket?.quotePrecision ?? 0,
        ","
      ),
    [currentTicker?.quoteVolume, currentMarket?.quotePrecision]
  );

  const volumeFormattedBase = useMemo(
    () =>
      Decimal.format(
        Number(currentTicker?.baseVolume),
        currentMarket?.basePrecision ?? 0,
        ","
      ),
    [currentTicker?.baseVolume, currentMarket?.basePrecision]
  );

  const priceFormatted = useMemo(
    () =>
      hasOnlyZeros(currentPrice.toString())
        ? currentTicker?.currentPrice
        : currentPrice,
    [currentTicker?.currentPrice, currentPrice]
  );

  const negative = useMemo(
    () => isNegative(changeFormatted.toString()),
    [changeFormatted]
  );

  return (
    <div className="flex p-2 border-b border-primary">
      <div className="flex flex-1 flex-col gap-2">
        <div className="flex gap-2">
          <div className="flex flex-col">
            <Typography.Text size="lg" bold>
              PDEX
            </Typography.Text>
            <Typography.Text size="xs" appearance="primary">
              /USDT
            </Typography.Text>
          </div>
          <RiArrowDownSLine className="w-5 h-5 mt-1 text-primary" />
        </div>
        <div className="flex flex-col">
          <Skeleton loading={tickerLoading || loading}>
            <Typography.Text
              size="lg"
              bold
              appearance={negative ? "danger" : "success"}
            >
              {priceFormatted}
            </Typography.Text>
          </Skeleton>
          <Skeleton loading={tickerLoading || loading}>
            <Typography.Text appearance={negative ? "danger" : "success"}>
              {changeFormatted}
            </Typography.Text>
          </Skeleton>
        </div>
      </div>
      <div className="flex gap-8">
        <div className="flex flex-col">
          <Card.Single label="24h High" loading={tickerLoading || loading}>
            {currentTicker?.high}
          </Card.Single>
          <Card.Single label="24 Low" loading={tickerLoading || loading}>
            {currentTicker?.low}
          </Card.Single>
        </div>
        <div className="flex flex-col">
          <Card.Single
            label={`24 Volume ${currentMarket?.baseAsset.ticker}`}
            loading={tickerLoading || loading}
          >
            {volumeFormattedBase}
          </Card.Single>
          <Card.Single
            label={`24 Volume ${currentMarket?.quoteAsset.ticker}`}
            loading={tickerLoading || loading}
          >
            {volumeFormattedQuote}
          </Card.Single>
        </div>
      </div>
    </div>
  );
};
