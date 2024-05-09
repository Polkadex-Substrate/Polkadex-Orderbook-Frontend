"use client";

import { Table, GenericMessage } from "@polkadex/ux";
import { forwardRef, Fragment, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
  SortingState,
  ColumnFiltersState,
  getFilteredRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useTheaProvider } from "@orderbook/core/providers";

import { columns } from "./columns";
import { Filters } from "./Filters";

import { SkeletonCollection } from "@/components/ui/ReadyToUse";

const actionKeys = ["token", "date"];

export const History = forwardRef<HTMLDivElement, { tableMaxHeight?: string }>(
  ({ tableMaxHeight }, ref) => {
    const {
      deposits,
      withdrawals,
      depositsLoading,
      withdrawalsLoading,
      polkadexAssets,
      chains,
    } = useTheaProvider();
    const [sorting, setSorting] = useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

    const data = useMemo(
      () =>
        [...withdrawals, ...deposits].sort((a, b) => b.timestamp - a.timestamp),
      [withdrawals, deposits]
    );

    const table = useReactTable({
      data,
      state: {
        columnFilters,
        sorting,
      },
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
      columns,
      getCoreRowModel: getCoreRowModel(),
    });

    if (depositsLoading || withdrawalsLoading) return <SkeletonCollection />;
    return (
      <Fragment>
        <div className="flex-1 flex flex-col">
          <div ref={ref}>
            <Filters
              data={data}
              chains={chains}
              assets={polkadexAssets}
              table={table}
            />
          </div>
          {data.length ? (
            <div className="flex-1 flex flex-col justify-between border-b border-secondary-base min-h-40">
              <div
                className="max-h-[400px] overflow-auto scrollbar-hide px-3"
                style={{
                  maxHeight: tableMaxHeight,
                  scrollbarGutter: "stable",
                  minHeight: "250px",
                }}
              >
                <Table>
                  <Table.Header className="[&_th]:border-none">
                    {table.getHeaderGroups().map((headerGroup) => (
                      <Table.Row
                        key={headerGroup.id}
                        className="border-none sticky top-0 bg-backgroundBase"
                      >
                        {headerGroup.headers.map((header) => {
                          const getSorted = header.column.getIsSorted();
                          const isActionTab = actionKeys.includes(header.id);
                          const handleSort = (): void => {
                            const isDesc = getSorted === "desc";
                            header.column.toggleSorting(!isDesc);
                          };

                          return (
                            <Table.Head
                              key={header.id}
                              className={classNames(
                                !isActionTab && "cursor-pointer"
                              )}
                              {...(isActionTab && { onClick: handleSort })}
                            >
                              {header.isPlaceholder
                                ? null
                                : flexRender(
                                    header.column.columnDef.header,
                                    header.getContext()
                                  )}
                              {isActionTab && <Table.Icon />}
                            </Table.Head>
                          );
                        })}
                      </Table.Row>
                    ))}
                  </Table.Header>
                  <Table.Body className="[&_tr]:border-none border-none">
                    {table.getRowModel().rows.map((row) => (
                      <Table.Row key={row.id}>
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <Table.Cell key={cell.id}>
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Table.Cell>
                          );
                        })}
                      </Table.Row>
                    ))}
                  </Table.Body>
                  <Table.Caption>Bridge history table</Table.Caption>
                </Table>
              </div>
            </div>
          ) : (
            <GenericMessage
              title="No result found"
              illustration="NoResultFound"
              className="bg-level-0 border-y border-y-primary"
              imageProps={{
                className: "w-10 self-center",
              }}
            />
          )}
        </div>
      </Fragment>
    );
  }
);

History.displayName = "History";
