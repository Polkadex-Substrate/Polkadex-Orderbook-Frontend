import { LmpMarketConfig } from "@orderbook/core/index";
import { Tokens, Typography } from "@polkadex/ux";
import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";

import { MarketCard } from "./marketCard";

const columnHelper = createColumnHelper<LmpMarketConfig>();

export const columns = () => [
  columnHelper.accessor((row) => row, {
    id: "market",
    cell: (e) => {
      const {
        baseAsset: { ticker: baseTicker },
        quoteAsset: { ticker: quoteTicker },
      } = e.getValue();
      return (
        <Link href={`/rewards/${baseTicker}${quoteTicker}`}>
          <MarketCard
            marketName={`${baseTicker}/${quoteTicker}`}
            icon={baseTicker as keyof typeof Tokens}
            pairIcon={quoteTicker as keyof typeof Tokens}
          />
        </Link>
      );
    },
    header: () => (
      <Typography.Text size="sm" appearance="primary" className="ml-2">
        Market
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "score",
    cell: (e) => {
      return <Typography.Text size="sm">{e.getValue().score}</Typography.Text>;
    },
    header: () => (
      <Typography.Text size="sm" appearance="primary">
        Score
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.rewards, {
    id: "totalRewards",
    cell: (e) => {
      return (
        <Typography.Text size="sm">
          {e.getValue().marketMaking + e.getValue().trading} PDEX
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="sm" appearance="primary">
        Total Rewards
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "volume24h",
    cell: (e) => {
      return (
        <Typography.Text size="sm">
          {e.getValue().quoteVolume.toFixed(4)} {e.getValue().quoteAsset.ticker}
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="sm" appearance="primary">
        Volume 24h
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
];
