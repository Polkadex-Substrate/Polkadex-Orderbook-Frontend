// TODO: Check table scroll
// TODO: Improve no data message

"use client";

import { MIN_DIGITS_AFTER_DECIMAL } from "@orderbook/core/constants";
import {
  decimalPlaces,
  getCurrentMarket,
  useMarkets,
  useRecentTrades,
} from "@orderbook/core/index";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { GenericMessage, Skeleton } from "@polkadex/ux";

import { columns } from "./columns";

export const RecentTrades = ({ id }: { id: string }) => {
  const { list: allMarkets, loading: marketsLoading } = useMarkets();
  const currentMarket = getCurrentMarket(allMarkets, id);

  const quoteTicker = currentMarket?.quoteAsset?.ticker ?? "";
  const baseTicker = currentMarket?.baseAsset?.ticker ?? "";

  const pricePrecision =
    (currentMarket && decimalPlaces(currentMarket.price_tick_size)) ??
    MIN_DIGITS_AFTER_DECIMAL;

  const amountPrecision =
    (currentMarket && decimalPlaces(currentMarket.qty_step_size)) ??
    MIN_DIGITS_AFTER_DECIMAL;

  const { isDecreasing, list, loading } = useRecentTrades(
    currentMarket?.id as string
  );

  const precision = Math.max(pricePrecision, amountPrecision);
  const table = useReactTable({
    data: list,
    columns: columns({
      isDecreasing,
      quoteTicker,
      baseTicker,
      precision,
    }),
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <Skeleton loading={loading || marketsLoading} className="h-full w-full">
      <div className="flex-1 flex flex-col h-full scrollbar-hide overflow-auto">
        {list?.length ? (
          <table className="w-full">
            <thead className="sticky top-[0] bg-level-0">
              {table.getHeaderGroups().map((headerGroup) => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map((header) => {
                    return (
                      <th
                        className={classNames(
                          header.id === "price" ? "text-left" : "text-right",
                          "px-2 text-primary font-medium text-xs py-1"
                        )}
                        key={header.id}
                      >
                        {header.isPlaceholder
                          ? null
                          : flexRender(
                              header.column.columnDef.header,
                              header.getContext()
                            )}
                      </th>
                    );
                  })}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map((row) => {
                return (
                  <tr key={row.id} className="hover:bg-level-1 cursor-pointer">
                    {row.getVisibleCells().map((cell, i) => {
                      const firstCol = i === 0;
                      const lastCol = i === 2;
                      return (
                        <td
                          className={classNames(
                            firstCol ? "text-left" : "text-right",
                            firstCol && "font-semibold",
                            lastCol && "text-primary",
                            "px-2 py-1 hover:bg-level-1 text-xs"
                          )}
                          key={cell.id}
                        >
                          {flexRender(
                            cell.column.columnDef.cell,
                            cell.getContext()
                          )}
                        </td>
                      );
                    })}
                  </tr>
                );
              })}
            </tbody>
          </table>
        ) : (
          <GenericMessage
            title="No data"
            illustration="NoData"
            className="bg-level-0 h-full"
            imageProps={{
              className: "w-10 self-center",
            }}
          />
        )}
      </div>
    </Skeleton>
  );
};
