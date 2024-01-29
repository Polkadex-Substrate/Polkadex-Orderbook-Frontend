import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { Keyboard } from "@polkadex/orderbook-ui/molecules/LoadingIcons";
import { useKlineProvider } from "@orderbook/core/providers/public/klineProvider";
import { useMarkets } from "@orderbook/core/hooks";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { decimalPlaces, getCurrentMarket } from "@orderbook/core/helpers";
import { TradingView as TradingViewConstants } from "@orderbook/core/constants";

import {
  ChartingLibraryWidgetOptions,
  DatafeedConfiguration,
  IChartingLibraryWidget,
  LibrarySymbolInfo,
  ResolutionString,
  Timezone,
  widget as Widget,
} from "../../../../public/static/charting_library";

import * as S from "./styles";
import { customFontFamily, options } from "./options";

export const supported_resolutions = [
  "1",
  "5",
  "15",
  "30",
  "60",
  "120",
  "360",
  "1D",
  "1W",
];

const configurationData: DatafeedConfiguration = {
  supported_resolutions: supported_resolutions as ResolutionString[],
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

type Props = {
  market: string;
};

export const TradingView = ({ market }: Props) => {
  const [isReady, setIsReady] = useState(false);

  const { onHandleKlineFetch, onFetchKlineChannel } = useKlineProvider();
  const { list: allMarkets } = useMarkets();
  const currentMarket = getCurrentMarket(allMarkets, market);
  const { theme } = useSettingsProvider();

  const isDarkTheme = theme === "dark";

  const getAllSymbols = useCallback(() => {
    const allSymbols = allMarkets?.map((market) => ({
      description: market?.name,
      exchange: "Polkadex",
      full_name: `Polkadex:${market?.name}`,
      symbol: market?.name,
      type: "crypto",
    }));

    return allSymbols;
  }, [allMarkets]);

  const tvWidget = useRef<IChartingLibraryWidget>();

  const getData = useCallback(
    async (resolution: ResolutionString, from: number, to: number) => {
      try {
        if (!currentMarket?.id) return [];

        const klines =
          (await onHandleKlineFetch({
            market: currentMarket?.id,
            resolution: resolution,
            from: new Date(from * 1000),
            to: new Date(to * 1000),
          })) ?? [];

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
    const interval = (localStorage.getItem(
      TradingViewConstants.lastResolution
    ) || "60") as ResolutionString;

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
          setTimeout(() => {
            onResult(newSymbols);
          }, 0);
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
        subscribeBars(symbolInfo, resolution, onTick) {
          if (currentMarket?.id) {
            onFetchKlineChannel({
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
      interval,
      library_path: "/static/charting_library/",
      locale: "en",
      timezone: "Asia/Kolkata",
      charts_storage_api_version: "1.1",
      client_id: "tradingview.com",
      user_id: "public_user_id",
      fullscreen: false,
      autosize: true,
      container: "tv_chart_container",
      disabled_features: ["volume_force_overlay", "header_symbol_search"],
      enabled_features: [
        "use_localstorage_for_settings",
        "side_toolbar_in_fullscreen_mode",
        "save_chart_properties_to_local_storage",
        "iframe_loading_compatibility_mode",
      ],
      symbol: `Polkadex:${currentMarket?.name}`,
      custom_font_family: customFontFamily,
      custom_css_url: "/static/style.css/",
      loading_screen: {
        foregroundColor: "transparent",
      },
      auto_save_delay: 5,
      load_last_chart: true,
    };
  }, [
    currentMarket?.id,
    getAllSymbols,
    getData,
    currentMarket?.name,
    onFetchKlineChannel,
    currentMarket?.price_tick_size,
  ]);

  useEffect(() => {
    if (!currentMarket?.id) return;

    setIsReady(false);
    tvWidget.current = new Widget(widgetOptions);

    tvWidget?.current?.onChartReady &&
      tvWidget?.current?.onChartReady(() => {
        setIsReady(true);
      });

    return () => {
      tvWidget?.current?.remove();
    };
  }, [currentMarket?.id, widgetOptions]);

  useEffect(() => {
    isReady &&
      tvWidget?.current?.onChartReady &&
      tvWidget?.current?.onChartReady(() => {
        // Set time zone specific to user
        const localTime = Intl.DateTimeFormat().resolvedOptions()
          .timeZone as Timezone;

        tvWidget.current?.activeChart().setTimezone(localTime);

        tvWidget?.current
          ?.changeTheme(isDarkTheme ? "Dark" : "Light")
          .then(() => {
            tvWidget?.current?.applyOverrides({
              ...options(isDarkTheme).overrides,
            });
          });
      });
    tvWidget?.current?.applyStudiesOverrides({
      ...options(isDarkTheme).studies_overrides,
    });
  }, [isDarkTheme, isReady]);

  return (
    <S.Wrapper>
      <S.Container isVisible={isReady} id="tv_chart_container" />
      {!isReady && (
        <S.LoadingWrapper>
          <Keyboard color="primary" />
        </S.LoadingWrapper>
      )}
    </S.Wrapper>
  );
};
