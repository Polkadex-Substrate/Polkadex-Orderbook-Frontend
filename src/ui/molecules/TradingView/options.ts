import { defaultThemes } from "@polkadex/orderbook/styles";
import { ChartPropertiesOverrides } from "public/static/charting_library/charting_library";

type Options = {
  custom_font_family: string;
  studies_overrides: object;
  overrides: Partial<ChartPropertiesOverrides>;
};

export const options = (isDarkTheme = true): Options => {
  const theme = isDarkTheme ? defaultThemes.dark : defaultThemes.light;
  return {
    custom_font_family: theme.font.family,
    studies_overrides: {
      "volume.volume.color.0": theme.colors.primary,
      "volume.volume.color.1": theme.colors.green,
    },
    overrides: {
      "paneProperties.background": theme.colors.primaryBackgroundSolid,
      "paneProperties.backgroundType": "solid",
      "paneProperties.vertGridProperties.color": theme.colors.secondaryBackgroundOpacity,
      "paneProperties.vertGridProperties.style": 2,
      "paneProperties.horzGridProperties.color": theme.colors.secondaryBackgroundOpacity,
      "paneProperties.horzGridProperties.style": 2,
      "paneProperties.crossHairProperties.color": "#888888",
      "paneProperties.crossHairProperties.style": 2,
      "paneProperties.topMargin": 16,
      "scalesProperties.textColor": isDarkTheme ? theme.colors.white : theme.colors.black,
      "scalesProperties.fontSize": 12,
      // Candle Props
      "mainSeriesProperties.candleStyle.upColor": theme.colors.green,
      "mainSeriesProperties.candleStyle.downColor": theme.colors.primary,
      // Area Props
      "mainSeriesProperties.areaStyle.color1": "rgba(33, 150, 243, 0.2)",
      "mainSeriesProperties.areaStyle.color2": "rgba(33, 150, 243, 0.01)",
      "mainSeriesProperties.areaStyle.linecolor": "#2196F3",
      "mainSeriesProperties.areaStyle.linewidth": 2,
    },
  };
};
