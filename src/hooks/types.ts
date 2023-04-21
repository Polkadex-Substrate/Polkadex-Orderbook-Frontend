import { TradeAccount } from "@polkadex/orderbook/providers/types";

export type IUserTradeAccount = {
  address: string;
  isPresentInBrowser: boolean;
  account?: TradeAccount;
};
