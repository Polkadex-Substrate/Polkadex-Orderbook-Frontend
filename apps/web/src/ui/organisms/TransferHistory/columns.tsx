import { createColumnHelper } from "@tanstack/react-table";
import { transformAddress } from "@orderbook/core/providers/user/profile";

import { Date, Token, Box, Wallet, CustomLink } from "./styles";
import * as T from "./types";

import { Icons, Tokens } from "@/ui/atoms";
const columnHelper = createColumnHelper<T.TransferHistoryProps>();

export const columns = (header: string[]) => [
  columnHelper.accessor((row) => row.time, {
    id: "date",
    cell: (e) => (
      <Date>
        <p>{e.getValue()}</p>
      </Date>
    ),
    header: () => <span>{header[0]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.token, {
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
  columnHelper.accessor((row) => row.amount, {
    id: "amount",
    cell: (e) => (
      <Box>
        <p>{e.getValue()}</p>
      </Box>
    ),
    header: () => <span>{header[2]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.wallets, {
    id: "wallets",
    cell: (e) => {
      const fromWallet = transformAddress(e.getValue().fromWalletAddress);
      const toWallet = transformAddress(e.getValue().toWalletAddress);

      return (
        <Wallet>
          <div>
            <Icons.SingleArrowBottom />
          </div>
          <div>
            <p>
              {e.getValue().fromWalletName}
              <span> • {fromWallet}</span>
            </p>
            <p>
              {e.getValue().toWalletName}
              <span> • {toWallet}</span>
            </p>
          </div>
        </Wallet>
      );
    },
    header: () => <span>{header[3]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.hash, {
    id: "hash",
    cell: (e) => {
      const shortLink = transformAddress(e.getValue(), 10);

      return (
        <CustomLink
          href={`https://polkadex.subscan.io/extrinsic/${e.getValue()}`}
          target="_blank"
        >
          <p>{shortLink}</p>
        </CustomLink>
      );
    },
    header: () => <span>{header[4]}</span>,
    footer: (e) => e.column.id,
  }),
];
