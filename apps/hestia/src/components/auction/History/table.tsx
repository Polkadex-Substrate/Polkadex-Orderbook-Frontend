import { Copy, Icon, Token, Typography, truncateString } from "@polkadex/ux";
import { RiArrowRightLine } from "@remixicon/react";
import Link from "next/link";

import { Avatar } from "@/components/ui/Icons";
import Badge from "@/components/ui/Temp/badge";

export const Table = () => {
  return (
    <div className="flex flex-col flex-1">
      <div className="py-2 px-4 border-b border-primary">
        <Typography.Text appearance="primary" bold>
          History
        </Typography.Text>
      </div>
      <div className="flex-1 flex flex-col">
        {fakeData.map((item) => {
          const shortAddress = truncateString(item.address);
          return (
            <div
              key={item.address}
              className="border-b border-primary/50 px-2 transition-colors duration-300 hover:bg-level-0 cursor-pointer"
            >
              <div className="flex items-center gap-10 border-b border-primary/50 px-2 py-4">
                <div className="flex flex-col flex-1">
                  <Typography.Text size="lg" bold>
                    Auction #120
                  </Typography.Text>
                  <div className="flex items-center gap-1">
                    <Icon rounded size="xs">
                      <Avatar />
                    </Icon>
                    <Copy value={item.address}>
                      <Typography.Text>{shortAddress}</Typography.Text>
                    </Copy>
                    <Badge appearance="secondary-base">Winner</Badge>
                  </div>
                </div>
                <div className="flex flex-col flex-2 items-end">
                  <div className="flex items-center">
                    {item.assets.map((e) => (
                      <Token
                        key={e.ticker}
                        appearance={e.ticker}
                        name={e.ticker}
                        rounded
                        size="2xs"
                        className="-mr-2"
                      />
                    ))}
                  </div>
                  <Typography.Text appearance="primary">Assets</Typography.Text>
                </div>
                <div className="flex flex-col flex-2 items-end">
                  <Typography.Text appearance="primary-base" size="md" bold>
                    802,180 PDEX
                  </Typography.Text>
                  <Typography.Text appearance="primary">
                    Amount burnt
                  </Typography.Text>
                </div>
              </div>
              <div className="flex items-center justify-between p-2">
                <Typography.Text appearance="secondary">
                  {item.date}
                </Typography.Text>
                <Link href="#" className="flex items-center gap-1">
                  <Typography.Text appearance="secondary">
                    Explore Auction
                  </Typography.Text>
                  <RiArrowRightLine className="w-4 h-4 text-secondary" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const fakeData = [
  {
    id: 1,
    title: "Auction #120",
    address: "5H3JGmi4iqEsqXFkEqcgEDBidwkNHWyhZrCQH6opYmCD3eBX",
    date: "30 days ago",
    amount: 802.18,
    assets: [
      { ticker: "USDT", amount: 10000.5 },
      { ticker: "DOT", amount: 400.5 },
      { ticker: "ASTR", amount: 100.44 },
      { ticker: "GLMR", amount: 400.42 },
      { ticker: "DED", amount: 50481.97 },
      { ticker: "IBTC", amount: 1.5 },
    ],
  },
  {
    id: 2,
    title: "Auction #121",
    address: "3J7HFYmi4kXYcEGzRTNHZ6xMRCD7wBQ5iJcFGb2LFtEQ2rHD",
    date: "25 days ago",
    amount: 1500.32,
    assets: [
      { ticker: "USDT", amount: 20000 },
      { ticker: "DOT", amount: 500 },
      { ticker: "ASTR", amount: 200 },
      { ticker: "GLMR", amount: 300 },
      { ticker: "DED", amount: 40000 },
      { ticker: "IBTC", amount: 2 },
    ],
  },
  {
    id: 3,
    title: "Auction #122",
    address: "1J3FGmi4jyYXcZGF3uYcBDR7ikNHX8tZsCQW5opLpFG3dHEF",
    date: "20 days ago",
    amount: 1200.45,
    assets: [
      { ticker: "USDT", amount: 15000.75 },
      { ticker: "DOT", amount: 450 },
      { ticker: "ASTR", amount: 120 },
      { ticker: "GLMR", amount: 350 },
      { ticker: "DED", amount: 45000 },
      { ticker: "IBTC", amount: 1.75 },
    ],
  },
  {
    id: 4,
    title: "Auction #123",
    address: "6J8HYmi5kpRsWYHe3uYdEDBgikNHT8yQsTQW7opOpHJ3dUJF",
    date: "15 days ago",
    amount: 1800.78,
    assets: [
      { ticker: "USDT", amount: 25000 },
      { ticker: "DOT", amount: 550 },
      { ticker: "ASTR", amount: 220 },
      { ticker: "GLMR", amount: 450 },
      { ticker: "DED", amount: 50000 },
      { ticker: "IBTC", amount: 2.25 },
    ],
  },
  {
    id: 5,
    title: "Auction #124",
    address: "2J5UYmi4ikSsVZHd4uYgDRB7ikNHX6wQsRQR4opMpKG3dLFF",
    date: "10 days ago",
    amount: 1000.5,
    assets: [
      { ticker: "USDT", amount: 30000 },
      { ticker: "DOT", amount: 600 },
      { ticker: "ASTR", amount: 250 },
      { ticker: "GLMR", amount: 500 },
      { ticker: "DED", amount: 55000 },
      { ticker: "IBTC", amount: 2.5 },
    ],
  },
  {
    id: 6,
    title: "Auction #125",
    address: "4K9HZmi6lpYsWZHf5uYdERBgikNHY8zQsUQW6opMpNJ3dVGF",
    date: "5 days ago",
    amount: 2000.9,
    assets: [
      { ticker: "USDT", amount: 35000 },
      { ticker: "DOT", amount: 700 },
      { ticker: "ASTR", amount: 300 },
      { ticker: "GLMR", amount: 550 },
      { ticker: "DED", amount: 60000 },
      { ticker: "IBTC", amount: 3 },
    ],
  },
];
