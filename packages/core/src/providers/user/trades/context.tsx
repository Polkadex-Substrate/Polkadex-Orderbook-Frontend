import { createContext } from "react";

import { TradesContextProps, TradesProviderProps, TradesState } from "./types";

export const initialState: TradesState = {
  loading: false,
  success: false,
  data: [],
};

export const Context = createContext<TradesContextProps>({
  ...initialState,
  onFetchNextPage: () => {},
});

export const Provider = ({ value, children }: TradesProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
