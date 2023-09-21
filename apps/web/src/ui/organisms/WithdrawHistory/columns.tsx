import { createColumnHelper } from "@tanstack/react-table";
import { transformAddress } from "@orderbook/core/providers/user/profile";

import { Date, Token, Box, Wallet } from "./styles";
import { WithdrawTableProps, ReadyToClaimProps } from "./types";

import { Icons, Tokens } from "@/ui/atoms";
const pendingColumnHelper = createColumnHelper<WithdrawTableProps>();

export const pendingColumns = (header: string[]) => [
  pendingColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => (
      <Date>
        <span>{e.getValue().status}</span>
        <p>{e.getValue().time}</p>
      </Date>
    ),
    header: () => <span>{header[0]}</span>,
    footer: (e) => e.column.id,
  }),
  pendingColumnHelper.accessor((row) => row.token, {
    id: "token",
    cell: (e) => {
      const TokenComponent = Tokens[e.getValue().ticker] ?? Tokens.UNKN;
      return (
        <Token>
          <div>
            <TokenComponent />
          </div>
          <div>
            <p> {e.getValue().ticker}</p>
            <span>{e.getValue().name}</span>
          </div>
        </Token>
      );
    },
    header: () => <span>{header[1]}</span>,
    footer: (e) => e.column.id,
  }),
  pendingColumnHelper.accessor((row) => row.amount, {
    id: "amount",
    cell: (e) => (
      <Box>
        <p>{e.getValue()}</p>
      </Box>
    ),
    header: () => <span>{header[2]}</span>,
    footer: (e) => e.column.id,
  }),

  pendingColumnHelper.accessor((row) => row.wallets, {
    id: "wallets",
    cell: (e) => {
      const address = transformAddress(e.getValue().fromWalletAddress ?? "");
      return (
        <Wallet>
          <div>
            <Icons.SingleArrowBottom />
          </div>
          <div>
            <p>{e.getValue().toWalletType}</p>
            <p>
              {e.getValue().fromWalletName}
              <span> • {address}</span>
            </p>
          </div>
        </Wallet>
      );
    },
    header: () => <span>{header[3]}</span>,
    footer: (e) => e.column.id,
  }),
];

const claimedColumnHelper = createColumnHelper<WithdrawTableProps>();

export const claimedColumns = (header: string[]) => [
  claimedColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => (
      <Date>
        <span>{e.getValue().status}</span>
        <p>{e.getValue().time}</p>
      </Date>
    ),
    header: () => <span>{header[0]}</span>,
    footer: (e) => e.column.id,
  }),
  claimedColumnHelper.accessor((row) => row.token, {
    id: "token",
    cell: (e) => {
      const TokenComponent = Tokens[e.getValue().ticker] ?? Tokens.UNKN;
      return (
        <Token>
          <div>
            <TokenComponent />
          </div>
          <div>
            <p> {e.getValue().ticker}</p>
            <span>{e.getValue().name}</span>
          </div>
        </Token>
      );
    },
    header: () => <span>{header[1]}</span>,
    footer: (e) => e.column.id,
  }),
  claimedColumnHelper.accessor((row) => row.amount, {
    id: "amount",
    cell: (e) => (
      <Box>
        <p>{e.getValue()}</p>
      </Box>
    ),
    header: () => <span>{header[2]}</span>,
    footer: (e) => e.column.id,
  }),

  claimedColumnHelper.accessor((row) => row.wallets, {
    id: "wallets",
    cell: (e) => {
      const address = transformAddress(e.getValue().fromWalletAddress ?? "");
      return (
        <Wallet>
          <div>
            <Icons.SingleArrowBottom />
          </div>
          <div>
            <p>{e.getValue().toWalletType}</p>
            <p>
              {e.getValue().fromWalletName}
              <span> • {address}</span>
            </p>
          </div>
        </Wallet>
      );
    },
    header: () => <span>{header[3]}</span>,
    footer: (e) => e.column.id,
  }),
];

const readyToClaimColumnHelper = createColumnHelper<ReadyToClaimProps>();

export const readyToClaimColumns = (header: string[]) => [
  readyToClaimColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => (
      <Date>
        <span>{e.getValue().status}</span>
        <p>{e.getValue().time.toString()}</p>
      </Date>
    ),
    header: () => <span>{header[0]}</span>,
    footer: (e) => e.column.id,
  }),
  readyToClaimColumnHelper.accessor((row) => row.token, {
    id: "token",
    cell: (e) => {
      const TokenComponent = Tokens[e.getValue().ticker] ?? Tokens.UNKN;
      return (
        <Token>
          <div>
            <TokenComponent />
          </div>
          <div>
            <p> {e.getValue().ticker}</p>
            <span>{e.getValue().name}</span>
          </div>
        </Token>
      );
    },
    header: () => <span>{header[1]}</span>,
    footer: (e) => e.column.id,
  }),
  readyToClaimColumnHelper.accessor((row) => row.amount, {
    id: "amount",
    cell: (e) => (
      <Box>
        <p>{e.getValue()}</p>
      </Box>
    ),
    header: () => <span>{header[2]}</span>,
    footer: (e) => e.column.id,
  }),

  readyToClaimColumnHelper.accessor((row) => row.wallets, {
    id: "wallets",
    cell: (e) => {
      const address = transformAddress(e.getValue().fromWalletAddress ?? "");
      return (
        <Wallet>
          <div>
            <Icons.SingleArrowBottom />
          </div>
          <div>
            <p>{e.getValue().toWalletType}</p>
            <p>
              {e.getValue().fromWalletName}
              <span> • {address}</span>
            </p>
          </div>
        </Wallet>
      );
    },
    header: () => <span>{header[3]}</span>,
    footer: (e) => e.column.id,
  }),
];
