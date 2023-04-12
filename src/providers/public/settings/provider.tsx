import { useReducer } from "react";

import { Provider } from "./context";
import { settingReducer, initialState } from "./reducer";
import * as A from "./actions";

import { transFormErrorMessage } from "@polkadex/orderbook/modules/public/errorHandler/helper";
import { defaultConfig } from "@polkadex/orderbook-config";

const { alertDisplayTime } = defaultConfig;

export const SettingProvider = ({ children }) => {
  const [state, dispatch] = useReducer(settingReducer, initialState);

  // Actions

  // Global Setting Actions
  const onToggleChartRebuild = () => {
    dispatch(A.toggleChartRebuild());
  };

  const onToggleMarketSelector = () => {
    dispatch(A.toggleMarketSelector());
  };

  const onToggleOpenOrdersPairsSwitcher = (payload: boolean) => {
    dispatch(A.toggleOpenOrdersPairsSwitcher(payload));
  };

  const onChangeColorTheme = (payload: string) => {
    dispatch(A.changeColorTheme(payload));
  };

  // Error Handler Actions
  const onHandleError = (payload: A.ErrorHandlerFetch["payload"]) => {
    const { processingType, error, extraOptions } = payload;

    if (extraOptions?.params) dispatch(extraOptions.actionError(extraOptions.params));

    if (extraOptions?.actionError && !extraOptions?.params)
      dispatch(extraOptions.actionError());

    switch (processingType) {
      case "alert": {
        onHandleAlert({
          message: {
            title: "Error",
            description: transFormErrorMessage(error),
          },
          type: "Alert",
        });
        break;
      }
      case "console": {
        process.browser && window.console.log(error);
        break;
      }
      default:
        break;
    }
    dispatch(A.getErrorData());
  };

  // Alert Actions
  const onHandleAlert = (payload: A.AlertPush["payload"]) => {
    dispatch(A.alertData(payload));
  };

  // Notification Handler Actions
  const onHandleNotification = (payload: A.NotificationPush["payload"]) => {
    dispatch(A.notificationPush(payload));
    setTimeout(() => {
      dispatch(A.notificationMarkAsReadBy({ id: payload.id, by: "isActive" }));
    }, alertDisplayTime);
  };

  const onNotificationMarkAsReadBy = (payload: A.NotificationMarkAsReadBy["payload"]) => {
    dispatch(A.notificationMarkAsReadBy(payload));
  };

  return (
    <Provider
      value={{
        ...state,
        onToggleChartRebuild,
        onToggleMarketSelector,
        onToggleOpenOrdersPairsSwitcher,
        onChangeColorTheme,
        onHandleError,
        onHandleAlert,
        onHandleNotification,
        onNotificationMarkAsReadBy,
      }}>
      {children}
    </Provider>
  );
};
