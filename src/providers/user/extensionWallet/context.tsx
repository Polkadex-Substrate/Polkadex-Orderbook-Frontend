import { createContext } from "react";

import { initialState } from "./reducer";
import { ExtensionWalletContextProps, ExtensionWalletProviderProps } from "./types";

export const Context = createContext<ExtensionWalletContextProps>({
  ...initialState,
});

export const Provider = ({ value, children }: ExtensionWalletProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
