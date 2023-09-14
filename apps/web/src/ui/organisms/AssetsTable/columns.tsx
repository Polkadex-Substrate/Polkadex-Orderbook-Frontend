import { createColumnHelper } from "@tanstack/react-table";

import { AssetsProps } from "../AssetsInteraction/types";

import * as S from "./styles";

import { Tokens } from "@/ui/atoms";

const columnHelper = createColumnHelper<AssetsProps>();
export const columns = [
  columnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      const TokenComponent = Tokens[e.getValue().symbol] || Tokens.UNKN;
      return (
        <S.Token>
          <div>
            <TokenComponent />
          </div>
          <div>
            <span>{e.getValue().symbol}</span>
            <p> {e.getValue().name}</p>
          </div>
        </S.Token>
      );
    },
    header: () => <span>Token</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.onChainBalance, {
    id: "fundingAccount",
    cell: (e) => <span>{e.getValue()}</span>,
    header: () => <span>Funding Account</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.free_balance, {
    id: "tradingAccount",
    cell: (e) => <span>{e.getValue()}</span>,
    header: () => <span>Trading Account</span>,
    footer: (e) => e.column.id,
  }),
];
