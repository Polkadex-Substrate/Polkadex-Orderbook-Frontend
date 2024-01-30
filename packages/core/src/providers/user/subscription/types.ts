import { SubscribeBarsCallback } from "@orderbook/core/utils/charting_library";
import { FC, PropsWithChildren } from "react";

export type CandleSubscriptionProps = {
  market: string;
  interval: string;
  onUpdateTradingViewRealTime: SubscribeBarsCallback;
};

export type SubscriptionContextProps = {
  onCandleSubscribe: (value: CandleSubscriptionProps) => void;
};

export type SubscriptionProviderProps = PropsWithChildren<{
  value: SubscriptionContextProps;
}>;

export type SubscriptionComponent = FC<
  PropsWithChildren<SubscriptionContextProps>
>;
