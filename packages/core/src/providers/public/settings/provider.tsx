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

  const onCheckExtension = useCallback(async () => {
    const { web3Enable } = await import("@polkadot/extension-dapp");

    const extensions = await web3Enable(APP_NAME);
    if (extensions?.length > 0) dispatch(A.checkHasExtension());
  }, []);

  // useEffect(() => {
  //   onCheckExtension();
  // }, [onCheckExtension]);

  // useEffect(() => {
  //   const installedWallets = getWallets();
  //   console.log(installedWallets, "extensions list is here");

  //   // get talisman from the array of installed wallets
  //   const talismanWallet = installedWallets.find(
  //     (wallet) => wallet.extensionName === "polkadot-js"
  //   );
  //   console.log(talismanWallet, "talismanWallet list is here");

  //   // enable the wallet
  //   if (talismanWallet) {
  //     // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  //     // @ts-ignore
  //     talismanWallet
  //       .enable("@polkadot/extension-dapp")
  //       .then(() => {
  //         talismanWallet.subscribeAccounts((accounts) => {
  //           // do anything you want with the accounts provided by the wallet
  //           console.log("got accounts", accounts);
  //         });
  //       })
  //       .catch((e) => {
  //         console.log(e, "error is here");
  //       });
  //   }
  // }, []);

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
        onCheckExtension,
      }}
    >
      {children}
    </Provider>
  );
};
