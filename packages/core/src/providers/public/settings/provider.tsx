import { useCallback, useEffect, useReducer } from "react";
import { getWallets } from "@talismn/connect-wallets";

import { Provider } from "./context";
import { settingReducer, initialState } from "./reducer";
import * as A from "./actions";
import * as T from "./types";
import { APP_NAME } from "./constants";

export const SettingProvider: T.SettingComponent = ({
  defaultToast,
  children,
}) => {
  const [state, dispatch] = useReducer(settingReducer, initialState);

  // Actions

  // Global Setting Actions
  const onToggleChartRebuild = useCallback(() => {
    dispatch(A.toggleChartRebuild());
  }, []);

  const onToggleMarketSelector = useCallback(() => {
    dispatch(A.toggleMarketSelector());
  }, []);

  const onToggleOpenOrdersPairsSwitcher = useCallback((payload: boolean) => {
    dispatch(A.toggleOpenOrdersPairsSwitcher(payload));
  }, []);

  const onChangeTheme = useCallback(
    (value: A.ChangeThemeSettings["payload"]) => {
      dispatch(A.onChangeThemeSettings(value));
    },
    []
  );

  const onChangeLanguage = useCallback(
    (value: A.ChangeLanguageSettings["payload"]) =>
      dispatch(A.onChangeLanguageSettings(value)),
    []
  );

  const onChangeCurrency = useCallback(
    (value: A.ChangeCurrencySettings["payload"]) =>
      dispatch(A.onChangeCurrencySettings(value)),
    []
  );

  const onPushNotification = useCallback(
    (payload: T.NotificationPayload) => dispatch(A.notificationPush(payload)),
    []
  );

  const onRemoveNotification = useCallback(
    (value: T.Notification["id"]) => dispatch(A.notificationDeleteById(value)),
    []
  );

  const onReadNotification = useCallback(
    (value: T.Notification["id"]) => dispatch(A.notificationMarkAsRead(value)),
    []
  );

  const onClearNotifications = useCallback(
    () => dispatch(A.notificationDeleteAll()),
    []
  );

  const onHandleNotification = useCallback(
    (payload: T.NotificationPayload) => {
      if (payload.type === "Error") defaultToast.onError(payload.message);
      else defaultToast.onSuccess(payload.message);
      dispatch(A.notificationPush(payload));
    },
    [defaultToast]
  );

  return (
    <Provider
      value={{
        ...state,
        onToggleChartRebuild,
        onToggleMarketSelector,
        onToggleOpenOrdersPairsSwitcher,
        onChangeTheme,
        onChangeLanguage,
        onChangeCurrency,
        onPushNotification,
        onClearNotifications,
        onRemoveNotification,
        onReadNotification,
        onHandleError: defaultToast.onError,
        onHandleAlert: defaultToast.onSuccess,
        onHandleNotification,
      }}
    >
      {children}
    </Provider>
  );
};
