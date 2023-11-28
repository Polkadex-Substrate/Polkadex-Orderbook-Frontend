import { Transaction } from "@orderbook/core/utils/orderbookService";

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
