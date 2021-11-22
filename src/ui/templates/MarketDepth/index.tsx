import React, { useMemo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";

import * as S from "./styles";

import {
  // selectChartRebuildState,
  selectCurrentColorTheme,
  selectCurrentMarket,
  selectDepthAsks,
  selectDepthBids,
  selectOrderBookLoading,
} from "@polkadex/orderbook-modules";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { MarketDepths } from "@polkadex/orderbook-ui/molecules";

export const MarketDepth = () => {
  const asksItems = useSelector(selectDepthAsks);
  const bidsItems = useSelector(selectDepthBids);
  // const chartRebuild = useSelector(selectChartRebuildState);
  const colorTheme = useSelector(selectCurrentColorTheme);
  const currentMarket = useSelector(selectCurrentMarket);
  const loading = useSelector(selectOrderBookLoading);

  const settings = useMemo(() => {
    return {
      tooltip: true,
      dataKeyX: "price",
      dataKeyY: "cumulativeVolume",
    };
  }, []);

  const tipLayout = useCallback(
    ({ volume, price, cumulativeVolume, cumulativePrice }) => {
      const [askCurrency, bidCurrency] = [
        currentMarket.base_unit.toUpperCase(),
        currentMarket.quote_unit.toUpperCase(),
      ];

      return (
        <S.Tooltip>
          <span>
            {Decimal.format(price, currentMarket.price_precision)} {bidCurrency}
          </span>
          <span>
            {Decimal.format(volume, currentMarket.amount_precision)} {askCurrency}
          </span>
          <span>
            {Decimal.format(cumulativeVolume, currentMarket.amount_precision)} {askCurrency}
          </span>
          <span>
            {Decimal.format(cumulativePrice, currentMarket.price_precision)} {bidCurrency}
          </span>
        </S.Tooltip>
      );
    },
    [currentMarket]
  );

  const cumulative = useCallback(
    (data, type) => {
      let cumulativeVolumeData = 0;
      let cumulativePriceData = 0;

      return data.map((item, index) => {
        const [price, volume] = item;
        const numberVolume = Decimal.format(volume, currentMarket.amount_precision);
        const numberPrice = Decimal.format(price, currentMarket.price_precision);

        cumulativeVolumeData = +numberVolume + cumulativeVolumeData;
        cumulativePriceData = cumulativePriceData + +numberPrice * +numberVolume;

        return {
          [type]: Decimal.format(cumulativeVolumeData, currentMarket.amount_precision),
          cumulativePrice: Decimal.format(cumulativePriceData, currentMarket.price_precision),
          cumulativeVolume: +Decimal.format(
            cumulativeVolumeData,
            currentMarket.amount_precision
          ),
          volume: Decimal.format(+volume, currentMarket.amount_precision),
          price: Decimal.format(+numberPrice, currentMarket.price_precision),
          name: tipLayout({
            volume,
            price,
            cumulativeVolume: cumulativeVolumeData,
            cumulativePrice: cumulativePriceData,
          }),
        };
      });
    },
    [currentMarket]
  );

  const convertToCumulative = useCallback((data, type) => {
    const cumulativeData = cumulative(data, type);

    return type === "bid"
      ? cumulativeData.sort((a, b) => b.bid - a.bid)
      : cumulativeData.sort((a, b) => a.ask - b.ask);
  }, []);

  const convertToDepthFormat = useMemo(() => {
    const resultLength =
      asksItems.length > bidsItems.length ? bidsItems.length : asksItems.length;

    const asks = asksItems.slice(0, resultLength);
    const bids = bidsItems.slice(0, resultLength);

    const asksVolume = convertToCumulative(asks, "ask");
    const bidsVolume = convertToCumulative(bids, "bid");

    return [...bidsVolume, ...asksVolume];
  }, [asksItems, bidsItems]);

  const renderMarketDepths = useMemo(() => {
    return (
      <MarketDepths
        settings={settings}
        className="pg-market-depth"
        data={convertToDepthFormat}
        colorTheme={colorTheme}
      />
    );
  }, [settings, colorTheme, asksItems, bidsItems]);

  if (loading) {
    return null;
  }

  return <S.Wrapper>{renderMarketDepths}</S.Wrapper>;
};
