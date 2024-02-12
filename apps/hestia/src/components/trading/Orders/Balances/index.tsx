import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useAssets } from "@orderbook/core/hooks";
import { GenericMessage, Table as PolkadexTable } from "@polkadex/ux";

import { Loading } from "../loading";
import { BalanceResponsiveCard } from "../responsiveCard";

import { columns } from "./columns";

export const BalancesTable = ({ maxHeight }: { maxHeight: string }) => {
  const { assets, loading } = useAssets();
  const { width } = useWindowSize();
  const table = useReactTable({
    data: assets,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const responsiveView = useMemo(
    () => width < 550 || (width >= 715 && width <= 1100),
    [width]
  );

  if (loading) return <Loading />;

  if (!assets?.length)
    return <GenericMessage title={"No assets found"} illustration="NoData" />;

  if (responsiveView)
    return (
      <div
        className="flex-1 overflow-y-hidden hover:overflow-y-auto"
        style={{ maxHeight, scrollbarGutter: "stable" }}
      >
        <BalanceResponsiveCard assets={assets} />
      </div>
    );

  return (
    <div
      className="flex-1 overflow-y-hidden hover:overflow-y-auto"
      style={{ maxHeight, scrollbarGutter: "stable" }}
    >
      <PolkadexTable className="w-full" even>
        <PolkadexTable.Header className="sticky top-0 bg-backgroundBase">
          {table.getHeaderGroups().map((headerGroup) => (
            <PolkadexTable.Row key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <PolkadexTable.Head
                    className={classNames(
                      "px-2 text-primary font-semibold text-xs"
                    )}
                    key={header.id}
                  >
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </PolkadexTable.Head>
                );
              })}
            </PolkadexTable.Row>
          ))}
        </PolkadexTable.Header>
        <PolkadexTable.Body>
          {table.getRowModel().rows.map((row, i) => {
            return (
              <PolkadexTable.Row
                key={row.id}
                className={classNames("hover:bg-level-1 cursor-pointer")}
              >
                {row.getVisibleCells().map((cell) => {
                  return (
                    <PolkadexTable.Cell
                      key={cell.id}
                      className={classNames("px-2 py-3 text-xs")}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </PolkadexTable.Cell>
                  );
                })}
              </PolkadexTable.Row>
            );
          })}
        </PolkadexTable.Body>
      </PolkadexTable>
    </div>
  );
};
