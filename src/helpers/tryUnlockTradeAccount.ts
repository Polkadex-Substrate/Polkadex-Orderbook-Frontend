import { TradeAccount } from "@polkadex/orderbook/modules/types";

export const tryUnlockTradeAccount = (account: TradeAccount) => {
  try {
    account && account.unlock("");
    console.info("unlocked account");
  } catch (e) {
    console.log("error unlocking", e);
  }
};
