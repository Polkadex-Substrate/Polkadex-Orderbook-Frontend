import { Typography } from "@polkadex/ux";
import Link from "next/link";
import { RiExternalLinkLine } from "@remixicon/react";

import { ParticipantCard } from "./participantCard";

export const Participants = () => {
  return (
    <div className="flex flex-col sm:min-w-96 max-xl:w-full">
      <div className="flex items-center justify-between py-2 px-4 border-b border-primary">
        <Typography.Text appearance="primary" bold>
          Participants
        </Typography.Text>
        <Link href="/" target="_blank" className="flex items-center gap-1">
          <Typography.Text appearance="primary">See all</Typography.Text>
          <RiExternalLinkLine className="text-primary w-3.5 h-3.5" />
        </Link>
      </div>
      <div className="flex-1 flex flex-col">
        {fakeData.map((item) => (
          <ParticipantCard
            key={item.address}
            address={item.address}
            date={item.date}
            amount={item.amount}
            ticker={item.ticker}
          />
        ))}
      </div>
    </div>
  );
};

const fakeData = [
  {
    address: "5H3JGmi4iqEsqXFkEqcgEDBidwkNHWyhZrCQH6opYmCD3eBX",
    date: "30 minutes ago",
    amount: 7540,
    ticker: "PDEX",
  },
  {
    address: "5GEBxWEmpWoS9EGTwyxZgPoqV4UAd3PV2xWBKRuW7HMbDkB1",
    date: "45 minutes ago",
    amount: 7200,
    ticker: "PDEX",
  },
  {
    address: "5GUD1cXQB1nFyLprscEQh6apekh4KMGD6FnkatcM6AAJ7JQb",
    date: "50 minutes ago",
    amount: 7199,
    ticker: "PDEX",
  },
  {
    address: "5HQHmpHLWM8B5WsecXaWdrSLHwLnB6vDK8E4QQjp4FWwqpew",
    date: "2 hours ago",
    amount: 7198,
    ticker: "PDEX",
  },
  {
    address: "14ukYV3MhVcNx7RoeMG418Y27jwVA1mFpCVFzViZ5YGef81c",
    date: "3 hours ago",
    amount: 7100,
    ticker: "PDEX",
  },
  {
    address: "15u8uDRbZaDHTEuGBskJYZZMfi3xVkMxob1YB3SQmJqHCNM6",
    date: "3 hours ago",
    amount: 7000,
    ticker: "PDEX",
  },
  {
    address: "5FJxB8J9W8Ghv1FiwT8pB8wGtJ3XZ6K6Nj6PMzH5U1JLs8SZ",
    date: "4 hours ago",
    amount: 6900,
    ticker: "PDEX",
  },
  {
    address: "5D8uL5hJ9mGVvi9jHg4PPbJH2x9yVFGbB9Yrj5J7jLZHfPqV",
    date: "4 hours ago",
    amount: 6800,
    ticker: "PDEX",
  },
  {
    address: "5EYCA2M9Vb3WJh6Echp4BFtX9e7aKHciPdHpHS3hVHhFn1RK",
    date: "5 hours ago",
    amount: 6700,
    ticker: "PDEX",
  },
];
