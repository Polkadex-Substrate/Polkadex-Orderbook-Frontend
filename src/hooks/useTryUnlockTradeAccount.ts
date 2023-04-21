import { useCallback, useEffect } from "react";

import { TradeAccount } from "@polkadex/orderbook/providers/types";

export function useTryUnlockTradeAccount(account: TradeAccount) {
  const handleUnlock = useCallback(() => {
    try {
      if (account && account?.isLocked) account.unlock("");
      console.info("unlocked account with default");
    } catch (e) {
      console.log("error unlocking", e);
    }
  }, [account]);
  useEffect(() => {
    if (account?.isLocked) handleUnlock();
  }, [account?.isLocked, handleUnlock]);
  return {};
}
