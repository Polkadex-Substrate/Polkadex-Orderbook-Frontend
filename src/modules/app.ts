import { combineReducers } from "redux";

import { alertReducer } from "./public/alertHandler";
import { changeGlobalSettingsReducer } from "./public/globalSettings";
import { errorHandlerReducer } from "./public/errorHandler";
import { klineReducer } from "./public/kline";
import { notificationReducer } from "./user/notificationHandler";

export const publicReducer = combineReducers({
  alerts: alertReducer,
  globalSettings: changeGlobalSettingsReducer,
  errorHandler: errorHandlerReducer,
  kline: klineReducer,
});

export const userReducer = combineReducers({
  notifications: notificationReducer,
});
