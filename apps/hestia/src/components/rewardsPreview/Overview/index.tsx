"use client";

import { Button, Token, Typography, tokenAppearance } from "@polkadex/ux";
import Link from "next/link";
import { forwardRef } from "react";
import { RiArrowLeftLine, RiShareLine, RiStarLine } from "@remixicon/react";
import { Market } from "@orderbook/core/utils/orderbookService";
import { useTraderMetrics } from "@orderbook/core/hooks";

import { OverviewCard } from "./overviewCard";
import { MarketSkeleton } from "./loading";

type Props = { market?: Market };

export const Overview = forwardRef<HTMLDivElement, Props>(({ market }, ref) => {
  const { userMetrics, isLoading } = useTraderMetrics(market?.id as string);
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between gap-2 p-4 pb-4 border-b border-secondary-base">
        <Link
          href="/rewards"
          className="text-primary flex items-center gap-2 flex-wrap transition-colors duration-300 hover:text-current"
        >
          <RiArrowLeftLine className="w-5 h-5" />
          <Typography.Text size="md">All markets</Typography.Text>
        </Link>
        <div className="flex items-center gap-2">
          <Button.Icon appearance="tertiary" variant="light">
            <RiStarLine className="w-full h-full" />
          </Button.Icon>
          <Button.Icon appearance="tertiary" variant="light">
            <RiShareLine className="w-full h-full" />
          </Button.Icon>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 border-b border-secondary-base flex-wrap">
        <div className="flex flex-col gap-2 border-r border-secondary-base py-4 px-4 md:min-w-[18rem]">
          {!market ? (
            <MarketSkeleton />
          ) : (
            <>
              <div className="flex items-center">
                <Token
                  name={market.baseAsset.ticker}
                  size="xl"
                  appearance={
                    market.baseAsset.ticker as keyof typeof tokenAppearance
                  }
                  className="rounded-full bg-level-1 border border-secondary z-[2]"
                />
                <Token
                  name={market.quoteAsset.ticker}
                  size="lg"
                  appearance={
                    market.quoteAsset.ticker as keyof typeof tokenAppearance
                  }
                  className="rounded-full -ml-3"
                />
              </div>
              <Typography.Text bold size="lg">
                {market.name}
              </Typography.Text>
            </>
          )}
        </div>

        <div className="flex items-center justify-between gap-8 p-4 flex-1 flex-wrap">
          <OverviewCard label="Current Epoch" loading={isLoading}>
            <Typography.Text bold>
              {userMetrics?.currentEpoch || 0}
            </Typography.Text>
          </OverviewCard>
          <OverviewCard loading={isLoading} label="Volume Generated">
            {`${userMetrics?.volumeGeneratedByUser || 0} ${market?.quoteAsset.ticker}`}
          </OverviewCard>
          <OverviewCard loading={isLoading} label="Fee Paid">
            {`${userMetrics?.feePaidByUser || 0} ${market?.quoteAsset.ticker}`}
          </OverviewCard>
        </div>
      </div>
    </div>
  );
});

Overview.displayName = "Overview";
