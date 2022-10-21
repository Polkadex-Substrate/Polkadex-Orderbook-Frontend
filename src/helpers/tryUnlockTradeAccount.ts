import { TradeAccount } from "@polkadex/orderbook/modules/types";

export const tryUnlockTradeAccount = (account: TradeAccount) => {
  try {
    if (account && account.isLocked) account.unlock("");
    console.info("unlocked account with default");
  } catch (e) {
    console.log("error unlocking", e);
  }
};
