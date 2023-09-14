import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

import { AssetsProps } from "../AssetsInteraction/types";

import * as S from "./styles";

import { Icons, Tokens } from "@/ui/atoms";
const columnHelper = createColumnHelper<AssetsProps>();

const columns = [
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
            <p> {e.getValue().name}</p>
            <span>{e.getValue().symbol}</span>
          </div>
        </S.Token>
      );
    },
    header: () => <span>Token</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.reserved_balance, {
    id: "fundingAccount",
    cell: (e) => <span>$ {e.getValue()}</span>,
    header: () => <span>Funding Account</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.onChainBalance, {
    id: "tradingAccount",
    cell: (e) => <span>$ {e.getValue()}</span>,
    header: () => <span>Trading Account</span>,
    footer: (e) => e.column.id,
  }),
];

export const AssetsTable = ({ assets }: { assets: AssetsProps[] }) => {
  const table = useReactTable({
    data: assets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <S.Wrapper>
      <table>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext(),
                      )}
                  <div>
                    <Icons.IncreaseFilter />
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, ti) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => {
                const lastCell = table.getRowModel().rows.length === ti + 1;
                const tdClassName = classNames({ last: lastCell });
                return (
                  <td className={tdClassName} key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </S.Wrapper>
  );
};
