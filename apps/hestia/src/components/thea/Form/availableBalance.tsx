import { HoverCard, Separator, Skeleton, Typography } from "@polkadex/ux";
import { RiArrowDownSLine, RiInformationFill } from "@remixicon/react";
import { useMemo, useState } from "react";
import { isNegative } from "@orderbook/core/helpers";

import { ResponsiveCard } from "@/components/ui/ReadyToUse";
import { formatAmount } from "@/helpers";

export const AvailableBalance = ({
  existential,
  balance,
  assetTicker = "",
  loading,
  estimatedFee = 0,
  isPolkadexChain,
}: {
  existential: number;
  balance: number;
  assetTicker?: string;
  loading: boolean;
  estimatedFee?: number;
  isPolkadexChain?: boolean;
}) => {
  const existentialAmount = useMemo(
    () => formatAmount(existential),
    [existential]
  );

  const availableAmount = useMemo(() => {
    if (balance) {
      const amount = balance - (existential + estimatedFee);
      return isNegative(amount.toString()) ? 0 : formatAmount(amount);
    }

    return 0;
  }, [balance, existential, estimatedFee]);

  const balanceAmount = useMemo(() => formatAmount(balance), [balance]);
  const estimateFeeAmount = useMemo(
    () => formatAmount(estimatedFee),
    [estimatedFee]
  );

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
        <Skeleton loading={loading} className="min-w-12 min-h-4">
          <div className="flex items-center gap-1">
            <RiInformationFill className="w-3 h-3 text-actionInput" />
            <Typography.Text size="xs" appearance="primary">
              Available: {isPolkadexChain ? balanceAmount : availableAmount}{" "}
              {assetTicker}
            </Typography.Text>
            <RiArrowDownSLine className="w-3 h-3 text-primary group-hover:rotate-180 duration-300 transition-transform" />
          </div>
        </Skeleton>
      </HoverCard.Trigger>
      <HoverCard.Content className="max-w-[300px] p-4">
        <div className="flex flex-col gap-3">
          <ResponsiveCard label="Existential">
            {existentialAmount} {isPolkadexChain ? "PDEX" : assetTicker}
          </ResponsiveCard>
          <ResponsiveCard label="Estimated fee">
            {estimateFeeAmount} {isPolkadexChain ? "PDEX" : assetTicker}
          </ResponsiveCard>
          <ResponsiveCard label="Balance">
            {balanceAmount} {assetTicker}
          </ResponsiveCard>
          <ResponsiveCard label="Available">
            {isPolkadexChain ? balanceAmount : availableAmount} {assetTicker}
          </ResponsiveCard>
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
