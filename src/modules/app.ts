import { combineReducers } from "redux";

import { alertReducer } from "./public/alertHandler";
import { changeGlobalSettingsReducer } from "./public/globalSettings";
import { errorHandlerReducer } from "./public/errorHandler";
import { notificationReducer } from "./user/notificationHandler";

export const publicReducer = combineReducers({
  alerts: alertReducer,
  globalSettings: changeGlobalSettingsReducer,
  errorHandler: errorHandlerReducer,
});

export const userReducer = combineReducers({
  notifications: notificationReducer,
});
