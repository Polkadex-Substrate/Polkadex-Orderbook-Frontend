// TODO: Re-render problem, do not use
import { useCallback, useEffect, useRef } from "react";
import { useDispatch } from "react-redux";

import {
  widgetOptions,
  widgetParams,
} from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/TradingView/config";
import { tradingFeautres } from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/TradingView/disableFeatures";
import { getTradingChartTimezone } from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/TradingView/timezones";
import {
  dataFeedObject,
  print,
} from "@polkadex/orderbook/file-to-delete/v2/ui/molecules/TradingView/api";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  IChartingLibraryWidget,
  LanguageCode,
} from "public/charting_library/charting_library.min";
import {
  stdTimezoneOffset,
  periodStringToMinutes,
  periodMinutesToString,
  resolutionToSeconds,
} from "@polkadex/web-helpers";
import {
  Market,
  selectChartRebuildState,
  selectCurrentColorTheme,
  selectCurrentMarket,
  selectKline,
  selectMarkets,
  klineSubscribe,
  klineUnsubscribe,
  klineUpdatePeriod,
  klineUpdateTimeRange,
  KlineEvent,
} from "@polkadex/orderbook-modules";
import { LibrarySymbolInfo } from "public/charting_library/datafeed-api";

const currentTimeOffset = new Date().getTimezoneOffset();
const clockPeriod = currentTimeOffset === stdTimezoneOffset(new Date()) ? "STD" : "DST";

export function useTradingView() {
  const dispatch = useDispatch();
  const markets = useReduxSelector(selectMarkets);
  const colorTheme = useReduxSelector(selectCurrentColorTheme);
  const chartRebuild = useReduxSelector(selectChartRebuildState);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const kline = useReduxSelector(selectKline);

  const tvWidget = useRef<IChartingLibraryWidget | null>(null);
  const currentKlineSubscription = useRef(null);
  const updateCb = useRef<{
    symbolInfo?: any;
    resolution: string;
    onRealtimeCallback: (value: KlineEvent) => void | undefined;
  }>({
    symbolInfo: {},
    resolution: "",
    onRealtimeCallback: undefined,
  });

  const tradeViewApi = {
    getTimescaleMarks: () => {
      const range = tvWidget?.current!.activeChart().getVisibleRange();
      const period = tvWidget?.current!.activeChart().resolution();
      dispatch(klineUpdateTimeRange(range));
      dispatch(klineUpdatePeriod(period));
    },
    subscribeBars: (symbolInfo: LibrarySymbolInfo, resolution, onRealtimeCallback) => {
      updateCb.current = {
        symbolInfo,
        resolution,
        onRealtimeCallback,
      };
      const marketId: string = symbolInfo.ticker!;
      const periodString = periodMinutesToString(resolutionToSeconds(resolution));
      dispatch(klineSubscribe({ marketId, period: periodString }));
      currentKlineSubscription.current = {
        marketId,
        periodString,
      };
    },
    unsubscribeBars: () => {
      const { marketId, periodString } = currentKlineSubscription?.current;
      if (marketId && periodString)
        dispatch(klineUnsubscribe({ marketId, period: periodString }));

      currentKlineSubscription.current = {};
    },
    onRealtimeCallback: () => {
      if (
        kline?.last &&
        kline?.marketId === currentKlineSubscription?.current?.marketId &&
        kline?.period === currentKlineSubscription?.current?.periodString
      ) {
        updateCb?.current?.onRealtimeCallback(kline.last);
      }
    },
  };

  const datafeed = useRef(dataFeedObject(tradeViewApi, markets));

  const isMobileDevice = false;
  /**
   * @description Set chart information
   */
  const setChart = useCallback(
    async (selectedMarket = currentMarket, themeColor = colorTheme) => {
      const { widget } = await import("public/charting_library/charting_library.min");

      if (kline.period) {
        widgetParams.interval = String(periodStringToMinutes(kline.period));
      }

      const defaultWidgetOptions = {
        symbol: currentMarket.id,
        datafeed: datafeed.current,
        interval: widgetParams.interval,
        container_id: widgetParams.containerId,
        locale: "en" as LanguageCode,
        timezone: getTradingChartTimezone(currentTimeOffset, clockPeriod),
        autosize: true,
      };

      // eslint-disable-next-line
      // @ts-ignore
      // eslint-disable-next-line new-cap
      tvWidget.current = new widget({
        ...defaultWidgetOptions,
        ...widgetOptions(themeColor),
        ...{
          disabled_features: isMobileDevice ? tradingFeautres.mobile : tradingFeautres.desktop,
        },
      });

      let previousRange = { from: 0, to: 0 };
      if (kline.range.from !== 0 && kline.range.to !== 0) {
        previousRange = kline.range;
      }

      let previousResolution = "";
      if (kline.period) {
        previousResolution = kline.period;
      }

      tvWidget?.current?.onChartReady(() => {
        tvWidget?.current!.activeChart().setSymbol(selectedMarket.id, () => {
          print("Symbol set", selectedMarket.id);
        });

        if (previousRange.from !== 0 && previousRange.to !== 0) {
          tvWidget?.current!.activeChart().setVisibleRange(previousRange);
        }

        if (previousResolution) {
          tvWidget
            ?.current!.activeChart()
            .setResolution(String(periodStringToMinutes(previousResolution)), () => {
              print("Resolution set", previousResolution);
            });
        }
      });
    },
    [isMobileDevice, kline.period, kline.range, colorTheme, currentMarket]
  );

  /**
   * @description Rebuiild chart
   */
  const rebuildChart = useCallback(
    (nextMarket?: Market) => {
      console.log("REBUILD Chart...");

      if (tvWidget?.current && currentMarket) {
        try {
          tvWidget?.current.remove();
        } catch (error) {
          window.console.log(`TradingChart unmount failed (Rebuild chart): ${error}`);
        }
        setChart(nextMarket);
      }
    },
    [currentMarket, setChart]
  );
  /**
   * @description Rebuiild chart
   */
  /**
   * @description Update chart when market changes
   */
  const updateChart = useCallback(
    (currentMarket: Market) => {
      console.log("UPDATE Chart...");

      if (tvWidget?.current) {
        let symbolSet = false;
        const callUpdateChart = () => {
          return new Promise((resolve) => {
            tvWidget?.current.onChartReady(() => {
              tvWidget?.current!.activeChart().setSymbol(currentMarket.id, () => {
                symbolSet = true;
                resolve("Symbol set");
              });
            });
            setTimeout(() => {
              resolve("Symbol failed to set");
            }, 3000);
          });
        };

        callUpdateChart().then((res) => {
          print(res, currentMarket.id);

          if (!symbolSet) {
            print("Rebuild chart", currentMarket.id);
            rebuildChart(currentMarket);
          }
        });
      }
    },
    [rebuildChart, tvWidget]
  );

  useEffect(() => {
    // Update chart when market or colortheme changes
    if (currentMarket || colorTheme) {
      console.log("Building Chart...");
      setChart(currentMarket, colorTheme);
    }

    // Update chart if has widget or build chart when the currentMarket is selected
    if (currentMarket.id) {
      if (currentMarket.id && tvWidget?.current) {
        updateChart(currentMarket);
      } else {
        setChart(currentMarket, colorTheme);
      }
    }
    // Update chart when kline changes
    if (kline) {
      datafeed?.current.onRealtimeCallback(kline);
    }

    // Update chart if we need to rebuild it
    if (chartRebuild) {
      rebuildChart();
    }
  }, [chartRebuild, currentMarket, colorTheme, kline, setChart, rebuildChart, updateChart]);

  useEffect(() => {
    return () => {
      if (tvWidget?.current) {
        try {
          tvWidget?.current.remove();
          tvWidget.current = null;
        } catch (error) {
          window.console.log(`TradingChart unmount failed: ${error}`);
        }
      }
    };
  }, []);
  return {
    id: widgetParams.containerId,
    test: tvWidget,
  };
}
