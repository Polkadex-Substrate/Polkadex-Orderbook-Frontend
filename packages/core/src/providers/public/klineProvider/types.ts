import { FC, PropsWithChildren } from "react";

import { CommonState } from "../../types";

import { KlineFetch, KlineSubscribe } from "./actions";

export type KlineDbData = {
  m: string;
  interval: string;
  o: string;
  c: string;
  h: string;
  l: string;
  vb: string;
  vq: string;
  t: string;
};

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

export interface KlineEvent {
  timestamp: number;
  close: number;
  open: number;
  high: number;
  low: number;
  volume: number;
}

export type KlineContextProps = KlineState & {
  onHandleKlineFetch: (value: KlineFetch["payload"]) => Promise<KlineEvent[]>;
  onFetchKlineChannel: (value: KlineSubscribe["payload"]) => void;
};

export type KlineProviderProps = PropsWithChildren<{
  value: KlineContextProps;
}>;

export interface KlineProps {
  onError?: (value: string) => void;
  onNotification?: (value: string) => void;
}

export type KlineComponent = FC<PropsWithChildren<KlineProps>>;
