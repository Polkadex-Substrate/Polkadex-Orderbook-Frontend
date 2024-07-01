import { Copy, Icon, Typography, truncateString } from "@polkadex/ux";
import { useMemo } from "react";

import { Avatar } from "@/components/ui/Icons";

export const ParticipantCard = ({
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
    <div className="flex items-center justify-between px-4 py-3 border-b border-primary/40">
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
