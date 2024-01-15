import { TradeAccount } from "@orderbook/core/providers/types";

export function tryUnlockTradeAccount(account: TradeAccount | undefined) {
  try {
    if (account && account.isLocked) {
      account.unlock("");
    }
  } catch (e) {
    // We don't need to handle this error, because we are just trying to unlock it
    console.log(e);
  }
}
