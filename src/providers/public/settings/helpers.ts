import * as T from "./types";

export const selectNotifications = (allNotifications: T.Notification[]): T.Notification[] =>
  allNotifications?.sort((a, b) => b.date - a.date);

export const selectNotificationsAlert = (
  allNotifications: T.Notification[]
): T.Notification[] =>
  allNotifications?.sort((a, b) => a.date - b.date).filter((value) => !value.active);
