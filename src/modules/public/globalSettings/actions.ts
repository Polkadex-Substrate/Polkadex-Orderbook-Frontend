import {
  CHANGE_COLOR_THEME,
  TOGGLE_CHART_REBUILD,
  TOGGLE_ORDERS_PAIRS_SWITCHER,
  TOGGLE_MARKET_SELECTOR,
} from "./constants";
export interface ChangeColorThemeAction {
  type: string;
  payload: string;
}
export interface ToggleChartRebuildAction {
  type: string;
}
export interface ToggleMarketSelectorAction {
  type: string;
}
export interface ToggleOpenOrdersPairsSwitcher {
  type: string;
  payload: boolean;
}

export type UIActions =
  | ChangeColorThemeAction
  | ToggleChartRebuildAction
  | ToggleMarketSelectorAction
  | ToggleOpenOrdersPairsSwitcher;

export const toggleChartRebuild = (): ToggleChartRebuildAction => ({
  type: TOGGLE_CHART_REBUILD,
});

export const toggleMarketSelector = (): ToggleMarketSelectorAction => ({
  type: TOGGLE_MARKET_SELECTOR,
});

export const toggleOpenOrdersPairsSwitcher = (
  payload: boolean
): ToggleOpenOrdersPairsSwitcher => ({
  type: TOGGLE_ORDERS_PAIRS_SWITCHER,
  payload,
});

export const changeColorTheme = (payload: string): ChangeColorThemeAction => ({
  type: CHANGE_COLOR_THEME,
  payload,
});
