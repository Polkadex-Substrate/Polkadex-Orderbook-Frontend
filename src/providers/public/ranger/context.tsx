import { createContext } from "react";

import { initialRangerState as initialState } from "./reducer";
import { RangerContextProps, RangerProviderProps } from "./types";

export const Context = createContext<RangerContextProps>({
  ...initialState,
  onConnectRanger: () => {},
});

export const Provider = ({ value, children }: RangerProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
