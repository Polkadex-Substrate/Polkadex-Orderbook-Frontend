import { FC, PropsWithChildren } from "react";

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

export type SettingContextProps = SettingState & {};

export interface SettingProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type SettingComponent = FC<PropsWithChildren<SettingProps>>;
