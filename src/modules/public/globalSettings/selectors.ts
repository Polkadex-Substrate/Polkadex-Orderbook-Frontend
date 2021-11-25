import { RootState } from "../..";

import { GlobalSettingsState } from "./reducer";

export const selectCurrentColorTheme = (state: RootState): GlobalSettingsState["color"] =>
  state.public.globalSettings.color;

export const selectCurrentDarkTheme = (state: RootState): boolean =>
  state.public.globalSettings.color === "dark";

export const selectChartRebuildState = (
  state: RootState
): GlobalSettingsState["chartRebuild"] => state.public.globalSettings.chartRebuild;

export const selectOrdersHideOtherPairsState = (
  state: RootState
): GlobalSettingsState["ordersHideOtherPairs"] =>
  state.public.globalSettings.ordersHideOtherPairs;

export const selectMarketSelectorState = (
  state: RootState
): GlobalSettingsState["marketSelectorActive"] =>
  state.public.globalSettings.marketSelectorActive;
