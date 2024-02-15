import { forwardRef, useState } from "react";
import classNames from "classnames";
import { useOpenOrders } from "@orderbook/core/hooks";
import { GenericMessage, Loading, Table } from "@polkadex/ux";
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
    const [isFetchingNextPage, setIsfetchingNext] = useState(false);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [page, setPage] = useState(1);

    const onSetRowsPerPage = async (row: number) => {
      setIsfetchingNext(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      console.log(row);
      setRowsPerPage(row);
      setPage(1);
      setIsfetchingNext(false);
    };

    const onPrevPage = async () => {
      console.log("coming here");
      setIsfetchingNext(true);
      await new Promise((resolve) => setTimeout(resolve, 5000));
      if (page > 1) setPage(page - 1);
      setIsfetchingNext(false);
    };

    const onNextPage = async () => {
      setIsfetchingNext(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      if (openOrders.length > rowsPerPage * page) setPage(page + 1);
      setIsfetchingNext(false);
    };

    const table = useReactTable({
      data: openOrders.splice(rowsPerPage * (page - 1), rowsPerPage * page),
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
        <div className="flex-1 flex flex-col justify-between border-b border-secondary-base [&_svg]:scale-150">
          <Loading.Spinner active={isFetchingNextPage}>
            <div
              className="overflow-y-hidden hover:overflow-y-auto px-3"
              style={{ maxHeight, scrollbarGutter: "stable" }}
            >
              <Table
                className={classNames(
                  "w-full",
                  isFetchingNextPage && "opacity-50"
                )}
                even
              >
                <Table.Header className="sticky top-0 bg-backgroundBase">
                  {table.getHeaderGroups().map((headerGroup) => (
                    <Table.Row key={headerGroup.id}>
                      {headerGroup.headers.map((header) => {
                        return (
                          <Table.Head
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
                          </Table.Head>
                        );
                      })}
                    </Table.Row>
                  ))}
                </Table.Header>
                <Table.Body>
                  {table.getRowModel().rows.map((row) => {
                    return (
                      <Table.Row
                        key={row.id}
                        className={classNames(
                          "hover:bg-level-1 cursor-pointer"
                        )}
                      >
                        {row.getVisibleCells().map((cell) => {
                          return (
                            <Table.Cell
                              key={cell.id}
                              className={classNames("px-2 py-4 text-xs")}
                            >
                              {flexRender(
                                cell.column.columnDef.cell,
                                cell.getContext()
                              )}
                            </Table.Cell>
                          );
                        })}
                      </Table.Row>
                    );
                  })}
                </Table.Body>
              </Table>
            </div>
          </Loading.Spinner>
          <TablePagination
            rowsPerPage={rowsPerPage}
            page={page}
            onSetRowsPerPage={onSetRowsPerPage}
            onNextPage={onNextPage}
            onPrevPage={onPrevPage}
            ref={ref}
          />
        </div>
      </div>
    );
  }
);
OpenOrders.displayName = "OpenOrders";
