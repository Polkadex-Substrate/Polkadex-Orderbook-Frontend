import { TradeAccount } from "@/providers/types";

export function useTryUnlockTradeAccount(account: TradeAccount) {
  try {
    if (account && account.isLocked) {
      account.unlock("");
    }
  } catch (e) {
    // We don't need to handle this error, because we are just trying to unlock it
    console.log(e);
  }
  return {};
}
