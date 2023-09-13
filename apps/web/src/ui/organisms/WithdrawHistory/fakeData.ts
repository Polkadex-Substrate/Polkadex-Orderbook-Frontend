export type Data = {
  status: string;
  date: string;
  token: {
    ticker: string;
    name: string;
    icon: string;
  };
  amount: {
    fiat: string;
    crypto: string;
  };
  fees: {
    fiat: string;
    crypto: string;
  };
  from: {
    name: string;
    address: string;
  };
  to: string;
};

export const defaultData: Data[] = [
  {
    status: "Confirmed",
    date: new Date().toDateString(),
    token: {
      ticker: "USDT",
      name: "Tether",
      icon: "USDT",
    },
    amount: {
      fiat: "0.00",
      crypto: "100.000",
    },
    fees: {
      fiat: "0.00",
      crypto: "0.000",
    },
    from: {
      name: "OrdebookTesting",
      address: "esqd...1vRw",
    },
    to: "Trading account",
  },
  {
    status: "Confirmed",
    date: new Date().toDateString(),
    token: {
      ticker: "USDT",
      name: "Tether",
      icon: "USDT",
    },
    amount: {
      fiat: "0.00",
      crypto: "100.000",
    },
    fees: {
      fiat: "0.00",
      crypto: "0.000",
    },
    from: {
      name: "OrdebookTesting",
      address: "esqd...1vRw",
    },
    to: "Trading account",
  },
];
