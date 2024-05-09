import { HoverCard, Separator, Typography } from "@polkadex/ux";
import { RiArrowDownSLine, RiInformationFill } from "@remixicon/react";
import { useMemo, useState } from "react";

import { ResponsiveCard } from "@/components/ui/ReadyToUse";
import { formatAmount } from "@/helpers";

export const AvailableBalance = ({
  existential,
  locked,
  available,
  balance,
  assetTicker = "",
  sourceTicker = "",
}: {
  existential: number;
  locked: number;
  available: number;
  balance: number;
  assetTicker?: string;
  sourceTicker?: string;
}) => {
  const existentialAmount = useMemo(
    () => formatAmount(existential),
    [existential]
  );

  const availableAmount = useMemo(() => formatAmount(available), [available]);

  const [open, setOpen] = useState(false);

  return (
    <HoverCard open={open} onOpenChange={setOpen}>
      <HoverCard.Trigger
        className="group"
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setOpen(true);
        }}
      >
        <div className="flex items-center gap-1">
          <RiInformationFill className="w-3 h-3 text-actionInput" />
          <Typography.Text size="xs" appearance="primary">
            Available: {availableAmount} {assetTicker}
          </Typography.Text>
          <RiArrowDownSLine className="w-3 h-3 text-primary group-hover:rotate-180 duration-300 transition-transform" />
        </div>
      </HoverCard.Trigger>
      <HoverCard.Content className="max-w-[300px] p-4">
        <div className="flex flex-col gap-3">
          <ResponsiveCard label="Existential">
            {existentialAmount} {sourceTicker}
          </ResponsiveCard>
          <ResponsiveCard label="Balance">{balance}</ResponsiveCard>
          <ResponsiveCard label="Locked">{locked}</ResponsiveCard>
          <ResponsiveCard label="Available">{availableAmount}</ResponsiveCard>
        </div>
        <Separator.Horizontal className="my-3" />
        <div>
          <Typography.Paragraph
            size="xs"
            appearance="primary"
            className="leading-5"
          >
            On Substrate-based chains like Polkadot and Kusama, accounts need to
            maintain a minimum balance (Existential Deposit) to stay active and
            prevent blockchain bloating.
          </Typography.Paragraph>
        </div>
      </HoverCard.Content>
    </HoverCard>
  );
};
