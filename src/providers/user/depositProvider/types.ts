import { CommonError } from "@polkadex/orderbook/modules/types";
import { PropsWithChildren } from "react";

export interface DepositsState {
  error?: CommonError;
  loading: boolean;
  success: boolean;
}

export type DepositContextProps = DepositsState & {
  // onOpenOrdersHistoryFetch: () => void;
  // onOrdersHistoryFetch: (value: onOrdersHistoryFetch) => void;
};

export type DepositProviderProps = PropsWithChildren<{
  value: DepositContextProps;
}>;
