import { CommonError } from "../../types";

import { RecentTradesActions } from "./actions";
import { RECENT_TRADES_DATA, RECENT_TRADES_ERROR, RECENT_TRADES_FETCH } from "./constants";
import { PublicTrade } from "./types";

import { sliceArray } from "@polkadex/web-helpers";
import { defaultConfig } from "@polkadex/orderbook-config";

const { defaultStorageLimit } = defaultConfig;

export interface RecentTradesState {
  list: PublicTrade[];
  loading: boolean;
  currentTrade?: PublicTrade;
  lastTrade?: PublicTrade;
  error?: CommonError;
}

const initialState: RecentTradesState = {
  list: [],
  loading: false,
};

export const recentTradesReducer = (state = initialState, action: RecentTradesActions) => {
  switch (action.type) {
    case RECENT_TRADES_DATA: {
      return {
        list: sliceArray(action.payload, defaultStorageLimit),
        loading: false,
        currentTrade: action.payload[0],
        lastTrade: action.payload[1],
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

    default:
      return state;
  }
};
