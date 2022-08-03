import { combineReducers } from "redux";

import { alertReducer } from "./public/alertHandler";
import { changeGlobalSettingsReducer } from "./public/globalSettings";
import { errorHandlerReducer } from "./public/errorHandler";
import { currenciesReducer } from "./public/currencies";
import { klineReducer } from "./public/kline";
import { rangerReducer } from "./public/ranger";
import { marketsReducer } from "./public/markets";
import { depthReducer, orderBookReducer } from "./public/orderBook";
import { recentTradesReducer } from "./public/recentTrades";
import { authReducer } from "./user/auth";
import { ordersReducer } from "./user/orders";
import { ordersHistoryReducer } from "./user/ordersHistory";
import { notificationReducer } from "./user/notificationHandler";
import { profileReducer } from "./user/profile";
import { polkadotWalletReducer } from "./user/proxyAccount";
import { depositsReducer } from "./user/deposit";
import { tradesReducer } from "./user/trades";
import { withdrawsReducer } from "./user/withdraws";
import { balancesReducer } from "./user/balances";
import { transactionsReducer } from "./user/transactions";
import { extensionWalletReducer } from "./user/mainAccount";
import { sessionReducer } from "./user/session";
import { assetsReducer } from "./public/assets";

export const publicReducer = combineReducers({
  alerts: alertReducer,
  globalSettings: changeGlobalSettingsReducer,
  currencies: currenciesReducer,
  errorHandler: errorHandlerReducer,
  kline: klineReducer,
  markets: marketsReducer,
  orderBook: orderBookReducer,
  depth: depthReducer,
  recentTrades: recentTradesReducer,
  ranger: rangerReducer,
  assets: assetsReducer,
});

export const userReducer = combineReducers({
  auth: authReducer,
  polkadotWallet: polkadotWalletReducer,
  extensionWallet: extensionWalletReducer,
  balances: balancesReducer,
  orders: ordersReducer,
  ordersHistory: ordersHistoryReducer,
  profile: profileReducer,
  deposits: depositsReducer,
  trades: tradesReducer,
  transactions: transactionsReducer,
  withdraws: withdrawsReducer,
  notifications: notificationReducer,
  session: sessionReducer,
});
