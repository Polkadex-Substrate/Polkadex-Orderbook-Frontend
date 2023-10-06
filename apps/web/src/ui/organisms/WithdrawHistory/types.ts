import { WithdrawGroup, WithdrawGroupItem } from "@orderbook/core/helpers";
import { Transaction } from "@orderbook/core/providers/user/transactionsProvider";

export interface WithdrawTableProps extends Omit<Transaction, "asset"> {
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

export interface ReadyToClaimProps extends WithdrawGroupItem {
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

export interface ReadyToClaimDataProps extends Omit<WithdrawGroup, "items"> {
  items: ReadyToClaimProps[];
}
