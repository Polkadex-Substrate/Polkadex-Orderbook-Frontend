import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";

import { AssetsProps } from "../AssetsInteraction/types";

import * as S from "./styles";
import { columns } from "./columns";

import { Icons } from "@/ui/atoms";
import { FilteredAssetProps } from "@/ui/templates/Transfer/types";

export const AssetsTable = ({
  assets,
  onChangeAsset,
}: {
  assets: AssetsProps[];
  onChangeAsset: (e: FilteredAssetProps) => void;
}) => {
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
                  <S.Thead>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                    <div>
                      <Icons.IncreaseFilter />
                    </div>
                  </S.Thead>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row, ti) => (
            <tr
              key={row.id}
              onClick={() =>
                onChangeAsset({
                  onChainBalance: row.original.onChainBalance,
                  assetId: row.original.assetId,
                  name: row.original.name,
                  symbol: row.original.symbol,
                })
              }
            >
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
