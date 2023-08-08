import { useCallback, useEffect, useMemo, useRef, useState } from "react";

import {
  ChartingLibraryWidgetOptions,
  DatafeedConfiguration,
  IChartingLibraryWidget,
  LibrarySymbolInfo,
  ResolutionString,
  widget as Widget,
} from "../../../../public/static/charting_library";

import * as S from "./styles";
import { customFontFamily, options } from "./options";

import { Keyboard } from "@polkadex/orderbook-ui/molecules/LoadingIcons";
import { useKlineProvider } from "@polkadex/orderbook/providers/public/klineProvider/useKlineProvider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
import { useSettingsProvider } from "@polkadex/orderbook/providers/public/settings";

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

export const TradingView = () => {
  const [isReady, setIsReady] = useState(false);

  const { onHandleKlineFetch, onFetchKlineChannel, last: lastKline } = useKlineProvider();
  const { currentMarket } = useMarketsProvider();
  const { theme } = useSettingsProvider();

  const isDarkTheme = theme === "dark";

  const getAllSymbols = useCallback(() => {
    const allSymbols = [
      {
        description: currentMarket?.name,
        exchange: "Polkadex",
        full_name: `Polkadex:${currentMarket?.name}`,
        symbol: currentMarket?.name,
        type: "crypto",
      },
    ];

    return allSymbols;
  }, [currentMarket?.name]);

  const chartContainerRef =
    useRef<HTMLDivElement>() as React.MutableRefObject<HTMLInputElement>;

  const tvWidget = useRef<IChartingLibraryWidget>();

  const getData = useCallback(
    async (resolution: ResolutionString, from: number, to: number) => {
      try {
        const klines = await onHandleKlineFetch({
          market: currentMarket?.m,
          resolution: resolution,
          from: new Date(from * 1000),
          to: new Date(to * 1000),
        });

        if (klines.length === 0) {
          return [];
        }

        const klinesLength = klines.length;
        const bars = klines.map((bar, index) => {
          return {
            time: bar.timestamp,
            low: bar.low,
            high: bar.high,
            open: bar.open,
            close: bar.close,
            volume: bar.volume,
            isBarClosed: index !== klinesLength - 1,
            isLastBar: index === klinesLength - 1,
          };
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
    [currentMarket, onHandleKlineFetch]
  );

  const widgetOptions: ChartingLibraryWidgetOptions = useMemo(() => {
    return {
      datafeed: {
        onReady(callback) {
          setTimeout(() => callback(configurationData), 0);
        },
        async searchSymbols(userInput, exchange, symbolType, onResult) {
          const symbols = getAllSymbols();
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
          const symbols = getAllSymbols();
          const symbolItem = symbols.find(
            ({ full_name: fullName }) => fullName === symbolName
          );
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
              return onResult([], { noData: true });
            } else {
              return onResult(bars, { noData: false });
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
          onFetchKlineChannel({
            market: currentMarket?.m,
            interval: resolution,
            onUpdateTradingViewRealTime: onTick,
          });
        },
        unsubscribeBars(listenerGuid) {
          console.log("[unsubscribeBars]: Method call with subscriberUID:", listenerGuid);
        },
      },
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
      disabled_features: [
        "use_localstorage_for_settings",
        "volume_force_overlay",
        "header_symbol_search",
      ],
      enabled_features: [],
      symbol: `Polkadex:${currentMarket?.name}`,
      custom_font_family: customFontFamily,
      custom_css_url: "/static/style.css/",
      loading_screen: {
        foregroundColor: "transparent",
      },
    };
  }, [currentMarket?.m, getAllSymbols, getData, currentMarket?.name, onFetchKlineChannel]);

  useEffect(() => {
    if (!currentMarket?.m) return;

    setIsReady(false);
    tvWidget.current = new Widget(widgetOptions);

    tvWidget?.current?.onChartReady &&
      tvWidget?.current?.onChartReady(() => {
        setIsReady(true);
      });

    return () => {
      tvWidget?.current?.remove();
    };
  }, [currentMarket?.m, widgetOptions]);

  useEffect(() => {
    isReady &&
      tvWidget?.current?.onChartReady &&
      tvWidget?.current?.onChartReady(() => {
        tvWidget?.current?.changeTheme(isDarkTheme ? "Dark" : "Light").then(() => {
          tvWidget?.current.applyOverrides({ ...options(isDarkTheme).overrides });
        });
      });
    tvWidget?.current?.applyStudiesOverrides({
      ...options(isDarkTheme).studies_overrides,
    });
  }, [isDarkTheme, isReady]);

  return (
    <S.Wrapper>
      <S.Container isVisible={isReady} ref={chartContainerRef} />
      {!isReady && (
        <S.LoadingWrapper>
          <Keyboard color="primary" />
        </S.LoadingWrapper>
      )}
    </S.Wrapper>
  );
};
