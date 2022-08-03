import { RootState } from "../..";

import { NotificationState } from "./actions";

export const selectNotifications = (state: RootState): NotificationState =>
  state.user.notifications?.sort((a, b) => b.time - a.time);

export const selectNotificationsAlert = (state: RootState): NotificationState =>
  state.user.notifications?.sort((a, b) => a.time - b.time).filter((value) => !value.isActive);
