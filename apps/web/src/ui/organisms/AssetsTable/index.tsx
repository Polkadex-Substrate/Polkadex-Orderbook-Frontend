import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
import classNames from "classnames";

import * as S from "./styles";
import { Data, defaultData } from "./fakeData";

import { Icons, Tokens } from "@/ui/atoms";
const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor((row) => row.token, {
    id: "token",
    cell: (e) => {
      const TokenComponent = Tokens[e.getValue().icon] || Tokens.UNKN;
      return (
        <S.Token>
          <div>
            <TokenComponent />
          </div>
          <div>
            <p> {e.getValue().name}</p>
            <span>{e.getValue().ticker}</span>
          </div>
        </S.Token>
      );
    },
    header: () => <span>Token</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.fundingAccount, {
    id: "fundingAccount",
    cell: (e) => <span>$ {e.getValue()}</span>,
    header: () => <span>Funding Account</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.tradingAccount, {
    id: "tradingAccount",
    cell: (e) => <span>$ {e.getValue()}</span>,
    header: () => <span>Trading Account</span>,
    footer: (e) => e.column.id,
  }),
];

export const AssetsTable = () => {
  const [state] = useState<Data[]>([...defaultData]);
  const table = useReactTable({
    data: state,
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
