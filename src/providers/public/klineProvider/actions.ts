import { CommonError } from "../../types";

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

import { SubscribeBarsCallback } from "public/static/charting_library/charting_library";

export interface KlinePush {
  type: typeof KLINE_PUSH;
  payload: {
    kline: KlineEvent;
    market: string;
    interval: string;
  };
}

export interface KlineFetch {
  type: typeof KLINE_FETCH;
  payload: {
    market: string;
    resolution: string;
    from: Date;
    to: Date;
  };
}

export interface KlineData {
  type: typeof KLINE_DATA;
  payload: { list: KlineEvent[]; market: string; interval: string };
}

export interface KlineUpdateTimeRange {
  type: typeof KLINE_UPDATE_TIME_RANGE;
  payload: {
    from: number;
    to: number;
  };
}

export interface KlineUpdatePeriod {
  type: typeof KLINE_UPDATE_PERIOD;
  payload: string;
}

export interface KlineError {
  type: typeof KLINE_ERROR;
  error: CommonError;
}

export interface KlineSubscribe {
  type: typeof KLINE_SUBSCRIBE;
  payload: {
    market: string;
    interval: string;
    onUpdateTradingViewRealTime: SubscribeBarsCallback;
  };
}

export interface KlineUnsubscribe {
  type: typeof KLINE_UNSUBSCRIBE;
  payload: {
    marketId: string;
    period: string;
  };
}

export type KlineActions =
  | KlinePush
  | KlineFetch
  | KlineData
  | KlineUpdateTimeRange
  | KlineUpdatePeriod
  | KlineError
  | KlineSubscribe
  | KlineUnsubscribe;

export const klinePush = (payload: KlinePush["payload"]): KlinePush => ({
  type: KLINE_PUSH,
  payload,
});

export const klineFetch = (payload: KlineFetch["payload"]): KlineFetch => ({
  type: KLINE_FETCH,
  payload,
});

export const klineData = (payload: KlineData["payload"]): KlineData => ({
  type: KLINE_DATA,
  payload,
});

export const klineUpdateTimeRange = (
  payload: KlineUpdateTimeRange["payload"]
): KlineUpdateTimeRange => ({
  type: KLINE_UPDATE_TIME_RANGE,
  payload,
});

export const klineUpdatePeriod = (
  payload: KlineUpdatePeriod["payload"]
): KlineUpdatePeriod => ({
  type: KLINE_UPDATE_PERIOD,
  payload,
});

export const klineError = (error: CommonError): KlineError => ({
  type: KLINE_ERROR,
  error,
});

export const klineSubscribe = (payload: KlineSubscribe["payload"]): KlineSubscribe => ({
  type: KLINE_SUBSCRIBE,
  payload,
});

export const klineUnsubscribe = (payload: KlineUnsubscribe["payload"]): KlineUnsubscribe => ({
  type: KLINE_UNSUBSCRIBE,
  payload,
});
