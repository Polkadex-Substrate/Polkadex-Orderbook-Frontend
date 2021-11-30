import {
  NOTIFICATION_DATA,
  NOTIFICATION_DELETE,
  NOTIFICATION_PUSH,
  NOTIFICATION_DELETE_BY_INDEX,
} from "./constants";

export type NotificationTypes = "Deposit" | "Withdraw" | "Error" | "Loading" | "Buy" | "Sell";

export interface Notification {
  type?: NotificationTypes;
  isRead?: boolean;
  message?: {
    title?: string;
    description?: string;
  };
}

export interface NotificationState {
  notifications?: Notification[];
}

export interface NotificationPush {
  type: typeof NOTIFICATION_PUSH;
  payload: Notification;
}

export interface NotificationData {
  type: typeof NOTIFICATION_DATA;
  payload: Notification;
}

export interface NotificationDelete {
  type: typeof NOTIFICATION_DELETE;
}

export interface NotificationDeleteByIndex {
  type: typeof NOTIFICATION_DELETE_BY_INDEX;
  index: number;
}
export type NotificationAction =
  | NotificationPush
  | NotificationData
  | NotificationDelete
  | NotificationDeleteByIndex;

export const notificationPush = (payload: NotificationPush["payload"]): NotificationPush => ({
  type: NOTIFICATION_PUSH,
  payload,
});

export const notificationData = (payload: NotificationData["payload"]): NotificationData => ({
  type: NOTIFICATION_DATA,
  payload,
});

export const notificationDelete = (): NotificationDelete => ({
  type: NOTIFICATION_DELETE,
});

export const notificationDeleteByIndex = (index: number): NotificationDeleteByIndex => ({
  type: NOTIFICATION_DELETE_BY_INDEX,
  index,
});
