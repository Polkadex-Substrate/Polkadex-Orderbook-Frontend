import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";

import { GlobalSettingsState } from "./public/globalSettings";
import { rootHandleAlertSaga, AlertState } from "./public/alertHandler";
import { ErrorHandlerState, rootErrorHandlerSaga } from "./public/errorHandler";
import { CurrenciesState, rootCurrenciesSaga } from "./public/currencies";
import { KlineState, rootKlineFetchSaga } from "./public/kline";
import { MarketsState, rootMarketsSaga } from "./public/markets";
import { RangerState, rootRangerSaga } from "./public/ranger";
import {
  DepthIncrementState,
  DepthState,
  OrderBookState,
  rootOrderBookSaga,
} from "./public/orderBook";
import { RecentTradesState, rootRecentTradesSaga } from "./public/recentTrades";
import { AuthState, rootAuthSaga } from "./user/auth";
import { HistoryState, rootHistorySaga } from "./user/history";
import { OrdersState, rootOrdersSaga } from "./user/orders";
import { OrdersHistoryState, rootOrdersHistorySaga } from "./user/ordersHistory";
import { ProfileState, rootProfileSaga } from "./user/profile";
import { PolkadotWalletState, rootPolkadotWalletSaga } from "./user/proxyAccount";
import { publicReducer, userReducer } from "./app";
import { WalletsState, rootWalletsSaga } from "./user/wallets";
import { DepositsState } from "./user/deposits/reducer";
import { rootDepositsSaga } from "./user/deposits";
import { rootTradesSaga, TradesState } from "./user/trades";
import { WithdrawsState, rootWithdrawsSaga } from "./user/withdraws";
import { BalancesState, rootBalancesSaga } from "./user/balances";
import { NotificationState, rootNotificationSaga } from "./user/notificationHandler";
import { TransactionsState, rootTransactionsSaga } from "./user/transactions";
import { ExtensionWalletState, rootExtensionWalletSaga } from "./user/mainAccount";
import { EnclaveRpcClientState, rootEnclaveRpcClientSaga } from "./public/enclaveRpcClient";
import { AssetsState, rootAssetsSaga } from "./public/assets";
import { rootSessionSaga, SessionState } from "./user/session";

export * from "./user/auth";
export * from "./user/history";
export * from "./user/orders";
export * from "./user/ordersHistory";
export * from "./user/balances";
export * from "./user/trades";
export * from "./user/session";
export * from "./user/transactions";
export * from "./user/profile";
export * from "./user/notificationHandler";
export * from "./user/proxyAccount";
export * from "./user/mainAccount";
export * from "./user/wallets";
export * from "./user/deposits";
export * from "./user/withdraws";
export * from "./public/errorHandler";
export * from "./public/globalSettings";
export * from "./public/alertHandler";
export * from "./public/currencies";
export * from "./public/kline";
export * from "./public/markets";
export * from "./public/orderBook";
export * from "./public/recentTrades";
export * from "./public/ranger";

export interface RootState {
  public: {
    alerts: AlertState;
    globalSettings: GlobalSettingsState;
    currencies: CurrenciesState;
    depth: DepthState;
    errorHandler: ErrorHandlerState;
    incrementDepth: DepthIncrementState;
    kline: KlineState;
    markets: MarketsState;
    orderBook: OrderBookState;
    recentTrades: RecentTradesState;
    ranger: RangerState;
    enclaveRpcClient: EnclaveRpcClientState;
    assets: AssetsState;
  };
  user: {
    polkadotWallet: PolkadotWalletState;
    extensionWallet: ExtensionWalletState;
    auth: AuthState;
    balances: BalancesState;
    history: HistoryState;
    orders: OrdersState;
    ordersHistory: OrdersHistoryState;
    profile: ProfileState;
    wallets: WalletsState;
    deposits: DepositsState;
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
    call(rootExtensionWalletSaga),
    call(rootSessionSaga),
    call(rootAuthSaga),
    call(rootDepositsSaga),
    call(rootCurrenciesSaga),
    call(rootTransactionsSaga),
    call(rootNotificationSaga),
    call(rootErrorHandlerSaga),
    call(rootHandleAlertSaga),
    call(rootHistorySaga),
    call(rootKlineFetchSaga),
    call(rootMarketsSaga),
    call(rootRangerSaga),
    call(rootOrderBookSaga),
    call(rootWalletsSaga),
    call(rootOrdersHistorySaga),
    call(rootOrdersSaga),
    call(rootProfileSaga),
    call(rootRecentTradesSaga),
    call(rootPolkadotWalletSaga),
    call(rootTradesSaga),
    call(rootWithdrawsSaga),
    call(rootBalancesSaga),
    call(rootEnclaveRpcClientSaga),
    call(rootAssetsSaga),
  ]);
}
