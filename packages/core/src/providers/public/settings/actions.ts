import * as C from "./constants";
import * as T from "./types";

export interface ToggleChartRebuildAction {
  type: typeof C.TOGGLE_CHART_REBUILD;
}

export interface ToggleMarketSelectorAction {
  type: typeof C.TOGGLE_MARKET_SELECTOR;
}

export interface ToggleOpenOrdersPairsSwitcher {
  type: typeof C.TOGGLE_ORDERS_PAIRS_SWITCHER;
  payload: boolean;
}

export interface ToogleConnectExtension {
  type: typeof C.TOOGLE_CONNECT_EXTENSION;
  payload?: boolean;
}

export interface ToogleConnectTrading {
  type: typeof C.TOOGLE_CONNECT_TRADING;
  payload?: boolean;
}

export interface ChangeThemeSettings {
  type: typeof C.SETTINGS_CHANGE_THEME;
  payload: T.SettingState["theme"];
}

export interface ChangeLanguageSettings {
  type: typeof C.SETTINGS_CHANGE_LANGUAGE;
  payload: T.SettingState["language"];
}

export interface ChangeCurrencySettings {
  type: typeof C.SETTINGS_CHANGE_CURRENCY;
  payload: T.SettingState["currency"];
}

export interface NotificationPush {
  type: typeof C.NOTIFICATION_PUSH;
  payload: T.NotificationPayload;
}

export interface NotificationDeleteAll {
  type: typeof C.NOTIFICATION_DELETE_ALL;
}

export interface NotificationDeleteById {
  type: typeof C.NOTIFICATION_DELETE_BY_ID;
  payload: number | string;
}
export interface NotificationMarkAsRead {
  type: typeof C.NOTIFICATION_MARK_AS_READ;
  payload: number | string;
}

export interface CheckHasExtension {
  type: typeof C.CHECK_HAS_EXTENSION;
}

export type SettingActions =
  | ToggleChartRebuildAction
  | ToggleMarketSelectorAction
  | ToggleOpenOrdersPairsSwitcher
  | ChangeThemeSettings
  | ChangeLanguageSettings
  | ChangeCurrencySettings
  | NotificationPush
  | NotificationDeleteAll
  | NotificationDeleteById
  | NotificationMarkAsRead
  | CheckHasExtension
  | ToogleConnectExtension
  | ToogleConnectTrading;

export const toggleChartRebuild = (): ToggleChartRebuildAction => ({
  type: C.TOGGLE_CHART_REBUILD,
});

export const toggleMarketSelector = (): ToggleMarketSelectorAction => ({
  type: C.TOGGLE_MARKET_SELECTOR,
});

export const toggleOpenOrdersPairsSwitcher = (
  payload: boolean
): ToggleOpenOrdersPairsSwitcher => ({
  type: C.TOGGLE_ORDERS_PAIRS_SWITCHER,
  payload,
});

export const toogleConnectExtension = (
  payload: ToogleConnectExtension["payload"]
): ToogleConnectExtension => ({
  type: C.TOOGLE_CONNECT_EXTENSION,
  payload,
});

export const toogleConnectTrading = (
  payload: ToogleConnectTrading["payload"]
): ToogleConnectTrading => ({
  type: C.TOOGLE_CONNECT_TRADING,
  payload,
});

export const onChangeThemeSettings = (
  payload: ChangeThemeSettings["payload"]
): ChangeThemeSettings => ({
  type: C.SETTINGS_CHANGE_THEME,
  payload,
});

export const onChangeLanguageSettings = (
  payload: ChangeLanguageSettings["payload"]
): ChangeLanguageSettings => ({
  type: C.SETTINGS_CHANGE_LANGUAGE,
  payload,
});

export const onChangeCurrencySettings = (
  payload: ChangeCurrencySettings["payload"]
): ChangeCurrencySettings => ({
  type: C.SETTINGS_CHANGE_CURRENCY,
  payload,
});

export const notificationPush = (
  payload: NotificationPush["payload"]
): NotificationPush => ({
  type: C.NOTIFICATION_PUSH,
  payload,
});

export const notificationDeleteAll = (): NotificationDeleteAll => ({
  type: C.NOTIFICATION_DELETE_ALL,
});

export const notificationDeleteById = (
  payload: NotificationDeleteById["payload"]
): NotificationDeleteById => ({
  type: C.NOTIFICATION_DELETE_BY_ID,
  payload,
});

export const notificationMarkAsRead = (
  payload: NotificationMarkAsRead["payload"]
): NotificationMarkAsRead => ({
  type: C.NOTIFICATION_MARK_AS_READ,
  payload,
});

export const checkHasExtension = (): CheckHasExtension => ({
  type: C.CHECK_HAS_EXTENSION,
});
