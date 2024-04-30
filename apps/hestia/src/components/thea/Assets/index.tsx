"use client";

import { Table, GenericMessage, Input } from "@polkadex/ux";
import { Fragment, useState } from "react";
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

import { columns, fakeData } from "./columns";
import { Filters } from "./Filters";

// import { SkeletonCollection } from "@/components/ui/ReadyToUse";

const actionKeys = ["token", "source", "date"];

export const Assets = ({ tableMaxHeight }: { tableMaxHeight?: string }) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);

  const table = useReactTable({
    data: fakeData,
    state: {
      sorting,
      columnFilters,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    columns,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  // return <SkeletonCollection />;
  return (
    <Fragment>
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between pl-5">
          <Input.Search
            placeholder="Search transaction.."
            className="max-sm:focus:text-[16px]"
          />
          <Filters availableTokens={[]} table={table} />
        </div>
        {fakeData.length ? (
          <div className="flex-1 flex flex-col justify-between border-b border-secondary-base min-h-40">
            <div
              className="overflow-y-hidden hover:overflow-y-auto px-3"
              style={{
                maxHeight: tableMaxHeight,
                scrollbarGutter: "stable",
                minHeight: "200px",
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
                <Table.Caption>Assets history table</Table.Caption>
              </Table>
            </div>
          </div>
        ) : (
          <GenericMessage
            title="No result found"
            illustration="NoResultFound"
            className="bg-level-1 border-y border-y-primary"
            imageProps={{
              className: "w-10 self-center",
            }}
          />
        )}
      </div>
    </Fragment>
  );
};
