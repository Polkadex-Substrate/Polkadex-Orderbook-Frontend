import { createContext } from "react";

import { initialState } from "./reducer";
import { TradeWalletContextProps, TradeWalletProviderProps } from "./types";

export const Context = createContext<TradeWalletContextProps>({
  ...initialState,
  onExportTradeAccount: () => {},
  onImportTradeAccountJson: () => {},
  onImportTradeAccount: () => {},
  onLoadTradeAccounts: () => {},
  onTradeAccountUpdate: () => {},
  onRegisterTradeAccount: () => {},
});

export const Provider = ({ value, children }: TradeWalletProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
