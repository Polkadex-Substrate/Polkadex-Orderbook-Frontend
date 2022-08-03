import {
  NOTIFICATION_DATA,
  NOTIFICATION_DELETE_ALL,
  NOTIFICATION_PUSH,
  NOTIFICATION_DELETE_BY_ID,
} from "./constants";

export type NotificationTypes = "InformationAlert" | "ErrorAlert" | "AttentionAlert" | string;

export interface Notification {
  id?: number;
  type?: NotificationTypes;
  isRead?: boolean;
  message?: {
    title?: string;
    description?: string;
  };
  time?: string;
  actionUrl?: string;
  actionTitle?: string;
}

export type NotificationState = Notification[];

export interface NotificationPush {
  type: typeof NOTIFICATION_PUSH;
  payload: Notification;
}

export interface NotificationData {
  type: typeof NOTIFICATION_DATA;
  payload: Notification;
}

export interface NotificationDeleteAll {
  type: typeof NOTIFICATION_DELETE_ALL;
}

export interface NotificationDeleteById {
  type: typeof NOTIFICATION_DELETE_BY_ID;
  id: number;
}
export type NotificationAction =
  | NotificationPush
  | NotificationData
  | NotificationDeleteAll
  | NotificationDeleteById;

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
