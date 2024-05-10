"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Copy, Typography, truncateString } from "@polkadex/ux";
import { RiArrowRightLine, RiFileCopyLine } from "@remixicon/react";
import { Transaction, networks } from "@orderbook/core/index";

import { NetworkCard } from "./networkCard";
import { TokenInfo } from "./tokenInfo";

import { formatedDate } from "@/helpers";

const columnHelper = createColumnHelper<Transaction>();

export const columns = [
  columnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      const { asset, amount, status } = e.getValue();
      const formattedAmount = amount.toFormat();
      const ready = ["CLAIMED", "APPROVED", "READY"].includes(status);
      return (
        <TokenInfo
          ticker={asset?.ticker}
          ready={ready}
          amount={formattedAmount}
        />
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Token/Amount
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
    filterFn: (row, id, value: string[]) =>
      value?.some((val) =>
        val
          .toLowerCase()
          .includes(row.original.asset?.ticker.toLowerCase() ?? "")
      ),

    sortingFn: (rowA, rowB) => {
      const numA = rowA.original.amount;
      const numB = rowB.original.amount;
      return numA > numB ? 1 : -1;
    },
  }),
  columnHelper.accessor((row) => row, {
    id: "source",
    cell: (e) => {
      const { from, to } = e.getValue();
      const polkadotNetwork = networks[0]; // temp

      const isFromPolkadotNetwork = from?.genesis?.includes(polkadotNetwork);
      const isToPolkadotNetwork = to?.genesis?.includes(polkadotNetwork);

      return (
        <div className="flex items-center gap-3">
          <NetworkCard
            name={from?.name}
            isPolkadotEcosystem={isFromPolkadotNetwork}
          />
          <div className="flex items-center justify-center w-5 h-5 p-0.5 bg-level-1 border border-primary">
            <RiArrowRightLine className="w-full h-full text-primary" />
          </div>
          <NetworkCard
            name={to?.name}
            isPolkadotEcosystem={isToPolkadotNetwork}
          />
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Source/Destination
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
    filterFn: (row, id, value: string[]) =>
      value?.some((val) =>
        val.toLowerCase().includes(row.original.from?.name.toLowerCase() ?? "")
      ),
  }),
  columnHelper.accessor((row) => row, {
    id: "destinationAddress",
    cell: () => {
      const address = "0x0000000000";
      const shortAddress = truncateString(address);
      return (
        <Copy value={address}>
          <div className="flex items-center gap-1">
            <RiFileCopyLine className="w-3 h-3 text-actionInput" />
            <Typography.Text appearance="primary" size="sm">
              {shortAddress}
            </Typography.Text>
          </div>
        </Copy>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        To
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.timestamp, {
    id: "date",
    cell: (e) => {
      const date = formatedDate(new Date(e.getValue()), false);
      return (
        <Typography.Text size="sm" className=" whitespace-nowrap">
          {date}
        </Typography.Text>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Date
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
];
