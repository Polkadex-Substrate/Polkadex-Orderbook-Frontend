"use client";

import { createColumnHelper } from "@tanstack/react-table";
import {
  Copy,
  Token,
  Typography,
  tokenAppearance,
  truncateString,
} from "@polkadex/ux";
import { intlFormat } from "date-fns";
import { RiArrowRightLine, RiFileCopyLine } from "@remixicon/react";

const columnHelper = createColumnHelper<(typeof fakeData)[0]>();

export const columns = [
  columnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      const { asset, status, amount } = e.getValue();
      const { ticker } = asset;

      return (
        <div className="flex items-center gap-3">
          <Token
            name={ticker}
            size="md"
            className="p-0.5 rounded-full border border-primary"
            appearance={ticker as keyof typeof tokenAppearance}
          />
          <div className="flex flex-col">
            <Typography.Text size="sm" bold>
              {amount} {ticker}
            </Typography.Text>
            <div className="flex items-center gap-1">
              <div className="w-2 h-2 rounded-full bg-success-base" />
              <Typography.Text appearance="success" size="xs">
                {status}
              </Typography.Text>
            </div>
          </div>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Token/Amount
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "source",
    cell: (e) => {
      const { sourceChain, destinationChain } = e.getValue();
      return (
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1">
            <Token
              name={sourceChain.ticker}
              size="xs"
              className="p-0.5 rounded-full border border-primary"
              appearance={sourceChain.ticker as keyof typeof tokenAppearance}
            />
            <Typography.Text size="sm">{sourceChain.name}</Typography.Text>
          </div>
          <div className="flex items-center justify-center w-5 h-5 p-0.5 bg-level-1 border border-primary">
            <RiArrowRightLine className="w-full h-full text-primary" />
          </div>
          <div className="flex items-center gap-1">
            <Token
              name={destinationChain.ticker}
              size="xs"
              className="p-0.5 rounded-full border border-primary"
              appearance={
                destinationChain.ticker as keyof typeof tokenAppearance
              }
            />
            <Typography.Text size="sm">{destinationChain.name}</Typography.Text>
          </div>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Source/Destination
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.destinationAddress, {
    id: "destinationAddress",
    cell: (e) => {
      const address = e.getValue();
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
  columnHelper.accessor((row) => row.date, {
    id: "date",
    cell: (e) => (
      <Typography.Text size="sm" className=" whitespace-nowrap">
        {intlFormat(
          new Date(e.getValue()),
          {
            year: "numeric",
            month: "short",
            day: "numeric",
            hour: "2-digit",
            minute: "2-digit",
          },
          { locale: "EN" }
        )}
      </Typography.Text>
    ),
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Date
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
];

export const fakeData = [
  {
    id: 1,
    asset: {
      id: 1,
      name: "Tether",
      ticker: "USDT",
    },
    status: "Completed",
    amount: 0.24,
    sourceChain: {
      id: 1,
      name: "Ethereum",
      ticker: "ETH",
    },
    destinationChain: {
      id: 1,
      name: "Polkadex",
      ticker: "PDEX",
    },
    destinationAddress: "5GEBxWEmpWoS9EGTwyxZgPoqV4UAd3PV2xWBKRuW7HMbDkB1",
    date: new Date(),
  },
  {
    id: 2,
    asset: {
      id: 1,
      name: "Tether",
      ticker: "USDT",
    },
    status: "Completed",
    amount: 10.56,
    sourceChain: {
      id: 1,
      name: "Ethereum",
      ticker: "ETH",
    },
    destinationChain: {
      id: 1,
      name: "Polkadex",
      ticker: "PDEX",
    },
    destinationAddress: "5GEBxWEmpWoS9EGTwyxZgPoqV4UAd3PV2xWBKRuW7HMbDkB1",
    date: new Date(),
  },
];
