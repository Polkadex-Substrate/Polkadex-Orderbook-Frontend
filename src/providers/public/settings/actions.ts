import {
  CHANGE_COLOR_THEME,
  TOGGLE_CHART_REBUILD,
  TOGGLE_ORDERS_PAIRS_SWITCHER,
  TOGGLE_MARKET_SELECTOR,
  ERROR_HANDLE_DATA,
  ERROR_HANDLE_FETCH,
  ALERT_DATA,
  ALERT_DELETE,
  ALERT_PUSH,
  NOTIFICATION_DATA,
  NOTIFICATION_DELETE_ALL,
  NOTIFICATION_PUSH,
  NOTIFICATION_DELETE_BY_ID,
  NOTIFICATION_MARK_AS_READ_BY,
} from "./constants";
import * as T from "./types";

export interface ChangeColorThemeAction {
  type: string;
  payload: string;
}

export interface ToggleChartRebuildAction {
  type: string;
}

export interface ToggleMarketSelectorAction {
  type: string;
}

export interface ToggleOpenOrdersPairsSwitcher {
  type: string;
  payload: boolean;
}

export interface ErrorHandlerFetch {
  type: typeof ERROR_HANDLE_FETCH;
  payload: {
    processingType: "alert" | "console";
    error: string;
    extraOptions?: {
      params?: any;
      actionError?: any;
    };
  };
}

export interface AlertPush {
  type: typeof ALERT_PUSH;
  payload: T.AlertState;
}

export interface AlertData {
  type: typeof ALERT_DATA;
  payload: T.AlertState;
}

export interface AlertDelete {
  type: typeof ALERT_DELETE;
}

export interface ErrorHandlerData {
  type: typeof ERROR_HANDLE_DATA;
}

export interface NotificationPush {
  type: typeof NOTIFICATION_PUSH;
  payload: T.Notification;
}

export interface NotificationData {
  type: typeof NOTIFICATION_DATA;
  payload: T.Notification;
}

export interface NotificationDeleteAll {
  type: typeof NOTIFICATION_DELETE_ALL;
}

export interface NotificationDeleteById {
  type: typeof NOTIFICATION_DELETE_BY_ID;
  id: number;
}
export interface NotificationMarkAsReadBy {
  type: typeof NOTIFICATION_MARK_AS_READ_BY;
  payload: {
    id: number;
    by?: "isRead" | "isActive";
  };
}

export type SettingActions =
  | ChangeColorThemeAction
  | ToggleChartRebuildAction
  | ToggleMarketSelectorAction
  | ToggleOpenOrdersPairsSwitcher
  | ErrorHandlerFetch
  | ErrorHandlerData
  | AlertPush
  | AlertData
  | AlertDelete
  | NotificationPush
  | NotificationData
  | NotificationDeleteAll
  | NotificationDeleteById
  | NotificationMarkAsReadBy;

export const toggleChartRebuild = (): ToggleChartRebuildAction => ({
  type: TOGGLE_CHART_REBUILD,
});

export const toggleMarketSelector = (): ToggleMarketSelectorAction => ({
  type: TOGGLE_MARKET_SELECTOR,
});

export const toggleOpenOrdersPairsSwitcher = (
  payload: boolean
): ToggleOpenOrdersPairsSwitcher => ({
  type: TOGGLE_ORDERS_PAIRS_SWITCHER,
  payload,
});

export const changeColorTheme = (payload: string): ChangeColorThemeAction => ({
  type: CHANGE_COLOR_THEME,
  payload,
});

export const sendError = (payload: ErrorHandlerFetch["payload"]): ErrorHandlerFetch => ({
  type: ERROR_HANDLE_FETCH,
  payload,
});

export const getErrorData = (): ErrorHandlerData => ({
  type: ERROR_HANDLE_DATA,
});

export const alertPush = (payload: AlertPush["payload"]): AlertPush => ({
  type: ALERT_PUSH,
  payload,
});

export const alertData = (payload: AlertData["payload"]): AlertData => ({
  type: ALERT_DATA,
  payload,
});

export const alertDelete = (): AlertDelete => ({
  type: ALERT_DELETE,
});

export const notificationPush = (payload: NotificationPush["payload"]): NotificationPush => ({
  type: NOTIFICATION_PUSH,
  payload,
});

export const notificationData = (payload: NotificationData["payload"]): NotificationData => ({
  type: NOTIFICATION_DATA,
  payload,
});

export const notificationDeleteAll = (): NotificationDeleteAll => ({
  type: NOTIFICATION_DELETE_ALL,
});

export const notificationDeleteById = (id: number): NotificationDeleteById => ({
  type: NOTIFICATION_DELETE_BY_ID,
  id,
});

export const notificationMarkAsReadBy = (
  payload: NotificationMarkAsReadBy["payload"]
): NotificationMarkAsReadBy => ({
  type: NOTIFICATION_MARK_AS_READ_BY,
  payload,
});
