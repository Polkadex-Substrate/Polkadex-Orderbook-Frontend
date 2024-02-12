"use client";
import { Button, Token, Typography } from "@polkadex/ux";
import { ArrowLeftIcon, ArrowUpIcon } from "@heroicons/react/24/solid";
import Link from "next/link";
import { forwardRef } from "react";
import { ShareIcon, StarIcon } from "@heroicons/react/24/outline";

import { OverviewCard } from "./overviewCard";

export const Overview = forwardRef<HTMLDivElement>((_, ref) => {
  return (
    <div ref={ref}>
      <div className="flex items-center justify-between gap-2 p-4 pb-4 border-b border-secondary-base">
        <Link
          href="/analytics"
          className="text-primary flex items-center gap-2 flex-wrap transition-colors duration-300 hover:text-current"
        >
          <ArrowLeftIcon className="w-5 h-5" />
          <Typography.Text size="md">All markets</Typography.Text>
        </Link>
        <div className="flex items-center gap-2">
          <Button.Icon appearance="tertiary" variant="light">
            <StarIcon />
          </Button.Icon>
          <Button.Icon appearance="tertiary" variant="light">
            <ShareIcon />
          </Button.Icon>
        </div>
      </div>
      <div className="flex justify-between items-center gap-4 border-b border-secondary-base flex-wrap">
        <div className="flex flex-col gap-2 border-r border-secondary-base py-4 px-4 md:min-w-[18rem]">
          <div className="flex items-center">
            <Token
              name="USDT"
              size="lg"
              appearance="USDT"
              className="rounded-full"
            />
            <Token
              name="ASTR"
              size="xl"
              appearance="ASTR"
              className="rounded-full -ml-2 bg-level-1 border border-secondary"
            />
          </div>
          <Typography.Text bold size="lg">
            AST/USDT
          </Typography.Text>
        </div>
        <div className="flex items-center justify-between gap-8 p-4 flex-1 flex-wrap">
          <OverviewCard label="TVL">
            <div className="flex items-center gap-1">
              <Typography.Text bold>$898.20k</Typography.Text>
              <div className="flex items-center text-success-base">
                <ArrowUpIcon className="w-4 h-4" />
                <Typography.Text size="xs" bold>
                  1.01%
                </Typography.Text>
              </div>
            </div>
          </OverviewCard>
          <OverviewCard label="Volume 24h">
            <div className="flex items-center gap-1">
              <Typography.Text>$559.83k</Typography.Text>
              <div className="flex items-center text-success-base">
                <ArrowUpIcon className="w-4 h-4" />
                <Typography.Text size="xs" bold>
                  2.54%
                </Typography.Text>
              </div>
            </div>
          </OverviewCard>
          <OverviewCard label="24h fees">$479.59</OverviewCard>
          <div className="flex flex-col gap-1">
            <OverviewCard side="horizontal" label="ASTR Locked">
              52.38k
            </OverviewCard>
            <OverviewCard side="horizontal" label="USDT Locked">
              2.40mi
            </OverviewCard>
          </div>
        </div>
      </div>
    </div>
  );
});

Overview.displayName = "Overview";
