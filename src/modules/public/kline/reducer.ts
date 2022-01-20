import { CommonState } from "../../types";

import { KlineActions, KlineRawElement } from "./actions";
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
  last?: KlineEvent;
  marketId?: string;
  period?: string;
  message?: string;
  loading: boolean;
  data: any;
  range: {
    from: number;
    to: number;
  };
}

// needs to be update to suite new data structure 
export const klineArrayToObject = (el: KlineRawElement[]): KlineEvent => {
  
  const [time, open, high, low, close, volume] = el.map((e: KlineRawElement) => {
    switch (typeof e) {
      case "number":
        return e;
      case "string":
        return Number.parseFloat(e);
      default:
        throw new Error(`unexpected type ${typeof e} in kline: ${el}`);
    }
  });

  return {
    time: time * 1e3,
    open,
    high,
    low,
    close,
    volume,
  };
};

export const klineEventToObject = (data) => {
  const {o: open, c: close, h: high, l: low, v: volume } = data.k;
  const time = data.E

  return {
    time: parseInt(time),
    open: parseFloat(open),
    high: parseFloat(high),
    low: parseFloat(low),
    close: parseFloat(close),
    volume: parseFloat(volume),
  };
}

export const initialKlineState: KlineState = {
  last: undefined,
  marketId: undefined,
  period: undefined,
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
        marketId: action.payload.marketId,
        period: action.payload.period,
        message: "subscribe",
      };
    case KLINE_UNSUBSCRIBE:
      return {
        ...state,
        marketId: action.payload.marketId,
        period: action.payload.period,
        message: "unsubscribe",
      };
    case KLINE_PUSH: {
      const { kline, marketId, period } = action.payload;

      return {
        ...state,
        marketId,
        period,
        last: kline,
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
        data: action.payload,
      };
    case KLINE_UPDATE_TIME_RANGE:
      return {
        ...state,
        range: action.payload,
      };
    case KLINE_UPDATE_PERIOD:
      return {
        ...state,
        period: action.payload,
      };
    case KLINE_ERROR:
      return initialKlineState;
    default:
      return state;
  }
};
