import { createContext } from "react";

import { SubscriptionProviderProps, SubscriptionContextProps } from "./types";

export const Context = createContext<SubscriptionContextProps>({
  onCandleSubscribe: () => {},
});

export const Provider = ({ value, children }: SubscriptionProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
