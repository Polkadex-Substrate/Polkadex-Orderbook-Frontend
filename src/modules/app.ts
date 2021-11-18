import { combineReducers } from "redux";

import { alertReducer } from "./public/alertHandler";
import { changeColorThemeReducer } from "./public/globalSettings";
import { errorHandlerReducer } from "./public/errorHandler";
import { currenciesReducer } from "./public/currencies";
import { klineReducer } from "./public/kline";
import { rangerReducer } from "./public/ranger";
import { marketsReducer } from "./public/markets";
import { depthReducer, incrementDepthReducer, orderBookReducer } from "./public/orderBook";
import { recentTradesReducer } from "./public/recentTrades";
import { authReducer } from "./user/auth";
import { historyReducer } from "./user/history";
import { openOrdersReducer } from "./user/openOrders";
import { ordersReducer } from "./user/orders";
import { ordersHistoryReducer } from "./user/ordersHistory";
import { profileReducer } from "./user/profile";
import { polkadotWalletReducer } from "./user/polkadotWallet";
import { orderTransactionReducer } from "./user/OrdersTransactions";
import { walletsReducer } from "./user/wallets";

export const publicReducer = combineReducers({
  alerts: alertReducer,
  colorTheme: changeColorThemeReducer,
  currencies: currenciesReducer,
  errorHandler: errorHandlerReducer,
  kline: klineReducer,
  markets: marketsReducer,
  orderBook: orderBookReducer,
  depth: depthReducer,
  incrementDepth: incrementDepthReducer,
  recentTrades: recentTradesReducer,
  ranger: rangerReducer,
});

export const userReducer = combineReducers({
  auth: authReducer,
  polkadotWallet: polkadotWalletReducer,
  history: historyReducer,
  openOrders: openOrdersReducer,
  orders: ordersReducer,
  ordersHistory: ordersHistoryReducer,
  orderTransactions: orderTransactionReducer,
  profile: profileReducer,
  wallets: walletsReducer,
});
