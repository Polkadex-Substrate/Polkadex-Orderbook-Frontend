import { FC, PropsWithChildren } from "react";

export type CandleSubscriptionProps = {
  market: string;
  interval: string;
  onUpdateTradingViewRealTime: (bar: {
    time: number;
    open: number;
    high: number;
    low: number;
    close: number;
    volume?: number;
  }) => void;
};

export type SubscriptionContextProps = {
  onCandleSubscribe: (value: CandleSubscriptionProps) => void;
};

export type SubscriptionProviderProps = PropsWithChildren<{
  value: SubscriptionContextProps;
}>;

export type SubscriptionComponent = FC<PropsWithChildren<{ marketId: string }>>;
