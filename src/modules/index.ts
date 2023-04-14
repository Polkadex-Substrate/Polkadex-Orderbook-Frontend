import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";

import { GlobalSettingsState } from "./public/globalSettings";
import { rootHandleAlertSaga, AlertState } from "./public/alertHandler";
import { ErrorHandlerState, rootErrorHandlerSaga } from "./public/errorHandler";
import { KlineState, rootKlineFetchSaga } from "./public/kline";
import { RangerState, rootRangerSaga } from "./public/ranger";
import {
  DepthIncrementState,
  DepthState,
  OrderBookState,
  rootOrderBookSaga,
} from "./public/orderBook";
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
import { AssetsState, rootAssetsSaga } from "./public/assets";
import { rootSessionSaga, SessionState } from "./user/session";

export * from "./user/orders";
export * from "./user/ordersHistory";
export * from "./user/balances";
export * from "./user/trades";
export * from "./user/session";
export * from "./user/transactions";
export * from "./user/notificationHandler";
export * from "./user/tradeWallet";
export * from "./user/withdraws";
export * from "./public/errorHandler";
export * from "./public/globalSettings";
export * from "./public/alertHandler";
export * from "./public/kline";
export * from "./public/orderBook";
export * from "./public/recentTrades";
export * from "./public/ranger";

export interface RootState {
  public: {
    alerts: AlertState;
    globalSettings: GlobalSettingsState;
    depth: DepthState;
    errorHandler: ErrorHandlerState;
    incrementDepth: DepthIncrementState;
    kline: KlineState;
    orderBook: OrderBookState;
    recentTrades: RecentTradesState;
    ranger: RangerState;
    assets: AssetsState;
  };
  user: {
    tradeWallet: TradeAccountsState;
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
    call(rootSessionSaga),
    call(rootTransactionsSaga),
    call(rootNotificationSaga),
    call(rootErrorHandlerSaga),
    call(rootHandleAlertSaga),
    call(rootKlineFetchSaga),
    call(rootRangerSaga),
    call(rootOrderBookSaga),
    call(rootOrdersHistorySaga),
    call(rootOrdersSaga),
    call(rootRecentTradesSaga),
    call(rootTradeAccountsSaga),
    call(rootTradesSaga),
    call(rootWithdrawsSaga),
    call(rootBalancesSaga),
    call(rootAssetsSaga),
    call(rootNotificationSaga),
  ]);
}
