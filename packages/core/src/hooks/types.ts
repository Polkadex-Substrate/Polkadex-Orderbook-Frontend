import { TradeAccount } from "@orderbook/core/providers/types";

export type IUserTradeAccount = {
  address: string;
  isPresentInBrowser: boolean;
  account?: TradeAccount;
};
