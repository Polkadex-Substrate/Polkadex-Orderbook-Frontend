import { Copy, Icon, Typography, truncateString } from "@polkadex/ux";
import Link from "next/link";
import { useMemo } from "react";

import { Avatar } from "@/components/ui/Icons";

export const Participants = () => {
  return (
    <div className="flex flex-col min-w-96">
      <div className="flex items-center justify-between py-2 px-4 border-b border-primary">
        <Typography.Text appearance="primary" bold>
          Participants
        </Typography.Text>
        <Link href="/" target="_blank">
          <Typography.Text appearance="primary">See all</Typography.Text>
        </Link>
      </div>
      <div className="flex-1 flex flex-col p-4 gap-4">
        <Card
          address="5H3JGmi4iqEsqXFkEqcgEDBidwkNHWyhZrCQH6opYmCD3eBX"
          date="30 minutes ago"
          amount={7540}
          ticker="PDEX"
        />
        <Card
          address="5GEBxWEmpWoS9EGTwyxZgPoqV4UAd3PV2xWBKRuW7HMbDkB1"
          date="45 minutes ago"
          amount={7200.45}
          ticker="PDEX"
        />
        <Card
          address="5GUD1cXQB1nFyLprscEQh6apekh4KMGD6FnkatcM6AAJ7JQb"
          date="50 minutes ago"
          amount={7199}
          ticker="PDEX"
        />
        <Card
          address="5HQHmpHLWM8B5WsecXaWdrSLHwLnB6vDK8E4QQjp4FWwqpew"
          date="2 hours ago"
          amount={7198}
          ticker="PDEX"
        />
        <Card
          address="14ukYV3MhVcNx7RoeMG418Y27jwVA1mFpCVFzViZ5YGef81c"
          date="3 hours ago"
          amount={7100}
          ticker="PDEX"
        />
        <Card
          address="15u8uDRbZaDHTEuGBskJYZZMfi3xVkMxob1YB3SQmJqHCNM6"
          date="3 hours ago"
          amount={7000}
          ticker="PDEX"
        />
      </div>
    </div>
  );
};

const Card = ({
  address,
  date,
  amount,
  ticker,
}: {
  address: string;
  date: string;
  amount: number;
  ticker: string;
}) => {
  const shortAddress = useMemo(() => truncateString(address), [address]);
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2">
        <Icon rounded>
          <Avatar />
        </Icon>
        <div className="flex flex-col">
          <Copy value={address}>
            <Typography.Text>{shortAddress}</Typography.Text>
          </Copy>
          <Typography.Text appearance="primary">{date}</Typography.Text>
        </div>
      </div>
      <div className="flex flex-col items-end">
        <Typography.Text bold appearance="primary-base">
          {amount}
        </Typography.Text>
        <Typography.Text appearance="secondary" size="xs">
          {ticker}
        </Typography.Text>
      </div>
    </div>
  );
};
