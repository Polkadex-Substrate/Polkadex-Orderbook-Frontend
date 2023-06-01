import { defaultThemes } from "@polkadex/orderbook/styles";
import { OverrideLineStyle } from "public/static/charting_library/charting_library";

export const options = (isDarkTheme = true) => {
  const theme = isDarkTheme ? defaultThemes.dark : defaultThemes.light;
  return {
    "paneProperties.vertGridProperties.color": theme.colors.secondaryBackgroundOpacity,
    "paneProperties.vertGridProperties.style": "2",
    "paneProperties.horzGridProperties.color": theme.colors.secondaryBackgroundOpacity,
    "paneProperties.horzGridProperties.style": "2",
    // Cross Hair Not working
    "crossHairProperties.color": "#FF0000",
    "crossHairProperties.style": 0 as OverrideLineStyle,
    "crossHairProperties.width": "20px",

    //
    "paneProperties.topMargin": 20,
    "scalesProperties.textColor": theme.colors.white,
    "scalesProperties.fontSize": 12,
  };
};
