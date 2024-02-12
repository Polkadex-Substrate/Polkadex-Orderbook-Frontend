"use client";

import { useMemo, useState } from "react";
import { Decimal } from "@orderbook/core/utils";
import {
  getChainFromTicker,
  hasOnlyZeros,
  isNegative,
} from "@orderbook/core/helpers";
import { useMarkets, useTickers } from "@orderbook/core/hooks";
import { Market } from "@orderbook/core/utils/orderbookService";

import { Asset } from "./asset";
import { Card } from "./card";

export const AssetInfo = ({ currentMarket }: { currentMarket?: Market }) => {
  const [state, setState] = useState("USDT");

  const { currentTicker, tickerLoading } = useTickers(currentMarket?.id);
  const { loading } = useMarkets();

  const currentPrice = currentTicker?.close ?? "0.00";
  const baseTicker = currentMarket?.baseAsset?.ticker ?? "";
  const quoteTicker = currentMarket?.quoteAsset?.ticker ?? "";

  const changeFormatted = useMemo(
    () =>
      Decimal.format(Number(currentTicker.priceChangePercent24Hr), 2, ",") +
      "%",
    [currentTicker.priceChangePercent24Hr]
  );

  const volumeFormatted = useMemo(
    () =>
      Decimal.format(
        Number(currentTicker?.quoteVolume),
        currentMarket?.quotePrecision ?? 0,
        ","
      ),
    [currentTicker?.quoteVolume, currentMarket?.quotePrecision]
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
  const chainName = useMemo(
    () => getChainFromTicker(currentMarket?.baseAsset?.ticker as string),
    [currentMarket?.baseAsset?.ticker]
  );

  return (
    <div className="flex gap-3 flex-wrap border-b border-primary py-2">
      <Asset
        baseTicker={baseTicker}
        quoteTicker={quoteTicker}
        tokenName={chainName}
        loading={tickerLoading || loading}
      />
      <div className="flex flex-1 flex-wrap gap-3 justify-between px-3 py-1 min-w-[20rem]">
        <Card.Single
          label={`Price ${quoteTicker}`}
          color={negative ? "red" : "green"}
          loading={tickerLoading || loading}
        >
          {priceFormatted}
        </Card.Single>
        <Card.Single
          label="24h Change"
          color={negative ? "red" : "green"}
          loading={tickerLoading || loading}
        >
          {changeFormatted}
        </Card.Single>
        <Card.Single label="24h High" loading={tickerLoading || loading}>
          {currentTicker?.high}
        </Card.Single>
        <Card.Single label="24 Low" loading={tickerLoading || loading}>
          {currentTicker?.low}
        </Card.Single>
        <Card.WithDropdown
          label="24 Volume"
          items={[quoteTicker]}
          selected={state}
          onChange={(e: string) => setState(e)}
          loading={tickerLoading || loading}
        >
          {volumeFormatted}
        </Card.WithDropdown>
      </div>
    </div>
  );
};
