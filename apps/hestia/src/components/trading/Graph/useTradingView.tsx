"use client";
import { useCallback, useMemo, useRef, useState } from "react";
import { TradingView as TradingViewConstants } from "@orderbook/core/constants";
import {
  decimalPlaces,
  fetchCandles,
  getCurrentMarket,
} from "@orderbook/core/helpers";
import { useMarkets } from "@orderbook/core/index";
import { useSubscription } from "@orderbook/core/providers/user/subscription";

import {
  ChartingLibraryWidgetOptions,
  IChartingLibraryWidget,
  LibrarySymbolInfo,
  ResolutionString,
} from "../../../../public/static/charting_library/charting_library";

import { configurationData, defaultWidgetOptions } from "./config";

export function useTradingView({ id }: { id: string }) {
  const tvWidget = useRef<IChartingLibraryWidget>();

  const [isReady, setIsReady] = useState(false);
  const [resolution, setResolution] = useState<ResolutionString>(
    (localStorage.getItem(TradingViewConstants.lastResolution) ??
      "60") as ResolutionString
  );

  const { onCandleSubscribe } = useSubscription();
  const { list } = useMarkets();
  const currentMarket = getCurrentMarket(list, id);

  const getAllSymbols = useCallback(() => {
    const allSymbols = list?.map((market) => ({
      description: market?.name,
      exchange: "Polkadex",
      full_name: `Polkadex:${market?.name}`,
      symbol: market?.name,
      type: "crypto",
    }));

    return allSymbols;
  }, [list]);

  const widgetOptions = useMemo(() => {
    return {
      datafeed: {
        onReady(callback) {
          setTimeout(() => callback(configurationData), 0);
        },
        async searchSymbols(userInput, exchange, symbolType, onResult) {
          const symbols = getAllSymbols();
          const newSymbols = symbols.filter((symbol) => {
            const isExchangeValid =
              exchange === "" || symbol.exchange === exchange;
            const isFullSymbolContainsInput =
              symbol.full_name
                .toLowerCase()
                .indexOf(userInput.toLowerCase()) !== -1;
            return isExchangeValid && isFullSymbolContainsInput;
          });
          setTimeout(() => onResult(newSymbols), 0);
        },
        async resolveSymbol(symbolName, onResolve, onError) {
          const symbols = getAllSymbols();
          const symbolItem = symbols.find(
            ({ full_name: fullName }) => fullName === symbolName
          );
          if (!symbolItem) {
            onError("cannot resolve symbol");
            return;
          }

          const pricePrecision = decimalPlaces(
            currentMarket?.price_tick_size ?? 1
          );
          const pricescale = Math.pow(10, pricePrecision);

          const symbolInfo = {
            ticker: symbolItem.full_name,
            name: symbolItem.symbol,
            description: symbolItem.description,
            type: symbolItem.type,
            session: "24x7",
            timezone: "Etc/UTC",
            exchange: symbolItem.exchange,
            minmov: 1,
            pricescale,
            has_intraday: true,
            visible_plots_set: "ohlcv",
            has_daily: true,
            has_weekly_and_monthly: true,
            supported_resolutions: configurationData.supported_resolutions,
            volume_precision: 2,
            data_status: "streaming",
          };

          setTimeout(() => onResolve(symbolInfo as LibrarySymbolInfo), 0);
        },
        async getBars(symbolInfo, resolution, periodParams, onResult, onError) {
          const { from, to } = periodParams;
          try {
            if (!currentMarket?.id) return onResult([], { noData: true });

            const bars = await fetchCandles({
              market: currentMarket?.id,
              resolution: resolution,
              from: new Date(from * 1000),
              to: new Date(to * 1000),
            });
            if (bars.length < 1) {
              return onResult([], { noData: true });
            } else {
              return onResult(bars, { noData: false });
            }
          } catch (error) {
            console.log(error);
            if (error instanceof Error) {
              onError(error.message ?? error);
            }
          }
        },
        subscribeBars(symbolInfo, resolution, onTick) {
          if (currentMarket?.id) {
            onCandleSubscribe({
              market: currentMarket?.id,
              interval: resolution,
              onUpdateTradingViewRealTime: onTick,
            });
          }
        },
        unsubscribeBars(listenerGuid) {
          console.log(
            "[unsubscribeBars]: Method call with subscriberUID:",
            listenerGuid
          );
        },
      },
      interval: resolution,
      locale: "en",
      timezone: "Asia/Kolkata",
      symbol: `Polkadex:${currentMarket?.name}`,
      ...defaultWidgetOptions,
    } as ChartingLibraryWidgetOptions;
  }, [
    currentMarket?.id,
    getAllSymbols,
    currentMarket?.name,
    onCandleSubscribe,
    currentMarket?.price_tick_size,
    resolution,
  ]);

  const onChangeResolution = (e: ResolutionString) =>
    tvWidget.current?.activeChart().setResolution(e, () =>
      setResolution(() => {
        localStorage.setItem(TradingViewConstants.lastResolution, e);
        return e;
      })
    );

  const onChangeFullScreen = () => tvWidget.current?.startFullscreen();
  const onScreenshot = async () => {
    const canvas = await tvWidget.current?.takeClientScreenshot();
    if (canvas) {
      const dataURL = canvas.toDataURL("image/jpeg");
      const downloadLink = document.createElement("a");
      downloadLink.download = "Polkadex-Orderbook-Chart" + ".jpg";
      downloadLink.href = dataURL;
      document.body.appendChild(downloadLink);
      downloadLink.click();
      document.body.removeChild(downloadLink);
    }
  };
  const onChartReady = useCallback((v: boolean) => setIsReady(v), []);
  return {
    activeResolution: resolution,
    onChangeResolution,
    onChangeFullScreen,
    onScreenshot,
    tvWidget,
    widgetOptions,
    isChartReady: isReady,
    onChartReady,
  };
}
