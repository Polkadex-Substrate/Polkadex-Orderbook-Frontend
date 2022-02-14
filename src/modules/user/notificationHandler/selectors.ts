import { RootState } from "../..";

import { NotificationState } from "./actions";

export const selectNotificationState = (state: RootState): NotificationState =>
  state.user.notifications;

export const selectNotifications = (state: RootState): NotificationState["notifications"] =>
  state.user.notifications.notifications;
