import { createContext } from "react";

import { initialState } from "./reducer";
import { NativeApiContextProps, NativeApiProviderProps } from "./types";

export const Context = createContext<NativeApiContextProps>({
  ...initialState,
  onConnectNativeApi: () => {},
});

export const Provider = ({ value, children }: NativeApiProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
