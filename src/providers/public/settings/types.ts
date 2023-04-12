import { FC, PropsWithChildren } from "react";

import * as A from "./actions";

export type AlertTypes = "Error" | "Successful" | "Attention" | "Loading" | "Alert" | "";

export interface AlertState {
  type?: AlertTypes;
  status?: boolean;
  message?: {
    title?: string;
    description?: string;
  };
}

export type NotificationTypes =
  | "InformationAlert"
  | "ErrorAlert"
  | "AttentionAlert"
  | "SuccessAlert"
  | "LoadingAlert";

export interface Notification {
  id?: number;
  type?: NotificationTypes;
  isRead?: boolean;
  isActive?: boolean;
  message?: {
    title?: string;
    description?: string;
  };
  time: number;
  actionUrl?: string;
  actionTitle?: string;
  hasConfetti?: boolean;
}

export interface SettingState {
  color: string;
  chartRebuild: boolean;
  ordersHideOtherPairs: boolean;
  marketSelectorActive: boolean;
  error: {
    processing: boolean;
  };
  alert: AlertState;
  notification: Notification[];
}

export type SettingProviderProps = PropsWithChildren<{
  value: SettingContextProps;
}>;

export type SettingContextProps = SettingState & {
  onToggleChartRebuild: () => void;
  onToggleMarketSelector: () => void;
  onToggleOpenOrdersPairsSwitcher: (value: boolean) => void;
  onChangeColorTheme: (value: string) => void;
  onHandleError: (value: A.ErrorHandlerFetch["payload"]) => void;
  onHandleAlert: (value: A.AlertPush["payload"]) => void;
  onAlertDelete: () => void;
  onHandleNotification: (value: A.NotificationPush["payload"]) => void;
  onNotificationMarkAsReadBy: (value: A.NotificationMarkAsReadBy["payload"]) => void;
};

export interface SettingProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type SettingComponent = FC<PropsWithChildren<SettingProps>>;
