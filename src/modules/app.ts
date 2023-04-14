import { combineReducers } from "redux";

import { alertReducer } from "./public/alertHandler";
import { changeGlobalSettingsReducer } from "./public/globalSettings";
import { errorHandlerReducer } from "./public/errorHandler";
import { klineReducer } from "./public/kline";
import { rangerReducer } from "./public/ranger";
import { depthReducer, orderBookReducer } from "./public/orderBook";
import { ordersReducer } from "./user/orders";
import { notificationReducer } from "./user/notificationHandler";
import { TradeAccountsReducer } from "./user/tradeWallet";
import { tradesReducer } from "./user/trades";

export const publicReducer = combineReducers({
  alerts: alertReducer,
  globalSettings: changeGlobalSettingsReducer,
  errorHandler: errorHandlerReducer,
  kline: klineReducer,
  orderBook: orderBookReducer,
  depth: depthReducer,
  ranger: rangerReducer,
});

export const userReducer = combineReducers({
  tradeWallet: TradeAccountsReducer,
  orders: ordersReducer,
  trades: tradesReducer,
  notifications: notificationReducer,
});
