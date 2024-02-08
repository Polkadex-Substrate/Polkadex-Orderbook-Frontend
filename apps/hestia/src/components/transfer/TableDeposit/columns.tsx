import { createColumnHelper } from "@tanstack/react-table";
import { Transaction } from "@orderbook/core/utils/orderbookService";
import { Tokens, Tooltip, Typography, truncateString } from "@polkadex/ux";
import classNames from "classnames";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

import { TokenCard } from "@/components/ui/ReadyToUse";

export interface DepositData extends Omit<Transaction, "asset" | "timestamp"> {
  timestamp: string;
  token: {
    name: string;
    ticker: string;
  };
  wallets: {
    fromWalletName: string;
    fromWalletAddress: string;
    toWalletType: string;
  };
}
const columnHelper = createColumnHelper<DepositData>();

export const columns = [
  columnHelper.accessor((row) => row.token, {
    id: "token",
    cell: (e) => {
      const tokenTicker = e.getValue().ticker;
      return (
        <TokenCard
          tokenName={e.getValue().name}
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
  }),
  columnHelper.accessor((row) => row.amount, {
    id: "amount",
    cell: (e) => (
      <Typography.Text appearance="secondary" size="xs">
        {e.getValue()}
      </Typography.Text>
    ),
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Amount
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.fee, {
    id: "fees",
    cell: (e) => (
      <Typography.Text appearance="secondary" size="xs">
        {e.getValue()}
      </Typography.Text>
    ),
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
          <Tooltip>
            <Tooltip.Trigger>
              <Typography.Text>Funding account</Typography.Text>
            </Tooltip.Trigger>
            <Tooltip.Content>
              <div>
                <Typography.Text>{e.getValue().fromWalletName}</Typography.Text>
                <Typography.Text appearance="primary">
                  {address}
                </Typography.Text>
              </div>
            </Tooltip.Content>
          </Tooltip>
          <div className="flex items-center justify-center bg-level-1 w-6 h-6 rounded-md">
            <ArrowRightIcon className="w-4 h-4 text-primary" />
          </div>
          <Typography.Text>Trading account</Typography.Text>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        From/To
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.timestamp, {
    id: "date",
    cell: (e) => (
      <Typography.Text appearance="secondary" size="xs">
        {e.getValue()}
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
