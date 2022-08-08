import { NotificationAction, Notification } from "./actions";
import {
  NOTIFICATION_DATA,
  NOTIFICATION_DELETE_ALL,
  NOTIFICATION_PUSH,
  NOTIFICATION_DELETE_BY_ID,
  NOTIFICATION_MARK_AS_READ_BY,
} from "./constants";

export const initialNotificationState: Notification[] =
  (process.browser && JSON.parse(window.localStorage.getItem("notifications"))) || [];

export const notificationReducer = (
  state = initialNotificationState,
  action: NotificationAction
) => {
  switch (action.type) {
    case NOTIFICATION_PUSH: {
      const prevObj = JSON.parse(window.localStorage.getItem("notifications")) || [];
      const data = {
        isRead: false,
        isActive: false,
        ...action.payload,
      };
      window.localStorage.setItem("notifications", JSON.stringify([...prevObj, data]));
      return [...state, data];
    }

    case NOTIFICATION_DELETE_ALL:
      window.localStorage.removeItem("notifications");
      return [];

    case NOTIFICATION_DELETE_BY_ID: {
      const prevObj = JSON.parse(window.localStorage.getItem("notifications")) || [];
      const newObj = prevObj?.filter((item) => item.id !== action.id);

      window.localStorage.setItem("notifications", JSON.stringify([...newObj]));
      return state.filter((item) => item.id !== action.id);
    }

    case NOTIFICATION_MARK_AS_READ_BY: {
      const prevObj = JSON.parse(window.localStorage.getItem("notifications")) || [];
      const newObj = prevObj?.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            [action.payload.by]: true,
          };
        }
        return item;
      });

      window.localStorage.setItem("notifications", JSON.stringify([...newObj]));
      return state.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            [action.payload.by]: true,
          };
        }
        return item;
      });
    }

    case NOTIFICATION_DATA:
    default:
      return state;
  }
};
