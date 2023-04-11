import * as T from "./types";
import * as A from "./actions";

export const initialState: T.SettingState = {
  color: (process.browser && localStorage.getItem("colorTheme")) || "dark",
  chartRebuild: false,
  marketSelectorActive: false,
  ordersHideOtherPairs: true,
  error: { processing: false },
  alert: {
    type: "",
    status: false,
    message: {
      title: "",
      description: "",
    },
  },
  notification:
    (process.browser && JSON.parse(window.localStorage.getItem("notifications"))) || [],
};

export const orderBookReducer = (state: T.SettingState, action: A.SettingActions) => {
  switch (action.type) {
    default:
      return state;
  }
};
