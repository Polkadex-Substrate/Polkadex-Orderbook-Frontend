import { RootState } from "../..";

import { NotificationState } from "./actions";

export const selectNotifications = (state: RootState): NotificationState =>
  state.user.notifications;
