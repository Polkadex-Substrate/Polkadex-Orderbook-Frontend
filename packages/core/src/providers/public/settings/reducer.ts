import { SettingActions } from "@orderbook/core/providers/public/settings/actions";

import * as T from "./types";
import * as C from "./constants";
import { getNotifications, setNotifications } from "./helpers";

const defaultTheme = "dark";
// eslint-disable-next-line @typescript-eslint/no-explicit-any
const isBrowser = (process as any).browser;
const defaultLanguage = isBrowser && navigator.language.substring(0, 2);

// TODO: Revert it back when we have light theme support for wallet connect
const theme = defaultTheme as T.SettingState["theme"];

const language = ((isBrowser && localStorage.getItem(C.DEFAULTLANGUAGENAME)) ??
  defaultLanguage) as T.SettingState["language"];

const currency = ((isBrowser && localStorage.getItem(C.DEFAULTCURRENCYNAME)) ??
  "USD") as T.SettingState["currency"];

const notifications = getNotifications();

export const initialState: T.SettingState = {
  theme,
  currency,
  language,
  notifications,
  chartRebuild: false,
  marketSelectorActive: false,
  ordersHideOtherPairs: true,
  hasExtension: false,
  connectExtension: false,
  connectTrading: false,
};

export const settingReducer = (
  state: T.SettingState,
  action: SettingActions
) => {
  switch (action.type) {
    case C.SETTINGS_CHANGE_THEME: {
      isBrowser &&
        window.localStorage.setItem(C.DEFAULTTHEMENAME, action.payload);
      return {
        ...state,
        theme: action.payload,
      };
    }
    case C.SETTINGS_CHANGE_LANGUAGE: {
      isBrowser &&
        window.localStorage.setItem(C.DEFAULTLANGUAGENAME, action.payload);
      return {
        ...state,
        language: action.payload,
      };
    }

    case C.SETTINGS_CHANGE_CURRENCY: {
      isBrowser &&
        window.localStorage.setItem(C.DEFAULTCURRENCYNAME, action.payload);
      return {
        ...state,
        currency: action.payload,
      };
    }
    case C.TOGGLE_CHART_REBUILD: {
      return {
        ...state,
        chartRebuild: !state.chartRebuild,
      };
    }
    case C.TOGGLE_MARKET_SELECTOR: {
      return {
        ...state,
        marketSelectorActive: !state.marketSelectorActive,
        sideBarActive: false,
      };
    }
    case C.TOGGLE_ORDERS_PAIRS_SWITCHER: {
      return {
        ...state,
        ordersHideOtherPairs: action.payload,
      };
    }

    case C.NOTIFICATION_PUSH: {
      const prevObj = getNotifications();
      const data: T.Notification = {
        id: new Date().getTime().toString(36) + new Date().getUTCMilliseconds(),
        active: true,
        date: Date.now(),
        category: action.payload.category,
        message: action.payload.message,
        type: action.payload.type,
        description: action.payload.description,
        href: action.payload.href,
      };

      if (prevObj?.length >= 16) prevObj.shift();

      setNotifications([data, ...prevObj]);

      return {
        ...state,
        notifications: [data, ...prevObj],
      };
    }

    case C.NOTIFICATION_DELETE_ALL:
      isBrowser && window.localStorage.removeItem(C.DEFAULTNOTIFICATIONNAME);
      return {
        ...state,
        notifications: [],
      };

    case C.TOOGLE_CONNECT_EXTENSION:
      return {
        ...state,
        connectExtension: action.payload || !state.connectExtension,
      };

    case C.TOOGLE_CONNECT_TRADING:
      return {
        ...state,
        connectTrading: action.payload || !state.connectTrading,
      };

    case C.NOTIFICATION_DELETE_BY_ID: {
      const localNotifications = window.localStorage.getItem(
        C.DEFAULTNOTIFICATIONNAME
      );
      const prevObj: T.Notification[] =
        JSON.parse(localNotifications as string) || [];

      const newObj = prevObj?.filter((item) => item.id !== action.payload);

      isBrowser &&
        window.localStorage.setItem(
          C.DEFAULTNOTIFICATIONNAME,
          JSON.stringify([...newObj])
        );

      return {
        ...state,
        notifications: [
          ...state?.notifications?.filter((item) => item.id !== action.payload),
        ],
      };
    }

    case C.NOTIFICATION_MARK_AS_READ: {
      const localNotifications =
        isBrowser && window.localStorage.getItem(C.DEFAULTNOTIFICATIONNAME);
      const prevObj: T.Notification[] =
        JSON.parse(localNotifications as string) || [];

      const newObj = prevObj?.map((item) => {
        if (item.id === action.payload)
          return {
            ...item,
            active: false,
          };

        return item;
      });

      isBrowser &&
        window.localStorage.setItem(
          C.DEFAULTNOTIFICATIONNAME,
          JSON.stringify([...newObj])
        );

      return {
        ...state,
        notifications: [
          ...state?.notifications?.map((item) => {
            if (item.id === action.payload) {
              return {
                ...item,
                active: false,
              };
            }
            return item;
          }),
        ],
      };
    }

    case C.ALL_NOTIFICATION_MARK_AS_READ: {
      const notifications = state.notifications.map((e) => ({
        ...e,
        active: false,
      }));
      setNotifications(notifications);
      return { ...state, notifications };
    }

    case C.CHECK_HAS_EXTENSION: {
      return {
        ...state,
        hasExtension: true,
      };
    }

    default:
      return state;
  }
};
