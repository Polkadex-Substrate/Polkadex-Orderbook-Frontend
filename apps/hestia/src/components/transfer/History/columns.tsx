"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Transaction } from "@orderbook/core/utils/orderbookService";
import { Tokens, Tooltip, Typography, truncateString } from "@polkadex/ux";
import classNames from "classnames";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { filters } from ".";

import { TokenCard } from "@/components/ui/ReadyToUse";

export interface DepositData extends Omit<Transaction, "asset" | "timestamp"> {
  timestamp: string;
  token: {
    name: string;
    ticker: string;
  };
  wallets: {
    fromWalletType: string;
    fromWalletName: string;
    fromWalletAddress: string;
    toWalletType: string;
  };
}
const columnHelper = createColumnHelper<DepositData>();

export const columns = [
  columnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      const tokenTicker = e.getValue().token.ticker;
      return (
        <TokenCard
          tokenName={e.getValue().token.name}
          ticker={tokenTicker}
          icon={tokenTicker as keyof typeof Tokens}
        />
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Token
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
    filterFn: (row, id, value: string[] | string) => {
      if (typeof value === "string") {
        const rowData = row.getValue<DepositData>(id)?.token;
        const match =
          rowData?.ticker?.toLowerCase().includes(value.toLowerCase()) ||
          rowData?.name?.toLowerCase().includes(value.toLowerCase());

        return match;
      }
      return value?.some((val) =>
        val
          .toLowerCase()
          .includes(row.getValue<DepositData>(id)?.token?.ticker.toLowerCase())
      );
    },
  }),
  columnHelper.accessor((row) => row.status, {
    id: "status",
    cell: (e) => {
      const status = e.getValue();
      return (
        <div className="flex items-center gap-2">
          <div
            className={classNames(
              "w-1.5 h-1.5 rounded-full",
              statusBgColor[status]
            )}
          />
          <Typography.Text
            size="sm"
            className="first-letter:capitalize lowercase"
            appearance={statusColor[status]}
          >
            {status}
          </Typography.Text>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Status
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
    filterFn: (row, id, value: typeof filters.status) =>
      value?.some((val) =>
        val
          .toLowerCase()
          .includes(row.getValue<DepositData["status"]>(id).toLowerCase())
      ),
  }),
  columnHelper.accessor((row) => row.amount, {
    id: "amount",
    cell: (e) => <Typography.Text size="sm">{e.getValue()}</Typography.Text>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Amount
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.fee, {
    id: "fees",
    cell: (e) => <Typography.Text size="xs">{e.getValue()}</Typography.Text>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Fees
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.wallets, {
    id: "wallets",
    cell: (e) => {
      const address = truncateString(e.getValue().fromWalletAddress);
      return (
        <div className="flex items-center gap-2">
          {e.getValue().fromWalletType === "Trading Account" ? (
            <Typography.Text>{e.getValue().fromWalletType}</Typography.Text>
          ) : (
            <Tooltip>
              <Tooltip.Trigger className="flex items-center gap-1">
                <Typography.Text>{e.getValue().fromWalletType}</Typography.Text>
              </Tooltip.Trigger>
              <Tooltip.Content>
                <div className="flex items-center gap-2">
                  <Typography.Text>
                    {e.getValue().fromWalletName}
                  </Typography.Text>
                  <Typography.Text appearance="primary">
                    {address}
                  </Typography.Text>
                </div>
              </Tooltip.Content>
            </Tooltip>
          )}

          <div className="flex items-center justify-center bg-level-1 w-6 h-6 rounded-md">
            <ArrowRightIcon className="w-4 h-4 text-primary" />
          </div>
          <Tooltip>
            <Tooltip.Trigger>
              <Typography.Text appearance="primary">
                {e.getValue().toWalletType}
              </Typography.Text>
            </Tooltip.Trigger>
            <Tooltip.Content>
              {e.getValue().fromWalletType === "Funding Account" ? (
                <Typography.Text>
                  Balance available across all trading accounts.
                </Typography.Text>
              ) : (
                <div className="flex items-center gap-2">
                  <Typography.Text>
                    {e.getValue().fromWalletName}
                  </Typography.Text>
                  <Typography.Text appearance="primary">
                    {address}
                  </Typography.Text>
                </div>
              )}
            </Tooltip.Content>
          </Tooltip>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        From/To
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
    filterFn: (row, id, value: typeof filters.from) => {
      const rowData = row.getValue<DepositData["wallets"]>(id).fromWalletType;
      const valueSplited = value[0].split("/")[0].toLowerCase();
      const rowDataSplited = rowData.toLowerCase().split(" ")[0].toLowerCase();
      return valueSplited.includes(rowDataSplited);
    },
  }),
  columnHelper.accessor((row) => row.timestamp, {
    id: "date",
    cell: (e) => <Typography.Text size="sm">{e.getValue()}</Typography.Text>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Date
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
];

const statusBgColor = {
  PENDING: "bg-level-5",
  CONFIRMED: "bg-success-base",
  FAILED: "bg-danger-base",
  READY: "bg-attention-base",
} as const;

const statusColor = {
  PENDING: "secondary",
  CONFIRMED: "success",
  FAILED: "danger",
  READY: "attention",
} as const;
