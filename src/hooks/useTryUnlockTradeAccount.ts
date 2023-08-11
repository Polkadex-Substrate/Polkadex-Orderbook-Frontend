import { TradeAccount } from "@polkadex/orderbook/providers/types";

export function useTryUnlockTradeAccount(account: TradeAccount) {
  try {
    if (account && account.isLocked) {
      account.unlock("");
    }
  } catch (e) {
    console.log("error unlocking", e);
  }
  return {};
}
