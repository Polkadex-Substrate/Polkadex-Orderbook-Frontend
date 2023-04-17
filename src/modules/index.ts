import { all, call } from "redux-saga/effects";
import { combineReducers } from "redux";

import { GlobalSettingsState } from "./public/globalSettings";
import { rootHandleAlertSaga, AlertState } from "./public/alertHandler";
import { ErrorHandlerState, rootErrorHandlerSaga } from "./public/errorHandler";
import { KlineState, rootKlineFetchSaga } from "./public/kline";
import { publicReducer, userReducer } from "./app";
import { rootTradesSaga, TradesState } from "./user/trades";
import { NotificationState, rootNotificationSaga } from "./user/notificationHandler";

export * from "./user/trades";
export * from "./user/notificationHandler";
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
    trades: TradesState;
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
    call(rootTradesSaga),
    call(rootNotificationSaga),
  ]);
}
