import { createContext } from "react";

import { initialKlineState } from "./reducer";
import { KlineContextProps, KlineProviderProps } from "./types";

export const Context = createContext<KlineContextProps>({
  ...initialKlineState,
  onHandleKlineFetch: () => {},
  onFetchKlineChannel: () => {},
});

export const Provider = ({ value, children }: KlineProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
