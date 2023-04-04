import { TradeAccount } from "../../types";
import * as T from "./types";
import { ProfileState } from "../profile/types";

// This is needed as the selector one can not be used inside a function.
export const getTradeAccount = (addr: string, tradeAccounts: TradeAccount[]) => {
  const acc = tradeAccounts.find(
    (tradeAcc) => tradeAcc.address?.toLowerCase() === addr?.toLowerCase()
  );

  return acc;
};

// Selectors
export const selectTradeAccount = (
  address: string,
  allBrowserAccounts: T.TradeWalletState["allBrowserAccounts"]
): TradeAccount =>
  allBrowserAccounts.find(
    (account) => account?.address?.toLowerCase() === address?.toLowerCase()
  );

export const selectShouldShowProtectedPassword = (
  tradeWalletState: T.TradeWalletState,
  profileState: ProfileState
): boolean =>
  tradeWalletState?.allBrowserAccounts?.some(
    (account) =>
      account?.address?.toLowerCase() ===
      profileState?.selectedAccount?.tradeAddress?.toLowerCase()
  );
