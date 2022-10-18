import { TradeAccount } from "@polkadex/orderbook/modules/types";

export const tryUnlockTradeAccount = (account: TradeAccount) => {
  try {
    account.unlock("");
  } catch (e) {
    console.log("error unlocking", e);
  }
};
