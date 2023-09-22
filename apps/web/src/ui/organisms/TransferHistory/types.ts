export type TransferHistoryProps = {
  hash: string;
  amount: string;
  time: string;
  token: {
    name: string;
    ticker: string;
  };
  wallets: {
    fromWalletName: string;
    fromWalletAddress: string;
    toWalletName: string;
    toWalletAddress: string;
  };
};
