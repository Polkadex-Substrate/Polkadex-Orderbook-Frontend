import { createColumnHelper } from "@tanstack/react-table";
import { transformAddress } from "@orderbook/core/providers/user/profile";

import { Date, Token, Box, Wallet } from "./styles";
import * as T from "./types";

import { Icons, Tokens } from "@/ui/atoms";
const columnHelper = createColumnHelper<T.Props>();

export const columns = (header: string[]) => [
  columnHelper.accessor((row) => row, {
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
        <span>$0.00</span>
      </Box>
    ),
    header: () => <span>{header[2]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.fee, {
    id: "fees",
    cell: (e) => (
      <Box>
        <p>{e.getValue()}</p>
        <span>$0.00</span>
      </Box>
    ),
    header: () => <span>{header[3]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.wallets, {
    id: "wallets",
    cell: (e) => {
      const address = transformAddress(e.getValue().fromWalletAddress ?? "");
      return (
        <Wallet>
          <div>
            <Icons.SingleArrowBottom />
          </div>
          <div>
            <p>
              {e.getValue().fromWalletName}
              <span> • {address}</span>
            </p>
            <p>{e.getValue().toWalletType}</p>
          </div>
        </Wallet>
      );
    },
    header: () => <span>{header[4]}</span>,
    footer: (e) => e.column.id,
  }),
];
