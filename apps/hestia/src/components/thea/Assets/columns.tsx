import { createColumnHelper } from "@tanstack/react-table";
import { AssetsProps } from "@orderbook/core/hooks";
import { Button, Dropdown, Tokens, Typography } from "@polkadex/ux";
import { Fragment } from "react";
import Link from "next/link";
import { RiMore2Line } from "@remixicon/react";

import { TokenCard } from "@/components/ui/ReadyToUse";
import { AmountCard } from "@/components/ui/ReadyToUse/amountCard";

const columnHelper = createColumnHelper<AssetsProps>();
export const columns = [
  columnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      return (
        <TokenCard
          tokenName={e.getValue().name}
          ticker={e.getValue().ticker}
          icon={e.getValue().ticker as keyof typeof Tokens}
        />
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Asset
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
    sortingFn: (rowA, rowB, columnId) => {
      const valA = (rowA.getValue(columnId) as AssetsProps).ticker;
      const valB = (rowB.getValue(columnId) as AssetsProps).ticker;
      return valA > valB ? 1 : -1;
    },
  }),
  columnHelper.accessor((row) => row.onChainBalance, {
    id: "balance",
    cell: (e) => <AmountCard>{e.getValue()}</AmountCard>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Balance
      </Typography.Text>
    ),
  }),
  columnHelper.accessor((row) => row, {
    id: "actions",
    cell: (e) => {
      return (
        <div className="flex items-center justify-end gap-2">
          <Button.Solid asChild size="xs" appearance="secondary">
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

export const fakeData = [
  {
    id: "1",
    ticker: "PDEX",
    name: "Polkadex",
    decimal: 12,
    free_balance: "0.00",
    onChainBalance: "0.00",
    inOrdersBalance: "0.00",
  },
];
