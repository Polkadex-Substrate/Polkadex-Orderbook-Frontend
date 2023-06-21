import { createContext } from "react";

import { initialKlineState } from "./reducer";
import { KlineContextProps, KlineProviderProps, KlineEvent } from "./types";

export const Context = createContext<KlineContextProps>({
  ...initialKlineState,
  onHandleKlineFetch: (): Promise<KlineEvent[]> => null,
  onFetchKlineChannel: () => {},
});

export const Provider = ({ value, children }: KlineProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
