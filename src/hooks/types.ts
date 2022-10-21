import { TradeAccount } from "@polkadex/orderbook/modules/types";

export type IUserTradeAccount = {
  address: string;
  isPresentInBrowser: boolean;
  account?: TradeAccount;
};
