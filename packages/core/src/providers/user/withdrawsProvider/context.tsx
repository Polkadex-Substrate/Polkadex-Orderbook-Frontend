import { createContext } from "react";

import { initialState } from "./reducer";
import { WithdrawsContextProps, WithdrawsProviderProps } from "./types";

export const Context = createContext<WithdrawsContextProps>({
  ...initialState,
  onFetchWithdraws: async () => {},
  onFetchClaimWithdraw: async () => {},
});

export const Provider = ({ value, children }: WithdrawsProviderProps) => {
  return <Context.Provider value={value}>{children}</Context.Provider>;
};
