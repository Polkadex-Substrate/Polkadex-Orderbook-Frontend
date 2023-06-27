import { FC, PropsWithChildren } from "react";

export type NotificationPayload = {
  type: "Error" | "Information" | "Success" | "Loading" | "Attention";
  message: string;
};

export interface Notification extends NotificationPayload {
  id: number | string;
  date: number;
  active?: boolean;
}
export interface SettingState {
  chartRebuild: boolean;
  ordersHideOtherPairs: boolean;
  marketSelectorActive: boolean;
  theme: "light" | "dark";
  language: "en" | "fr" | "es" | "zh";
  currency: "USD" | "EUR" | "CNY" | "INR";
  notifications: Notification[];
  hasExtension?: boolean;
}

export type SettingProviderProps = PropsWithChildren<{
  value: SettingContextProps;
}>;

type ToastActions = {
  onError: (value: string) => void;
  onSuccess: (value: string) => void;
};

export type SettingContextProps = SettingState & {
  onToggleChartRebuild: () => void;
  onToggleMarketSelector: () => void;
  onToggleOpenOrdersPairsSwitcher: (value: boolean) => void;
  onChangeTheme: (value: SettingState["theme"]) => void;
  onChangeLanguage: (value: SettingState["language"]) => void;
  onChangeCurrency: (value: SettingState["currency"]) => void;
  onPushNotification: (value: NotificationPayload) => void;
  onRemoveNotification: (value: Notification["id"]) => void;
  onReadNotification: (value: Notification["id"]) => void;
  onClearNotifications: () => void;
  onHandleError: ToastActions["onError"];
  onHandleAlert: ToastActions["onSuccess"];
  onHandleNotification: (value: NotificationPayload) => void;
  onCheckExtension: (extension: boolean) => void;
};

export type SettingsProps = {
  defaultTheme?: SettingState["theme"];
  defaultLanguage?: SettingState["language"];
  defaultCurrency?: SettingState["currency"];
  defaultToast: ToastActions;
};

export type SettingComponent = FC<PropsWithChildren<SettingsProps>>;
