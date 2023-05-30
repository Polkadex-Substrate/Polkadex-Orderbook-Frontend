import { useCallback, useEffect, useRef } from "react";

import {
  ChartingLibraryWidgetOptions,
  DatafeedConfiguration,
  LibrarySymbolInfo,
  ResolutionString,
  widget as Widget,
} from "../../../../public/static/charting_library";

import * as S from "./styles";

import { useKlineProvider } from "@polkadex/orderbook/providers/public/klineProvider/useKlineProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";

const configurationData: DatafeedConfiguration = {
  supported_resolutions: ["1", "5", "15", "30", "60", "360", "1D", "1W"] as ResolutionString[],
  exchanges: [
    {
      value: "Polkadex",
      name: "Polkadex",
      desc: "Polkadex",
    },
  ],
  symbols_types: [
    {
      name: "crypto",
      value: "crypto",
    },
  ],
};

async function getAllSymbols() {
  const allSymbols = [
    {
      description: "PDEX/CUSDT",
      exchange: "Polkadex",
      full_name: "Polkadex:PDEX/CUSDT",
      symbol: "PDEX/CUSDT",
      type: "crypto",
    },
  ];

  return allSymbols;
}

export const TradingView = () => {
  const { onHandleKlineFetch, onFetchKlineChannel, last } = useKlineProvider();
  const { currentMarket } = useMarketsProvider();

  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const getData = useCallback(
    async (resolution, from, to) => {
      try {
        const klines = await onHandleKlineFetch({
          market: currentMarket.m,
          resolution: resolution,
          from: new Date(from * 1000),
          to: new Date(to * 1000),
        });

        onFetchKlineChannel({ market: currentMarket.m, interval: resolution });

        if (klines.length === 0) {
          return [];
        }

        const bars = klines.map((bar) => {
          return {
            time: bar.timestamp,
            low: bar.low,
            high: bar.high,
            open: bar.open,
            close: bar.close,
            volume: bar.volume,
            isBarClosed: true,
            isLastBar: false,
          };
        });
        bars.push({
          time: last.kline.timestamp,
          low: last.kline.low,
          high: last.kline.high,
          open: last.kline.open,
          close: last.kline.close,
          volume: last.kline.volume,
          isBarClosed: false,
          isLastBar: true,
        });
        if (bars.length < 1) {
          return [];
        } else {
          return bars;
        }
      } catch (error) {
        return error;
      }
    },
    [
      currentMarket.m,
      onHandleKlineFetch,
      onFetchKlineChannel,
      last?.kline?.close,
      last?.kline?.open,
      last?.kline?.low,
      last?.kline?.high,
      last?.kline?.timestamp,
      last?.kline?.volume,
    ]
  );

  useEffect(() => {
    const widgetOptions: ChartingLibraryWidgetOptions = {
      datafeed: {
        onReady(callback) {
          setTimeout(() => callback(configurationData), 0);
        },
        async searchSymbols(userInput, exchange, symbolType, onResult) {
          const symbols = await getAllSymbols();
          const newSymbols = symbols.filter((symbol) => {
            const isExchangeValid = exchange === "" || symbol.exchange === exchange;
            const isFullSymbolContainsInput =
              symbol.full_name.toLowerCase().indexOf(userInput.toLowerCase()) !== -1;
            return isExchangeValid && isFullSymbolContainsInput;
          });
          setTimeout(() => {
            onResult(newSymbols);
          }, 0);
        },
        async resolveSymbol(symbolName, onResolve, onError, extension) {
          const symbols = await getAllSymbols();
          const symbolItem = symbols.find(({ full_name }) => full_name === symbolName);
          if (!symbolItem) {
            onError("cannot resolve symbol");
            return;
          }
          const symbolInfo = {
            ticker: symbolItem.full_name,
            name: symbolItem.symbol,
            description: symbolItem.description,
            type: symbolItem.type,
            session: "24x7",
            timezone: "Etc/UTC",
            exchange: symbolItem.exchange,
            minmov: 1,
            pricescale: 100,
            has_intraday: true,
            visible_plots_set: "ohlcv",
            has_daily: true,
            has_weekly_and_monthly: true,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: "streaming",
          };

          setTimeout(() => {
            onResolve(symbolInfo as LibrarySymbolInfo);
          }, 0);
        },
        async getBars(symbolInfo, resolution, periodParams, onResult, onError) {
          const { from, to } = periodParams;
          try {
            const bars = await getData(resolution, from, to);
            if (bars.length < 1) {
              setTimeout(() => {
                onResult([], { noData: true });
              }, 0);
            } else {
              setTimeout(() => {
                onResult(bars, { noData: false });
              }, 0);
            }
          } catch (error) {
            onError(error);
          }
        },
        subscribeBars(
          symbolInfo,
          resolution,
          onTick,
          listenerGuid,
          onResetCacheNeededCallback
        ) {
          onFetchKlineChannel({ market: currentMarket.m, interval: resolution });
        },
        unsubscribeBars(listenerGuid) {
          console.log("[unsubscribeBars]: Method call with subscriberUID:", listenerGuid);
        },
      },
      theme: "Dark",
      interval: "1D" as ResolutionString,
      library_path: "/static/charting_library/",
      locale: "en",
      timezone: "Asia/Kolkata",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
      container: chartContainerRef.current,
      disabled_features: ["use_localstorage_for_settings"],
      enabled_features: ["study_templates"],
      symbol: "Polkadex:PDEX/CUSDT",
    };

    const tvWidget = new Widget(widgetOptions);

    return () => {
      tvWidget.remove();
    };
  }, [currentMarket.m, onHandleKlineFetch, getData, onFetchKlineChannel]);

  return <S.Wrapper ref={chartContainerRef}></S.Wrapper>;
};
