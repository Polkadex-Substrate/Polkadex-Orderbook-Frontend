import { RecentTradesActions } from "./actions";
import {
  RECENT_TRADES_DATA,
  RECENT_TRADES_ERROR,
  RECENT_TRADES_FETCH,
  RECENT_TRADES_PUSH,
} from "./constants";
import { RecentTradesState } from "./types";

import { sliceArray } from "@polkadex/web-helpers";
import { defaultConfig } from "@polkadex/orderbook-config";

const { defaultStorageLimit } = defaultConfig;

export const initialState: RecentTradesState = {
  list: [],
  loading: true,
};

export const recentTradesReducer = (state = initialState, action: RecentTradesActions) => {
  switch (action.type) {
    case RECENT_TRADES_DATA: {
      const trades = action.payload;

      trades.sort((a, b) => b.timestamp - a.timestamp);
      return {
        list: sliceArray(trades, defaultStorageLimit),
        loading: false,
        currentTrade: trades[0],
        lastTrade: trades[1],
      };
    }
    case RECENT_TRADES_ERROR: {
      return {
        list: [],
        loading: false,
        error: action.error,
        lastTrade: undefined,
      };
    }
    case RECENT_TRADES_FETCH: {
      return {
        ...state,
        loading: true,
      };
    }
    case RECENT_TRADES_PUSH: {
      return {
        ...state,
        list: sliceArray([action.payload, ...state.list], defaultStorageLimit),
      };
    }

    default:
      return state;
  }
};
