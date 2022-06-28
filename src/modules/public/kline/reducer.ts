import { CommonState } from "../../types";

import { KlineActions } from "./actions";
import {
  KLINE_DATA,
  KLINE_ERROR,
  KLINE_FETCH,
  KLINE_PUSH,
  KLINE_SUBSCRIBE,
  KLINE_UNSUBSCRIBE,
  KLINE_UPDATE_PERIOD,
  KLINE_UPDATE_TIME_RANGE,
} from "./constants";
import { KlineEvent } from "./types";

export interface KlineState extends CommonState {
  last?: {
    kline: KlineEvent;
    market: string;
    interval: string;
  };
  market: string;
  interval: string;
  message?: string;
  loading: boolean;
  data: KlineEvent[];
  range: {
    from: number;
    to: number;
  };
}

export const initialKlineState: KlineState = {
  last: undefined,
  market: undefined,
  interval: undefined,
  message: undefined,
  loading: false,
  data: [],
  range: {
    from: 0,
    to: 0,
  },
};

export const klineReducer = (state = initialKlineState, action: KlineActions): KlineState => {
  switch (action.type) {
    case KLINE_SUBSCRIBE:
      return {
        ...state,
        message: "subscribe",
      };
    case KLINE_UNSUBSCRIBE:
      return {
        ...state,
        message: "unsubscribe",
      };
    case KLINE_PUSH: {
      return {
        ...state,
        last: {
          kline: action.payload.kline,
          market: action.payload.market,
          interval: action.payload.interval,
        },
      };
    }
    case KLINE_FETCH:
      return {
        ...state,
        loading: true,
      };
    case KLINE_DATA:
      return {
        ...state,
        loading: false,
        market: action.payload.market,
        interval: action.payload.interval,
        data: action.payload.list,
      };
    case KLINE_UPDATE_TIME_RANGE:
      return {
        ...state,
        range: action.payload,
      };
    case KLINE_UPDATE_PERIOD:
      return {
        ...state,
        interval: action.payload,
      };
    case KLINE_ERROR:
      return initialKlineState;
    default:
      return state;
  }
};
