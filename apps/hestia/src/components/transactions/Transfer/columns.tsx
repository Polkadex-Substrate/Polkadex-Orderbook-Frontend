import Link from "next/link";
import {
  Button,
  Tokens,
  Tooltip,
  Typography,
  truncateString,
} from "@polkadex/ux";
import { createColumnHelper } from "@tanstack/react-table";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

import {
  TokenCard,
  CustomTransactionDirection,
} from "@/components/ui/ReadyToUse";

export type TransferHistoryData = {
  hash: string;
  amount: string;
  time: Date;
  fee: string;
  token: {
    name: string;
    ticker: string;
  };
  wallets: {
    fromType: string;
    fromName: string;
    fromAddress: string;
    toType: string;
    toName: string;
    toAddress: string;
  };
};

const columnHelper = createColumnHelper<TransferHistoryData>();

export const columns = () => [
  columnHelper.accessor((row) => row.time, {
    id: "date",
    cell: (e) => {
      const formattedDate = new Intl.DateTimeFormat("en-US", {
        month: "numeric",
        day: "2-digit",
        hour: "numeric",
        minute: "numeric",
      })
        .format(new Date(e.getValue()))
        .replace(",", "");

      return (
        <Tooltip>
          <Tooltip.Trigger>
            <Typography.Text size="sm">{formattedDate}</Typography.Text>
          </Tooltip.Trigger>
          <Tooltip.Content>
            <Typography.Text>
              <Typography.Text size="xs">
                {e.getValue().toLocaleString()}
              </Typography.Text>
            </Typography.Text>
          </Tooltip.Content>
        </Tooltip>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Date
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.token, {
    id: "token",
    cell: (e) => {
      const tokenTicker = e.getValue().ticker;
      return (
        <div className="[&_svg]:scale-[1.05]">
          <TokenCard
            tokenName={e.getValue().name ?? "UNKNOWN"}
            ticker={tokenTicker ?? "UNKNOWN"}
            icon={tokenTicker as keyof typeof Tokens}
          />
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Token
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
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
  columnHelper.accessor((row) => row.wallets, {
    id: "wallets",
    cell: (e) => {
      const showFromToolTip = e.getValue().fromType !== "Trading Account";
      const fromAddress = truncateString(e.getValue().fromAddress);
      const toAddress = truncateString(e.getValue().toAddress);
      return (
        <CustomTransactionDirection
          showFromToolTip={showFromToolTip}
          fromType={e.getValue().fromType}
          fromName={e.getValue().fromName}
          fromAddress={fromAddress}
          toType={e.getValue().toType}
          toName={e.getValue().toName}
          toAddress={toAddress}
        />
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        From/To
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.fee, {
    id: "fees",
    cell: (e) => (
      <Typography.Text size="sm">{e.getValue()} PDEX</Typography.Text>
    ),
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Fees
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.hash, {
    id: "hash",
    cell: (e) => {
      const shortLink = truncateString(e.getValue(), 10);
      return (
        <Link
          href={`https://polkadex.subscan.io/extrinsic/${e.getValue()}`}
          target="_blank"
        >
          <Typography.Text
            size="sm"
            appearance="primary"
            className="flex items-center gap-1"
          >
            {shortLink}
            <Button.Icon variant="outline" size="xs">
              <ArrowTopRightOnSquareIcon />
            </Button.Icon>
          </Typography.Text>
        </Link>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Hash
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
];
