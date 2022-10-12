import { TradeAccount } from "../../types";

export const tradingAccountPresentInBrowser = (
  tradingAccount: string,
  tradingAccounts: TradeAccount[]
) => {
  return tradingAccounts.find(
    (acc) => acc.address.toLowerCase() === tradingAccount?.toLowerCase()
  );
};
