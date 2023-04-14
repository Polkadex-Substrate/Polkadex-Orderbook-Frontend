import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";

import { GlobalSettingsState } from "./public/globalSettings";
import { rootHandleAlertSaga, AlertState } from "./public/alertHandler";
import { ErrorHandlerState, rootErrorHandlerSaga } from "./public/errorHandler";
import { KlineState, rootKlineFetchSaga } from "./public/kline";
import { RecentTradesState, rootRecentTradesSaga } from "./public/recentTrades";
import { OrdersState, rootOrdersSaga } from "./user/orders";
import { OrdersHistoryState, rootOrdersHistorySaga } from "./user/ordersHistory";
import { TradeAccountsState, rootTradeAccountsSaga } from "./user/tradeWallet";
import { publicReducer, userReducer } from "./app";
import { rootTradesSaga, TradesState } from "./user/trades";
import { WithdrawsState, rootWithdrawsSaga } from "./user/withdraws";
import { BalancesState, rootBalancesSaga } from "./user/balances";
import { NotificationState, rootNotificationSaga } from "./user/notificationHandler";
import { TransactionsState, rootTransactionsSaga } from "./user/transactions";
import { MainAccountState, rootMainAccountsSaga } from "./user/extensionWallet";
import { AssetsState, rootAssetsSaga } from "./public/assets";
import { rootSessionSaga, SessionState } from "./user/session";
import { rootUserEventsSaga } from "./user/userEventsListener";

export * from "./user/orders";
export * from "./user/ordersHistory";
export * from "./user/balances";
export * from "./user/trades";
export * from "./user/session";
export * from "./user/transactions";
export * from "./user/notificationHandler";
export * from "./user/tradeWallet";
export * from "./user/extensionWallet";
export * from "./user/withdraws";
export * from "./public/errorHandler";
export * from "./public/globalSettings";
export * from "./public/alertHandler";
export * from "./public/kline";
export * from "./public/recentTrades";

export interface RootState {
  public: {
    alerts: AlertState;
    globalSettings: GlobalSettingsState;
    errorHandler: ErrorHandlerState;
    kline: KlineState;
    recentTrades: RecentTradesState;
    assets: AssetsState;
  };
  user: {
    tradeWallet: TradeAccountsState;
    extensionWallet: MainAccountState;
    balances: BalancesState;
    orders: OrdersState;
    ordersHistory: OrdersHistoryState;
    trades: TradesState;
    transactions: TransactionsState;
    withdraws: WithdrawsState;
    notifications: NotificationState;
    session: SessionState;
  };
}

export const rootReducer = combineReducers({
  public: publicReducer,
  user: userReducer,
});

export function* rootSaga() {
  yield all([
    call(rootMainAccountsSaga),
    call(rootSessionSaga),
    call(rootTransactionsSaga),
    call(rootNotificationSaga),
    call(rootErrorHandlerSaga),
    call(rootHandleAlertSaga),
    call(rootKlineFetchSaga),
    call(rootOrdersHistorySaga),
    call(rootOrdersSaga),
    call(rootRecentTradesSaga),
    call(rootTradeAccountsSaga),
    call(rootTradesSaga),
    call(rootWithdrawsSaga),
    call(rootBalancesSaga),
    call(rootAssetsSaga),
    call(rootUserEventsSaga),
    call(rootNotificationSaga),
  ]);
}
