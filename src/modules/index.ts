import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";

import { GlobalSettingsState } from "./public/globalSettings";
import { rootHandleAlertSaga, AlertState } from "./public/alertHandler";
import { ErrorHandlerState, rootErrorHandlerSaga } from "./public/errorHandler";
import { KlineState, rootKlineFetchSaga } from "./public/kline";
import { OrdersState, rootOrdersSaga } from "./user/orders";
import { TradeAccountsState, rootTradeAccountsSaga } from "./user/tradeWallet";
import { publicReducer, userReducer } from "./app";
import { NotificationState, rootNotificationSaga } from "./user/notificationHandler";

export * from "./user/orders";
export * from "./user/notificationHandler";
export * from "./user/tradeWallet";
export * from "./public/errorHandler";
export * from "./public/globalSettings";
export * from "./public/alertHandler";
export * from "./public/kline";

export interface RootState {
  public: {
    alerts: AlertState;
    globalSettings: GlobalSettingsState;
    errorHandler: ErrorHandlerState;
    kline: KlineState;
  };
  user: {
    tradeWallet: TradeAccountsState;
    orders: OrdersState;
    notifications: NotificationState;
  };
}

export const rootReducer = combineReducers({
  public: publicReducer,
  user: userReducer,
});

export function* rootSaga() {
  yield all([
    call(rootNotificationSaga),
    call(rootErrorHandlerSaga),
    call(rootHandleAlertSaga),
    call(rootKlineFetchSaga),
    call(rootOrdersSaga),
    call(rootTradeAccountsSaga),
    call(rootNotificationSaga),
  ]);
}
