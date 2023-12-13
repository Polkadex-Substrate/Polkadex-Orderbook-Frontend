import { FC, PropsWithChildren } from "react";

export type SubscriptionContextProps = NonNullable<unknown>;

export type SubscriptionProviderProps = PropsWithChildren<{
  value: SubscriptionContextProps;
}>;

export type SubscriptionComponent = FC<
  PropsWithChildren<SubscriptionContextProps>
>;
