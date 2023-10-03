import { createContext } from "react";

import { AssetsContextProps, AssetsProviderProps, AssetsState } from "./types";

export const initialState: AssetsState = {
  list: [],
  loading: false,
  success: false,
};

export const Context = createContext<AssetsContextProps>({
  ...initialState,
  selectGetAsset: () => undefined,
});

export const Provider = ({ value, children }: AssetsProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
