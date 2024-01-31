import { WithdrawGroup, WithdrawGroupItem } from "@orderbook/core/helpers";
import { Transaction } from "@orderbook/core/utils/orderbookService";

export interface WithdrawTableProps
  extends Omit<Transaction, "asset" | "timestamp"> {
  timestamp: string;
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
    assetId: string;
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
