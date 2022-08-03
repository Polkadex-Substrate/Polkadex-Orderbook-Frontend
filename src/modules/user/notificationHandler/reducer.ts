import { NotificationAction, Notification } from "./actions";
import {
  NOTIFICATION_DATA,
  NOTIFICATION_DELETE_ALL,
  NOTIFICATION_PUSH,
  NOTIFICATION_DELETE_BY_ID,
} from "./constants";

export const initialNotificationState: Notification[] =
  process.browser && JSON.parse(window.localStorage.getItem("notifications"));

export const notificationReducer = (
  state = initialNotificationState,
  action: NotificationAction
) => {
  switch (action.type) {
    case NOTIFICATION_PUSH: {
      action.payload.id = Math.floor(Math.random() * 1000);
      const prevObj = JSON.parse(window.localStorage.getItem("notifications")) || [];
      window.localStorage.setItem(
        "notifications",
        JSON.stringify([...prevObj, action.payload])
      );
      return [...state, action.payload];
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

    case NOTIFICATION_DATA:
    default:
      return state;
  }
};
