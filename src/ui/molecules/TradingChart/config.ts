import { ThemeName } from "../../../../public/charting_library/charting_library.min";

import { DEFAULT_TRADING_VIEW_INTERVAL } from "@polkadex/web-constants";
import { darkTheme, lightTheme } from "@polkadex/orderbook/styles/theme";
export const customWidgetParams = {};

export const customWidgetOptions = (colorTheme?: string) => {
  const background =
    colorTheme === "light" ? lightTheme.colors.inverse : darkTheme.colors.inverse;
  const red = darkTheme.colors.primary;
  const green = darkTheme.colors.green;

  return {
    toolbar_bg: background,
    loading_screen: {
      backgroundColor: background,
    },
    overrides: {
      "symbolWatermarkProperties.color": background,
      // supported values: large, medium, small, tiny
      volumePaneSize: "iny",
      // fonts available in text editors (i.e., in `Text` drawing tool properties dialog)
      editorFontsList: ["Verdana", "Courier New", "Times New Roman", "Arial"],
      "mainSeriesProperties.candleStyle.upColor": green,
      "mainSeriesProperties.candleStyle.downColor": red,
      "mainSeriesProperties.candleStyle.borderUpColor": green,
      "mainSeriesProperties.candleStyle.borderDownColor": red,
      "mainSeriesProperties.candleStyle.wickUpColor": green,
      "mainSeriesProperties.candleStyle.wickDownColor": red,
      "paneProperties.background": background,
      "paneProperties.vertGridProperties.color": background,
      "paneProperties.vertGridProperties.style": 1,
      "paneProperties.horzGridProperties.color": background,
      "paneProperties.horzGridProperties.style": 1,
      "paneProperties.crossHairProperties.color": background,
      "paneProperties.crossHairProperties.width": 1,
      "paneProperties.crossHairProperties.style": 1,
      "scalesProperties.backgroundColor": background,
      "scalesProperties.fontSize": 12,
      "mainSeriesProperties.hiloStyle.fontSize": 22,
    },
    studies_overrides: {
      "volume.volume.color.0": green,
      "volume.volume.color.1": red,
    },
    theme: "Dark" as ThemeName,
  };
};

export const widgetParams = {
  interval: String(DEFAULT_TRADING_VIEW_INTERVAL),
  containerId: "tv_chart_container",
  ...customWidgetParams,
};

export const widgetOptions = (colorTheme?: string) => {
  return {
    allow_symbol_change: false,
    autosize: true,
    calendar: true,
    client_id: "tradingview.com",
    custom_css_url: "/css/tradingview.css",
    debug: false,
    details: true,
    disabled_features: ["use_localstorage_for_settings", "header_symbol_search"],
    enable_publishing: false,
    enabled_features: ["show_animated_logo"],
    fullscreen: false,
    height: 610,
    hide_side_toolbar: false,
    hotlist: true,
    library_path: "/charting_library/",
    popup_height: "50",
    popup_width: "000",
    show_popup_button: true,
    studies_overrides: {},
    timeframe: "1D",
    user_id: "public_user_id",
    withdateranges: false,
    ...customWidgetOptions(colorTheme),
  };
};
