import { Transaction } from "@orderbook/core/providers/user/transactionsProvider";

export interface Props extends Omit<Transaction, "asset"> {
  token: {
    name: string;
    ticker: string;
  };
  wallets: {
    fromWalletName: string;
    fromWalletAddress: string;
    toWalletType: string;
  };
}
