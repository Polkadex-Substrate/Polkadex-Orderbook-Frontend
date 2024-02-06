"use client";
import { HoverCard, Typography } from "@polkadex/ux";
import { useState } from "react";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/outline";

import { OverviewCard } from "./overviewCard";

export const Overview = () => {
  const [view, setView] = useState(true);

  const IconComponent: typeof EyeIcon = view ? EyeIcon : EyeSlashIcon;

  const fiatAmount = view ? `$0.00` : "********";
  const amount = view ? (0.0).toFixed(8) : "********";

  return (
    <div className="flex justify-between items-center gap-4 border-b border-secondary-base p-4 flex-wrap">
      <div className="flex flex-col gap-5">
        <HoverCard>
          <HoverCard.Trigger className="w-fit">
            <div className="flex flex-col gap-2">
              <div className="flex items-center gap-1">
                <Typography.Text appearance="primary">
                  Total assets in BTC
                </Typography.Text>
                <IconComponent
                  className="w-3 h-3 cursor-pointer"
                  onClick={() => setView(!view)}
                />
              </div>
              <div className="flex items-center gap-1">
                <Typography.Text bold className="text-xl">
                  {amount}
                </Typography.Text>
                <Typography.Text appearance="primary">
                  ≈ {fiatAmount}
                </Typography.Text>
              </div>
            </div>
          </HoverCard.Trigger>
          <HoverCard.Content side="right" withArrow>
            Trading account
          </HoverCard.Content>
        </HoverCard>
      </div>
      <div className="flex items-center gap-2 sm:max-w-[25rem] w-full flex-wrap">
        <OverviewCard
          icon="ArrowDownTrayIcon"
          target="_blank"
          href="https://thea.polkadex.trade/deposit"
        >
          Deposit
        </OverviewCard>
        <OverviewCard
          icon="ArrowUpTrayIcon"
          target="_blank"
          href="https://thea.polkadex.trade/withdraw"
        >
          Withdraw
        </OverviewCard>
        <OverviewCard icon="ArrowsRightLeftIcon" href="/transfer">
          Transfer
        </OverviewCard>
      </div>
    </div>
  );
};
