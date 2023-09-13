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

import { Checkbox, Search } from "@/ui/molecules";
import { Icons, Tokens } from "@/ui/atoms";
const columnHelper = createColumnHelper<Data>();

const columns = [
  columnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => (
      <S.Date>
        <span>{e.getValue().status}</span>
        <p>{e.getValue().date}</p>
      </S.Date>
    ),
    header: () => <span>Status/Date</span>,
    footer: (e) => e.column.id,
  }),
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
  columnHelper.accessor((row) => row.amount, {
    id: "amount",
    cell: (e) => (
      <S.Box>
        <p>{e.getValue().crypto}</p>
        <span>$ {e.getValue().fiat}</span>
      </S.Box>
    ),
    header: () => <span>Amount</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.fees, {
    id: "fees",
    cell: (e) => (
      <S.Box>
        <p>{e.getValue().crypto}</p>
        <span>$ {e.getValue().fiat}</span>
      </S.Box>
    ),
    header: () => <span>Fees</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "from",
    cell: (e) => (
      <S.Wallet>
        <div>
          <Icons.SingleArrowBottom />
        </div>
        <div>
          <p>
            {e.getValue().from.name} <span> • {e.getValue().from.address}</span>
          </p>
          <p>{e.getValue().to}</p>
        </div>
      </S.Wallet>
    ),
    header: () => <span>From/To</span>,
    footer: (e) => e.column.id,
  }),
];

export const WithdrawHistory = () => {
  const [state] = useState<Data[]>([...defaultData]);
  const table = useReactTable({
    data: state,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <S.Wrapper>
      <S.Title>
        <h3>History</h3>
        <S.TitleWrapper>
          <Search isFull placeholder="Search" />
          <Checkbox labelProps={{ style: { whiteSpace: "nowrap" } }}>
            Show only selected token
          </Checkbox>
        </S.TitleWrapper>
      </S.Title>
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
