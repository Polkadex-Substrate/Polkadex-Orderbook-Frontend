import { createContext } from "react";

import { initialMarketsState } from "./reducer";
import { MarketsContextProps, MarketsProviderProps } from "./types";

export const Context = createContext<MarketsContextProps>({
  ...initialMarketsState,
});

export const Provider = ({ value, children }: MarketsProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
