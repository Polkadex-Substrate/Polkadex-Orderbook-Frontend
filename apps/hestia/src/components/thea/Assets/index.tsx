"use client";

import { Table, GenericMessage, Input, Checkbox } from "@polkadex/ux";
import { ChangeEvent, forwardRef, Fragment, useMemo, useState } from "react";
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

import { SkeletonCollection } from "@/components/ui/ReadyToUse";

const actionKeys = ["token", "sourceBalance", "destinationBalance"];

export const Assets = forwardRef<HTMLDivElement, { tableMaxHeight?: string }>(
  ({ tableMaxHeight }, ref) => {
    const [sorting, setSorting] = useState<SortingState>([
      { desc: true, id: "sourceBalance" },
    ]);
    const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
    const [filters, setFilters] = useState({
      search: "",
      hideZero: false,
    });
    const {
      sourceAssets,
      destinationBalances,
      destinationBalancesLoading,
      sourceBalancesLoading,
      sourceBalances,
      sourceChain,
      destinationChain,
    } = useTheaProvider();

    const assets = useMemo(
      () =>
        sourceAssets
          ?.map((e) => {
            const sourceBalance = sourceBalances?.find((x) =>
              x.ticker.includes(e.ticker)
            );
            const destinationBalance = destinationBalances?.find((x) =>
              x.ticker.includes(e.ticker)
            );
            return {
              ...e,
              sourceBalance: sourceBalance?.amount ?? 0,
              destinationBalance: destinationBalance?.amount ?? 0,
            };
          })
          .filter((e) => {
            const hasZeroSourceBalance =
              filters.hideZero && e?.sourceBalance < 0.001;
            const hasZeroDestinationBalance =
              filters.hideZero && e?.destinationBalance < 0.001;
            const hasZeroBalance =
              hasZeroSourceBalance && hasZeroDestinationBalance;

            const matchesNameOrTicker = e.ticker
              .toLowerCase()
              .includes(filters.search.toLowerCase());
            return matchesNameOrTicker && !hasZeroBalance;
          }),
      [
        sourceBalances,
        destinationBalances,
        sourceAssets,
        filters.search,
        filters.hideZero,
      ]
    );

    console.log("Assets", assets);
    const table = useReactTable({
      data: assets,
      state: {
        sorting,
        columnFilters,
      },
      onSortingChange: setSorting,
      onColumnFiltersChange: setColumnFilters,
      getSortedRowModel: getSortedRowModel(),
      getFilteredRowModel: getFilteredRowModel(),
      columns: columns(sourceChain?.name, destinationChain?.name),
      getCoreRowModel: getCoreRowModel(),
      getFacetedRowModel: getFacetedRowModel(),
      getFacetedUniqueValues: getFacetedUniqueValues(),
    });

    const onHideZeroBalance = () =>
      setFilters({
        ...filters,
        hideZero: !filters.hideZero,
      });

    const onSearchToken = (e: ChangeEvent<HTMLInputElement>) =>
      setFilters({ ...filters, search: e.target.value });

    if (sourceBalancesLoading || destinationBalancesLoading)
      return <SkeletonCollection />;
    return (
      <Fragment>
        <div className="flex-1 flex flex-col">
          <div
            ref={ref}
            className="flex items-center justify-between px-5 py-2"
          >
            <Input.Search
              placeholder="Search.."
              value={filters.search}
              onChange={onSearchToken}
              className="max-sm:focus:text-[16px]"
            />
            <Checkbox.Solid
              id="hideZeroBalances"
              checked={filters.hideZero}
              onCheckedChange={onHideZeroBalance}
            >
              <Checkbox.Label htmlFor="hideZeroBalances">
                Hide 0 balances
              </Checkbox.Label>
            </Checkbox.Solid>
          </div>
          {assets.length ? (
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
                        {headerGroup.headers.map((header, i) => {
                          const getSorted = header.column.getIsSorted();
                          const isActionTab = actionKeys.includes(header.id);
                          const fitContent = i === 0 || i === 1;
                          const handleSort = (): void => {
                            const isDesc = getSorted === "desc";
                            header.column.toggleSorting(!isDesc);
                          };
                          return (
                            <Table.Head
                              key={header.id}
                              className={classNames(
                                "whitespace-nowrap",
                                !isActionTab && "cursor-pointer"
                              )}
                              style={{ width: fitContent ? "1%" : "auto" }}
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
                  <Table.Caption>Assets history table</Table.Caption>
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

Assets.displayName = "Assets";
