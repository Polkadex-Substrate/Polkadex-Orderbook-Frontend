// TODO: Add generic empty assets

import { Table as PolkadexTable, Skeleton, GenericMessage } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, forwardRef, useEffect, useMemo, useState } from "react";
import { AssetsProps } from "@orderbook/core/hooks";
import {
  SortingState,
  flexRender,
  getCoreRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Asset } from "@orderbook/core/API";
import classNames from "classnames";

// import { ResponsiveData } from "./responsiveData";
import { columns } from "./columns";
const responsiveKeys = ["inOrders", "fundingAccount"];

export const Table = forwardRef<
  HTMLDivElement,
  { maxHeight: string; data: AssetsProps[]; loading: boolean }
>(({ maxHeight, data, loading }, ref) => {
  const [state, setState] = useState<Asset | null>(null);

  const [sorting, setSorting] = useState<SortingState>([]);

  const { width } = useWindowSize();

  const table = useReactTable({
    data,
    state: { sorting },
    onSortingChange: setSorting,
    getSortedRowModel: getSortedRowModel(),
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const responsiveView = useMemo(() => width <= 800, [width]);

  useEffect(() => {
    if (!responsiveView && !!state) setState(null);
  }, [responsiveView, state]);

  if (loading)
    return (
      <div className="flex-1 flex flex-col gap-3 p-3">
        {new Array(8).fill("").map((_, i) => (
          <Skeleton key={i} loading className="flex-1 w-full h-5" />
        ))}
      </div>
    );
  return (
    <Fragment>
      {/* <ResponsiveData
        open={!!state}
        onClose={() => setState(null)}
        data={state}
      /> */}
      {data?.length ? (
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base bg-level-0">
          <div
            className="overflow-y-hidden hover:overflow-y-auto px-3 min-h-[300px]"
            style={{ maxHeight, scrollbarGutter: "stable" }}
          >
            <PolkadexTable>
              <PolkadexTable.Header>
                {table.getHeaderGroups().map((headerGroup) => (
                  <PolkadexTable.Row
                    key={headerGroup.id}
                    className="border-none"
                  >
                    {headerGroup.headers.map((header, i) => {
                      const getSorted = header.column.getIsSorted();
                      const isActionTab = header.id === "actions";
                      const handleSort = (): void => {
                        const isDesc = getSorted === "desc";
                        header.column.toggleSorting(!isDesc);
                      };
                      if (responsiveView && responsiveKeys.includes(header.id))
                        return null;
                      return (
                        <PolkadexTable.Head
                          key={header.id}
                          align={i === 0 ? "left" : "right"}
                          className={classNames(
                            !isActionTab && "cursor-pointer"
                          )}
                          {...(!isActionTab && { onClick: handleSort })}
                        >
                          {header.isPlaceholder
                            ? null
                            : flexRender(
                                header.column.columnDef.header,
                                header.getContext()
                              )}
                          {!isActionTab && <PolkadexTable.Icon />}
                        </PolkadexTable.Head>
                      );
                    })}
                  </PolkadexTable.Row>
                ))}
              </PolkadexTable.Header>
              <PolkadexTable.Body>
                {table.getRowModel().rows.map((row) => {
                  return (
                    <PolkadexTable.Row key={row.id}>
                      {row.getVisibleCells().map((cell, i) => {
                        if (
                          responsiveView &&
                          responsiveKeys.includes(cell.column.id)
                        )
                          return null;

                        return (
                          <PolkadexTable.Cell
                            key={cell.id}
                            align={i === 0 ? "left" : "right"}
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
        </div>
      ) : (
        <GenericMessage
          title="No result found"
          illustration="NoResultFound"
          className="bg-level-1"
        />
      )}
    </Fragment>
  );
});
Table.displayName = "Table";
