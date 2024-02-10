"use client";

import { createColumnHelper } from "@tanstack/react-table";
import { Transaction } from "@orderbook/core/utils/orderbookService";
import { Tokens, Typography, truncateString } from "@polkadex/ux";

import { filters } from ".";

import {
  StatusCard,
  TokenCard,
  TransactionDirection,
} from "@/components/ui/ReadyToUse";

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
    cell: (e) => <StatusCard status={e.getValue()} />,
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
        <TransactionDirection
          tooltipable={e.getValue().fromWalletType === "Trading Account"}
          fromType={e.getValue().fromWalletType}
          fromName={e.getValue().fromWalletName}
          fromAddress={address}
          toType={e.getValue().toWalletType}
        />
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
