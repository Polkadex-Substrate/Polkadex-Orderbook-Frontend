import { createContext } from "react";

import { SessionContextProps, SessionProviderProps } from "./types";
import { initialState } from "./reducer";

export const Context = createContext<SessionContextProps>({
  ...initialState,
  dispatchUserSessionData: () => {},
});

export const Provider = ({ value, children }: SessionProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
