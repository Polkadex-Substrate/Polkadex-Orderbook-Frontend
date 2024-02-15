import { forwardRef } from "react";
import classNames from "classnames";
import { useOpenOrders } from "@orderbook/core/hooks";
import { GenericMessage, Table as PolkadexTable } from "@polkadex/ux";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useOrders } from "@orderbook/core/providers/user/orders";

import { columns } from "./columns";

import { SkeletonCollection } from "@/components/ui/ReadyToUse";
import { TablePagination } from "@/components/ui";

type Props = {
  maxHeight: string;
};

export const OpenOrders = forwardRef<HTMLDivElement, Props>(
  ({ maxHeight }, ref) => {
    const { onCancelOrder } = useOrders();
    const { isLoading, openOrders } = useOpenOrders();

    const table = useReactTable({
      data: openOrders,
      columns: columns({ onCancelOrder }),
      getCoreRowModel: getCoreRowModel(),
    });

    if (isLoading) return <SkeletonCollection rows={7} />;

    if (!openOrders.length)
      return (
        <GenericMessage
          title="No result found"
          illustration="NoResultFound"
          className="bg-level-1 border-b border-b-primary"
        />
      );

    return (
      <div className="flex-1 flex flex-col">
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base">
          <div
            className="overflow-y-hidden hover:overflow-y-auto px-3"
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
                          {header.isPlaceholder
                            ? null
                            : flexRender(
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
                {table.getRowModel().rows.map((row) => {
                  return (
                    <PolkadexTable.Row
                      key={row.id}
                      className={classNames("hover:bg-level-1 cursor-pointer")}
                    >
                      {row.getVisibleCells().map((cell) => {
                        return (
                          <PolkadexTable.Cell
                            key={cell.id}
                            className={classNames("px-2 py-4 text-xs")}
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
          <TablePagination ref={ref} />
        </div>
      </div>
    );
  }
);
OpenOrders.displayName = "OpenOrders";
