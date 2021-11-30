import { NotificationState, NotificationAction } from "./actions";
import {
  NOTIFICATION_DATA,
  NOTIFICATION_DELETE,
  NOTIFICATION_PUSH,
  NOTIFICATION_DELETE_BY_INDEX,
} from "./constants";

export const initialNotificationState: NotificationState = {
  notifications: [],
};

export const notificationReducer = (
  state = initialNotificationState,
  action: NotificationAction
) => {
  switch (action.type) {
    case NOTIFICATION_DATA:
      return {
        notifications: [...state.notifications, action.payload],
      };
    case NOTIFICATION_DELETE:
      return {
        notifications: [...state.notifications.slice(1, state.notifications.length)],
      };
    case NOTIFICATION_DELETE_BY_INDEX:
      return {
        notifications: [
          ...state.notifications
            .slice(0, action.index)
            .concat(...state.notifications.slice(action.index + 1)),
        ],
      };
    case NOTIFICATION_PUSH:
    default:
      return state;
  }
};
