import { dataFeedObject, print } from "./api";
import { widgetOptions, widgetParams } from "./config";
import { getTradingChartTimezone } from "./timezones";

import {
  IChartingLibraryWidget,
  LanguageCode,
  widget,
} from "public/charting_library/charting_library.min";
import { stdTimezoneOffset } from "src/helpers";
import { useReduxSelector } from "src/hooks";
import {
  Market,
  selectChartRebuildState,
  selectCurrentColorTheme,
  selectCurrentMarket,
  selectKline,
  selectMarkets,
  selectMarketTickers,
} from "src/modules";
import { periodStringToMinutes } from "src/modules/public/ranger/helpers";

const useCustomChart = (customChartRef) => {
  const markets = useReduxSelector(selectMarkets);
  const chartRebuild = useReduxSelector(selectChartRebuildState);
  const currentMarket = useReduxSelector(selectCurrentMarket);
  const tickers = useReduxSelector(selectMarketTickers);
  const kline = useReduxSelector(selectKline);
  const colorTheme = useReduxSelector(selectCurrentColorTheme);

  let datafeed = dataFeedObject(customChartRef, markets);

  const languageIncluded = (lang: string) => {
    return [
      "ar",
      "zh",
      "cs",
      "da_DK",
      "nl_NL",
      "en",
      "et_EE",
      "fr",
      "de",
      "el",
      "he_IL",
      "hu_HU",
      "id_ID",
      "it",
      "ja",
      "ko",
      "fa",
      "pl",
      "pt",
      "ro",
      "ru",
      "sk_SK",
      "es",
      "sv",
      "th",
      "tr",
      "vi",
    ].includes(lang);
  };

  let tvWidget: IChartingLibraryWidget | null = null;

  const handleRebuildChart = () => {
    if (tvWidget && currentMarket) {
      try {
        tvWidget.remove();
      } catch (error) {
        console.log(`TradingChart unmount failed (Rebuild chart): ${error}`);
      }

      setChart(markets, currentMarket, colorTheme);
    }
  };

  const updateChart = (currentMarket: Market) => {
    if (tvWidget) {
      tvWidget.onChartReady(() => {
        tvWidget!.activeChart().setSymbol(currentMarket.id, () => {
          print("Symbol set", currentMarket.id);
        });
      });
    }
  };
  const setChart = (markets: Market[], currentMarket: Market, colorTheme: string) => {
    datafeed = dataFeedObject(customChartRef, markets);
    const currentTimeOffset = new Date().getTimezoneOffset();
    const clockPeriod = currentTimeOffset === stdTimezoneOffset(new Date()) ? "STD" : "DST";

    if (kline.period) {
      widgetParams.interval = String(periodStringToMinutes(kline.period));
    }

    const disabledFeatures = {
      disabled_features: [
        "border_around_the_chart",
        "chart_property_page_background",
        "chart_property_page_scales",
        "chart_property_page_style",
        "chart_property_page_timezone_sessions",
        "chart_property_page_trading",
        "compare_symbol",
        "control_bar",
        "countdown",
        "create_volume_indicator_by_default",
        "display_market_status",
        "edit_buttons_in_legend",
        "go_to_date",
        "header_chart_type",
        "header_compare",
        "header_indicators",
        "header_saveload",
        "header_screenshot",
        "header_symbol_search",
        "header_undo_redo",
        "header_widget_dom_node",
        "hide_last_na_study_output",
        "hide_left_toolbar_by_default",
        "left_toolbar",
        "legend_context_menu",
        "main_series_scale_menu",
        "pane_context_menu",
        "show_chart_property_page",
        "study_dialog_search_control",
        "symbol_info",
        "timeframes_toolbar",
        "timezone_menu",
        "volume_force_overlay",
      ],
    };

    const defaultWidgetOptions = {
      symbol: currentMarket.id,
      datafeed: datafeed,
      interval: widgetParams.interval,
      container_id: widgetParams.containerId,
      locale: "en" as LanguageCode,
      timezone: getTradingChartTimezone(currentTimeOffset, clockPeriod),
    };

    tvWidget = new widget({
      ...defaultWidgetOptions,
      ...widgetOptions(colorTheme),
      ...disabledFeatures,
    });

    let previousRange = { from: 0, to: 0 };
    if (kline.range.from !== 0 && kline.range.to !== 0) {
      previousRange = kline.range;
    }

    let previousResolution = "";
    if (kline.period) {
      previousResolution = kline.period;
    }

    tvWidget.onChartReady(() => {
      tvWidget!.activeChart().setSymbol(currentMarket.id, () => {
        print("Symbol set", currentMarket.id);
      });

      if (previousRange.from !== 0 && previousRange.to !== 0) {
        tvWidget!.activeChart().setVisibleRange(previousRange);
      }

      if (previousResolution) {
        tvWidget!
          .activeChart()
          .setResolution(String(periodStringToMinutes(previousResolution)), () => {
            print("Resolution set", previousResolution);
          });
      }
    });
  };
  return {
    markets,
    chartRebuild,
    currentMarket,
    tickers,
    kline,
    tvWidget,
    widgetParams,
    setChart,
    colorTheme,
    datafeed,
    updateChart,
    handleRebuildChart,
  };
};

export default useCustomChart;
