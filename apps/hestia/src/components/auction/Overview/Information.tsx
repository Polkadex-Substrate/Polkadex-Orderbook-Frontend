import { Typography } from "@polkadex/ux";

import { InformationCard } from "./informationCard";

export const Information = () => {
  return (
    <div className="flex flex-col sm:min-w-96">
      <div className="py-2 px-4 border-b border-primary">
        <Typography.Text appearance="primary" bold>
          Auction #120
        </Typography.Text>
      </div>
      <div className="flex-1 flex flex-col p-4 gap-4">
        {fakeData.map((item) => (
          <InformationCard
            key={item.ticker}
            name={item.name}
            ticker={item.ticker}
            amount={item.amount}
            amountFiat={item.amountFiat}
          />
        ))}
      </div>
    </div>
  );
};

const fakeData = [
  {
    name: "Tether",
    ticker: "USDT",
    amount: 10401.16,
    amountFiat: 10419.16,
  },
  {
    name: "Polkadot",
    ticker: "DOT",
    amount: 1340.89,
    amountFiat: 8000.16,
  },
  {
    name: "Moonbeam",
    ticker: "GLMR",
    amount: 16894.49,
    amountFiat: 3545.16,
  },
  {
    name: "Astar",
    ticker: "ASTR",
    amount: 27058.49,
    amountFiat: 1840.2,
  },
  {
    name: "Phala",
    ticker: "PHA",
    amount: 12819.49,
    amountFiat: 1749.01,
  },
  {
    name: "Polkadex",
    ticker: "PDEX",
    amount: 50500.34,
    amountFiat: 30531.68,
  },
  {
    name: "IBitcoin",
    ticker: "IBTC",
    amount: 0.9145,
    amountFiat: 58000.01,
  },
];
