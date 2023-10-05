import { createContext } from "react";

import { initialState } from "./reducer";
import { TradesContextProps, TradesProviderProps } from "./types";

export const Context = createContext<TradesContextProps>({
  ...initialState,
  onFetchNextPage: () => {},
  onUserTradeUpdate: () => {},
});

export const Provider = ({ value, children }: TradesProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
