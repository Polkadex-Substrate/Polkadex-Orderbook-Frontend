import { TradeAccount } from "../../types";

// This is needed as the selector one can not be used inside a function.
export const getTradeAccount = (addr: string, tradeAccounts: TradeAccount[]) => {
  const acc = tradeAccounts.find(
    (tradeAcc) => tradeAcc.address?.toLowerCase() === addr?.toLowerCase()
  );

  return acc;
};
