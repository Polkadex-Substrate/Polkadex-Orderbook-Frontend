import { useCallback, useEffect, useReducer, useState } from "react";
import { useAnnouncements } from "@orderbook/core/hooks";

import { Provider } from "./context";
import { settingReducer, initialState } from "./reducer";
import * as A from "./actions";
import * as T from "./types";
import { DEFAULTANNOUNCEMENTSNAME } from "./constants";

export const SettingProvider: T.SettingComponent = ({
  defaultToast,
  children,
}) => {
  const [state, dispatch] = useReducer(settingReducer, initialState);
  const [fundWallet, setFundWallet] = useState(false);

  // Global Setting Actions
  const onToogleConnectExtension = useCallback(
    (payload?: boolean) => dispatch(A.toogleConnectExtension(payload)),
    []
  );

  const onToogleConnectTrading = (payload?: boolean) =>
    dispatch(A.toogleConnectTrading(payload));

  const onToogleFundWallet = useCallback(
    (payload?: boolean) => setFundWallet((e) => !e || !!payload),
    []
  );

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

  const onChangeMarketCarousel = (value: T.MarketCarousel) =>
    dispatch(A.setMarketCarousel(value));

  // Notifications Actions
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
  const onReadAllNotifications = useCallback(
    () => dispatch(A.allNotificationMarkAsRead()),
    []
  );

  const onClearNotifications = useCallback(
    () => dispatch(A.notificationDeleteAll()),
    []
  );

  useEffect(() => {
    dispatch(A.getMarketCarousel());
  }, []);

  const {
    data: announcements,
    isFetching: announcementsFetching,
    isLoading: announcementsLoading,
    isSuccess: announcementsSuccess,
  } = useAnnouncements();

  console.log("announcements", announcements);
  const onReadAnnouncement = useCallback((id: string) => {
    const prevObj: string[] =
      JSON.parse(localStorage.getItem(DEFAULTANNOUNCEMENTSNAME) as string) ||
      [];
    const obj = [...prevObj];

    prevObj?.forEach((item) => {
      if (!item.includes(id)) obj.push(id);
    });
    localStorage.setItem(DEFAULTANNOUNCEMENTSNAME, JSON.stringify(obj));
  }, []);
  return (
    <Provider
      value={{
        ...state,
        fundWallet,
        announcements,
        announcementsLoading,
        announcementsSuccess: announcementsSuccess || announcementsFetching,
        onReadAnnouncement,
        onToogleFundWallet,
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
        onReadAllNotifications,
        onHandleError: defaultToast.onError,
        onHandleAlert: defaultToast.onSuccess,
        onHandleInfo: defaultToast.onInfo,
        onToogleConnectExtension,
        onToogleConnectTrading,
        onChangeMarketCarousel,
      }}
    >
      {children}
    </Provider>
  );
};
