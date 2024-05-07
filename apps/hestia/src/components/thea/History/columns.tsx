"use client";

import { createColumnHelper } from "@tanstack/react-table";
import {
  Copy,
  Token,
  Typography,
  TokenAppearance,
  truncateString,
} from "@polkadex/ux";
import { intlFormat } from "date-fns";
import { RiArrowRightLine, RiFileCopyLine } from "@remixicon/react";
import { Transactions } from "@orderbook/core/index";
import classNames from "classnames";

import { NetworkCard } from "./networkCard";

const columnHelper = createColumnHelper<Transactions[0]>();

export const columns = [
  columnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      const { asset, amount, status } = e.getValue();
      const formattedAmount = amount.toFormat();
      const ready = ["CLAIMED", "READY"].includes(status);
      return (
        <div className="flex items-center gap-3">
          <Token
            name={asset?.ticker as TokenAppearance}
            size="md"
            className="p-0.5 rounded-full border border-primary"
            appearance={asset?.ticker as TokenAppearance}
          />
          <div className="flex flex-col">
            <Typography.Text size="sm">
              {formattedAmount} {asset?.ticker}
            </Typography.Text>
            <div className="flex items-center gap-1">
              <div
                className={classNames(
                  "w-1.5 h-1.5 rounded-full",
                  ready ? "bg-success-base" : "bg-attention-base"
                )}
              />
              <Typography.Text appearance="success" size="xs">
                {ready ? "Completed" : "Pending"}
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
      const { from, to } = e.getValue();
      const polkadotNetwork =
        "0x91b171bb158e2d3848fa23a9f1c25182fb8e20313b2c1eb49219da7a70ce90c3"; // temp

      return (
        <div className="flex items-center gap-2">
          <NetworkCard
            name={from?.name ?? ""}
            isPolkadotEcosystem={!from?.genesis?.includes(polkadotNetwork)}
          />
          <div className="flex items-center justify-center w-5 h-5 p-0.5 bg-level-1 border border-primary">
            <RiArrowRightLine className="w-full h-full text-primary" />
          </div>
          <NetworkCard
            name={to?.name ?? ""}
            isPolkadotEcosystem={!to?.genesis?.includes(polkadotNetwork)}
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
  }),
  columnHelper.accessor((row) => row, {
    id: "destinationAddress",
    cell: (e) => {
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
