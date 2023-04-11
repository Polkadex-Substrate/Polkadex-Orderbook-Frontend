import {
  CHANGE_COLOR_THEME,
  TOGGLE_CHART_REBUILD,
  TOGGLE_ORDERS_PAIRS_SWITCHER,
  TOGGLE_MARKET_SELECTOR,
  ERROR_HANDLE_DATA,
  ERROR_HANDLE_FETCH,
  ALERT_DATA,
  ALERT_DELETE,
  ALERT_PUSH,
  NOTIFICATION_DATA,
  NOTIFICATION_DELETE_ALL,
  NOTIFICATION_PUSH,
  NOTIFICATION_DELETE_BY_ID,
  NOTIFICATION_MARK_AS_READ_BY,
} from "./constants";
import * as T from "./types";

export const initialState: T.SettingState = {
  color: (process.browser && localStorage.getItem("colorTheme")) || "dark",
  chartRebuild: false,
  marketSelectorActive: false,
  ordersHideOtherPairs: true,
  error: { processing: false },
  alert: {
    type: "",
    status: false,
    message: {
      title: "",
      description: "",
    },
  },
  notification:
    (process.browser && JSON.parse(window.localStorage.getItem("notifications"))) || [],
};

export const orderBookReducer = (state: T.SettingState, action) => {
  switch (action.type) {
    case CHANGE_COLOR_THEME: {
      process.browser && localStorage.setItem("colorTheme", action.payload);
      return {
        ...state,
        color: action.payload,
      };
    }
    case TOGGLE_CHART_REBUILD: {
      return {
        ...state,
        chartRebuild: !state.chartRebuild,
      };
    }
    case TOGGLE_MARKET_SELECTOR: {
      return {
        ...state,
        marketSelectorActive: !state.marketSelectorActive,
        sideBarActive: false,
      };
    }
    case TOGGLE_ORDERS_PAIRS_SWITCHER: {
      return {
        ...state,
        ordersHideOtherPairs: action.payload,
      };
    }
    case ERROR_HANDLE_FETCH: {
      return {
        ...state,
        error: {
          processing: true,
        },
      };
    }
    case ERROR_HANDLE_DATA: {
      return {
        ...state,
        error: {
          processing: true,
        },
      };
    }
    case ALERT_DATA: {
      return {
        ...state,
        alert: {
          status: true,
          ...action.payload,
        },
      };
    }
    case ALERT_DELETE: {
      return {
        ...state,
        alert: {
          ...initialState.alert,
        },
      };
    }
    case NOTIFICATION_PUSH: {
      const prevObj = JSON.parse(window.localStorage.getItem("notifications")) || [];
      const data = {
        isRead: false,
        isActive: false,
        ...action.payload,
      };
      window.localStorage.setItem("notifications", JSON.stringify([...prevObj, data]));
      return { ...state, notification: [...state.notification, data] };
    }
    case NOTIFICATION_DELETE_ALL: {
      window.localStorage.removeItem("notifications");
      return {
        ...state,
        notification: [],
      };
    }
    case NOTIFICATION_DELETE_BY_ID: {
      const prevObj = JSON.parse(window.localStorage.getItem("notifications")) || [];
      const newObj = prevObj?.filter((item) => item.id !== action.id);

      window.localStorage.setItem("notifications", JSON.stringify([...newObj]));
      return {
        ...state,
        notification: state.notification.filter((item) => item.id !== action.id),
      };
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
      const newData = state.notification.map((item) => {
        if (item.id === action.payload.id) {
          return {
            ...item,
            [action.payload.by]: true,
          };
        }
        return item;
      });
      return {
        ...state,
        notification: newData,
      };
    }
    case NOTIFICATION_DATA:
    case ALERT_PUSH:
    default:
      return state;
  }
};
