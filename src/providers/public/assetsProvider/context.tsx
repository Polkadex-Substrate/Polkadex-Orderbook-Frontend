import { createContext } from "react";

import { initialState } from "./reducer";
import { AssetsContextProps, AssetsProviderProps } from "./types";

export const Context = createContext<AssetsContextProps>({
  ...initialState,
  fetchAssets: () => {},
});

export const Provider = ({ value, children }: AssetsProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
