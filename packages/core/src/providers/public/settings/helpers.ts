import { additionalNotifications } from "./notifications";
import * as T from "./types";
import * as C from "./constants";

export const selectNotifications = (
  allNotifications: T.Notification[]
): T.Notification[] => allNotifications?.sort((a, b) => b.date - a.date);

export const selectNotificationsAlert = (
  allNotifications: T.Notification[]
): T.Notification[] =>
  allNotifications
    ?.sort((a, b) => a.date - b.date)
    .filter((value) => !value.active);

export const getNotifications = (): T.Notification[] => {
  let localNotifications: T.Notification[] =
    JSON.parse(localStorage.getItem(C.DEFAULTNOTIFICATIONNAME) as string) || [];

  localNotifications = localNotifications
    .filter((e) => e.message && e.category && e.description)
    ?.sort((a, b) => b.date - a.date);

  const filteredAdditionalNotifications = additionalNotifications.filter(
    (e) => !localNotifications.map((n) => n.id).includes(e.id)
  );

  return filteredAdditionalNotifications.concat(localNotifications);
};
