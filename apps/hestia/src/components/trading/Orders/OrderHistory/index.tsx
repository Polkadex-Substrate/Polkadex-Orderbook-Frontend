"use client";
import InfiniteScroll from "react-infinite-scroll-component";
import { useMemo } from "react";
import { useWindowSize } from "usehooks-ts";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import {
  Button,
  GenericMessage,
  Table as PolkadexTable,
  Spinner,
} from "@polkadex/ux";
import { useOrderHistory } from "@orderbook/core/hooks";
import { Ifilters } from "@orderbook/core/providers/types";

import { Loading } from "../loading";
import { OrderHistoryResponsiveCard } from "../responsiveCard";

import { columns } from "./columns";

export const OrderHistoryTable = ({
  market,
  filters,
  maxHeight,
}: {
  market: string;
  filters: Ifilters;
  maxHeight: string;
}) => {
  const { isLoading, orderHistory, error, hasNextPage, onFetchNextPage } =
    useOrderHistory(market, filters);
  const { width } = useWindowSize();
  const table = useReactTable({
    data: orderHistory,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const responsiveView = useMemo(
    () => width < 600 || (width >= 715 && width <= 1200),
    [width]
  );

  if (isLoading) return <Loading />;

  if (!orderHistory.length)
    return <GenericMessage title={"No items found"} illustration="NoData" />;

  return (
    <InfiniteScroll
      className="flex-1 overflow-y-hidden hover:overflow-y-auto"
      style={{ scrollbarGutter: "stable" }}
      dataLength={orderHistory.length}
      next={() => {
        onFetchNextPage();
      }}
      hasMore={Boolean(hasNextPage)}
      height={maxHeight}
      loader={<Spinner.Keyboard className="h-6 mx-auto my-2" />}
    >
      {responsiveView ? (
        <OrderHistoryResponsiveCard orders={orderHistory} />
      ) : (
        <PolkadexTable className="w-full">
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
                  className={classNames(
                    "hover:bg-level-1 cursor-pointer",
                    i % 2 && "bg-level-1"
                  )}
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
      )}
      {!isLoading && error && (
        <div className="flex flex-col items-center justify-center gap-2">
          <p>{error}</p>
          <Button.Solid onClick={() => onFetchNextPage()} size="sm">
            Try again
          </Button.Solid>
        </div>
      )}
    </InfiniteScroll>
  );
};
