import { createColumnHelper } from "@tanstack/react-table";
import { AssetsProps } from "@orderbook/core/hooks";

import * as S from "./styles";

import { Tokens } from "@/ui/atoms";

const columnHelper = createColumnHelper<AssetsProps>();
export const columns = (headers: string[]) => [
  columnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      const TokenComponent = Tokens[e.getValue().ticker] || Tokens.UNKN;
      return (
        <S.Token>
          <div>
            <TokenComponent />
          </div>
          <div>
            <span>{e.getValue().ticker}</span>
            <p> {e.getValue().name}</p>
          </div>
        </S.Token>
      );
    },
    header: () => <span>{headers[0]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.onChainBalance, {
    id: "fundingAccount",
    cell: (e) => <span>{e.getValue()}</span>,
    header: () => <span>{headers[1]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.free_balance, {
    id: "tradingAccount",
    cell: (e) => <span>{e.getValue()}</span>,
    header: () => <span>{headers[2]}</span>,
    footer: (e) => e.column.id,
  }),
];
