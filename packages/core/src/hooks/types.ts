import { TradeAccount } from "@orderbook/core/providers/types";

export type IUserTradeAccount = {
  address: string;
  isPresentInBrowser: boolean;
  account?: TradeAccount;
};

export interface MutateHookProps {
  onSuccess?: (message?: string) => void;
  onError?: (error: Error) => void;
}
