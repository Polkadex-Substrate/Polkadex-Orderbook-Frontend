import * as T from "./types";

export const selectNotifications = (allNotifications: T.Notification[]): T.Notification[] =>
  allNotifications?.sort((a, b) => b.time - a.time);

export const selectNotificationsAlert = (
  allNotifications: T.Notification[]
): T.Notification[] =>
  allNotifications?.sort((a, b) => a.time - b.time).filter((value) => !value.isActive);
