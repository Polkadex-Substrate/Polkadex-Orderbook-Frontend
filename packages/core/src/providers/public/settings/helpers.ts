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

  return (localNotifications = localNotifications
    .filter((e) => e.message && e.category && e.description)
    ?.sort((a, b) => b.date - a.date));
};
export const setNotifications = (notifications: T.Notification[]) => {
  localStorage.setItem(
    C.DEFAULTNOTIFICATIONNAME,
    JSON.stringify(notifications)
  );
};

export const removeAllNotifications = () => {
  // Keep notifications which are not general
  const notifications = getNotifications().filter(
    (e) => e.category !== "General"
  );
  setNotifications(notifications);
};
