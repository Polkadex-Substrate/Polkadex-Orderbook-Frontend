import { createColumnHelper } from "@tanstack/react-table";
import { Button, Dropdown, TokenAppearance, Typography } from "@polkadex/ux";
import { Fragment } from "react";
import Link from "next/link";
import { RiMore2Line } from "@remixicon/react";
import { Asset } from "@polkadex/thea";
import { getChainFromTicker } from "@orderbook/core/helpers";

import { TokenCard } from "@/components/ui/ReadyToUse";
import { AmountCard } from "@/components/ui/ReadyToUse/amountCard";
import { formatAmount } from "@/helpers";

export interface AssetsProps extends Asset {
  destinationBalance: number;
  sourceBalance: number;
}
const columnHelper = createColumnHelper<AssetsProps>();
export const columns = (sourceChain?: string, destinationChain?: string) => [
  columnHelper.accessor((row) => row.ticker, {
    id: "token",
    cell: (e) => {
      const ticker = e.getValue();
      const name = getChainFromTicker(ticker);
      return (
        <TokenCard
          tokenName={name}
          ticker={ticker}
          icon={ticker as TokenAppearance}
          className="max-md:pr-6 md:min-w-40"
        />
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Asset
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
    sortingFn: (rowA, rowB) => {
      const valA = rowA.original.ticker;
      const valB = rowB.original.ticker;
      if (valA === valB) return 0;
      return valA < valB ? 1 : -1;
    },
  }),
  columnHelper.accessor((row) => row.sourceBalance, {
    id: "sourceBalance",
    cell: (e) => {
      const formattedBalance = formatAmount(e.getValue());
      return (
        <AmountCard className="max-md:pr-6 md:min-w-40">
          {formattedBalance}
        </AmountCard>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        {sourceChain} Balance
      </Typography.Text>
    ),
  }),
  columnHelper.accessor((row) => row.destinationBalance, {
    id: "destinationBalance",
    cell: (e) => {
      const formattedBalance = formatAmount(e.getValue());
      return <AmountCard>{formattedBalance}</AmountCard>;
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        {destinationChain} Balance
      </Typography.Text>
    ),
  }),
  columnHelper.accessor((row) => row, {
    id: "actions",
    cell: () => {
      return (
        <div className="flex items-center justify-end gap-2">
          <Button.Solid size="xs" appearance="secondary">
            Bridge
          </Button.Solid>
          <Dropdown>
            <Dropdown.Trigger className="group">
              <RiMore2Line className="w-6 h-6 text-primary group-hover:text-current transition-colors duration-300" />
            </Dropdown.Trigger>
            <Dropdown.Content>
              <Dropdown.Item>
                <Typography.Text asChild size="sm">
                  <Link href="/trading" target="_blank">
                    Trade
                  </Link>
                </Typography.Text>
              </Dropdown.Item>
            </Dropdown.Content>
          </Dropdown>
        </div>
      );
    },
    header: () => <Fragment />,
    footer: (e) => e.column.id,
  }),
];
