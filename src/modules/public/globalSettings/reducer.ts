import {
  CHANGE_COLOR_THEME,
  TOGGLE_CHART_REBUILD,
  TOGGLE_ORDERS_PAIRS_SWITCHER,
  TOGGLE_MARKET_SELECTOR,
} from "./constants";
export interface GlobalSettingsState {
  color: string;
  chartRebuild: boolean;
  ordersHideOtherPairs: boolean;
  marketSelectorActive: boolean;
}

export const initialChangeGlobalSettingsState: GlobalSettingsState = {
  color: (process.browser && localStorage.getItem("colorTheme")) || "dark",
  chartRebuild: false,
  marketSelectorActive: false,
  ordersHideOtherPairs: true,
};

export const changeGlobalSettingsReducer = (
  state = initialChangeGlobalSettingsState,
  action
) => {
  switch (action.type) {
    case CHANGE_COLOR_THEME:
      process.browser && localStorage.setItem("colorTheme", action.payload);

      return {
        ...state,
        color: action.payload,
      };
    case TOGGLE_CHART_REBUILD:
      return {
        ...state,
        chartRebuild: !state.chartRebuild,
      };
    case TOGGLE_MARKET_SELECTOR:
      return {
        ...state,
        marketSelectorActive: !state.marketSelectorActive,
        sideBarActive: false,
      };
    case TOGGLE_ORDERS_PAIRS_SWITCHER:
      return {
        ...state,
        ordersHideOtherPairs: action.payload,
      };
    default:
      return state;
  }
};
