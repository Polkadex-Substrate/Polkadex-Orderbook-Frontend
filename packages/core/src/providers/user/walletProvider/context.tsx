import { createContext, PropsWithChildren } from "react";

import { TradeAccount } from "../../types";

import { Actions } from "./provider";
import { State } from "./reducer";

type GenericStatus = "error" | "idle" | "success" | "loading";
type MutationState = {
  proxiesAccounts?: string[];
  proxiesHasError: boolean;
  proxiesLoading: boolean;
  proxiesSuccess: boolean;

  registerError: unknown;
  registerStatus: GenericStatus;
  removingStatus: GenericStatus;
  removingError: unknown;

  tradingAccounts?: TradeAccount[];
  tradingHasError: boolean;
  tradingLoading: boolean;
  tradingSuccess: boolean;

  walletBalance?: number;
  walletHasError: boolean;
  walletLoading: boolean;
  walletSuccess: boolean;

  importFromFileStatus: GenericStatus;
  importFromFileError: unknown;
};
type ProviderProps = (State & MutationState & Actions) | null;
export const Context = createContext<ProviderProps>(null);

export const Provider = ({
  value,
  children,
}: PropsWithChildren<{ value: ProviderProps }>) => (
  <Context.Provider value={value}>{children}</Context.Provider>
);
