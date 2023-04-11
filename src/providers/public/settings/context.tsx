import { createContext } from "react";

import { initialState } from "./reducer";
import { SettingContextProps, SettingProviderProps } from "./types";

export const Context = createContext<SettingContextProps>({
  ...initialState,
  onToggleChartRebuild: () => {},
  onToggleMarketSelector: () => {},
  onToggleOpenOrdersPairsSwitcher: () => {},
  onChangeColorTheme: () => {},
  onHandleError: () => {},
  onHandleAlert: () => {},
  onHandleNotification: () => {},
});

export const Provider = ({ value, children }: SettingProviderProps) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
