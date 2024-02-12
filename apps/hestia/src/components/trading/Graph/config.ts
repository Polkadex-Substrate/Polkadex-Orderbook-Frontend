import { ResolutionString } from "@orderbook/core/utils/charting_library";

import {
  ChartPropertiesOverrides,
  ChartingLibraryWidgetOptions,
} from "../../../../public/static/charting_library/charting_library";
import { themeConfig, commom } from "../../../../../../themeConfig";

type Options = {
  studies_overrides: object;
  overrides: Partial<ChartPropertiesOverrides>;
};
const extend: any = themeConfig.theme.extend;

export const options: Options = {
  studies_overrides: {
    "volume.volume.color.0": commom["primary-base"],
    "volume.volume.color.1": commom["success-base"],
  },
  overrides: {
    "paneProperties.background": extend.backgroundColor.backgroundBase,
    "paneProperties.backgroundType": "solid",
    "paneProperties.vertGridProperties.color":
      extend.backgroundColor["level-2"],
    "paneProperties.vertGridProperties.style": 2,
    "paneProperties.horzGridProperties.color":
      extend.backgroundColor["level-2"],
    "paneProperties.horzGridProperties.style": 2,
    "paneProperties.crossHairProperties.color": "#888888",
    "paneProperties.crossHairProperties.style": 2,
    "paneProperties.topMargin": 16,
    "scalesProperties.textColor": extend.colors.textBase,
    "scalesProperties.fontSize": 12,
    // Candle Props
    "mainSeriesProperties.candleStyle.upColor": commom["success-base"],
    "mainSeriesProperties.candleStyle.downColor": commom["primary-base"],
    // Area Props
    "mainSeriesProperties.areaStyle.color1": commom["success-base"],
    "mainSeriesProperties.areaStyle.color2": commom["primary-base"],
    "mainSeriesProperties.areaStyle.linecolor": extend.borderColor.secondary,
    "mainSeriesProperties.areaStyle.linewidth": 2,
  },
};

export const defaultWidgetOptions = {
  library_path: "/static/charting_library/",
  charts_storage_api_version: "1.1",
  client_id: "tradingview.com",
  user_id: "public_user_id",
  fullscreen: false,
  autosize: true,
  container: "tv_chart_container",
  disabled_features: [
    "volume_force_overlay",
    "header_symbol_search",
    "use_localstorage_for_settings",
    "header_compare",
    "header_fullscreen_button",
    "header_indicators",
    "header_resolutions",
    "header_saveload",
    "header_undo_redo",
    "header_chart_type",
    "header_screenshot",
    "header_settings",
    "go_to_date",
    "hide_left_toolbar_by_default",
    "timeframes_toolbar",
    "header_widget",
  ],
  enabled_features: [
    "use_localstorage_for_settings",
    "side_toolbar_in_fullscreen_mode",
    "save_chart_properties_to_local_storage",
    "iframe_loading_compatibility_mode",
  ],
  custom_css_url: "/static/style.css/",
  loading_screen: {
    foregroundColor: "transparent",
  },
  auto_save_delay: 5,
  load_last_chart: true,
} as Partial<ChartingLibraryWidgetOptions>;

export const supported_resolutions = [
  { id: "1", description: "1m" },
  { id: "5", description: "5m" },
  { id: "15", description: "15m" },
  { id: "30", description: "30m" },
  { id: "60", description: "1H" },
  { id: "120", description: "2H" },
  { id: "360", description: "6H" },
  { id: "1D", description: "1D" },
  { id: "1W", description: "1W" },
];

export const configurationData = {
  supported_resolutions: supported_resolutions.map(
    ({ id }) => id
  ) as ResolutionString[],
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
