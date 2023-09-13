export type Data = {
  token: {
    ticker: string;
    name: string;
    icon: string;
  };
  fundingAccount: string;
  tradingAccount: string;
};

export const defaultData: Data[] = [
  {
    token: {
      ticker: "USDT",
      name: "Tether",
      icon: "USDT",
    },
    fundingAccount: "0.00",
    tradingAccount: "0.00",
  },
  {
    token: {
      ticker: "PDEX",
      name: "Polkadex",
      icon: "PDEX",
    },
    fundingAccount: "0.00",
    tradingAccount: "0.00",
  },
  {
    token: {
      ticker: "DOT",
      name: "Polkadot",
      icon: "DOT",
    },
    fundingAccount: "0.00",
    tradingAccount: "0.00",
  },
  {
    token: {
      ticker: "ETH",
      name: "Ethereum",
      icon: "ETH",
    },
    fundingAccount: "0.00",
    tradingAccount: "0.00",
  },
];
