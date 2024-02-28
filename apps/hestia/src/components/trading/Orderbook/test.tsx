"use client";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import { useOrderbookTable } from "@orderbook/core/hooks";
import { Fragment, MutableRefObject, useRef } from "react";
import {
  GenericMessage,
  Table as PolkadexTable,
  Typography,
} from "@polkadex/ux";
import { Decimal } from "@orderbook/core/utils";

import { GenericAction, columns } from "./columns";

export const Table = ({
  isSell = false,
  precision,
  active,
  baseTicker,
  quoteTicker,
  orders,
  asks,
  bids,
}: {
  isSell?: boolean;
  precision: number;
  active?: boolean;
  baseTicker: string;
  quoteTicker: string;
  orders: string[][];
  bids: string[][];
  asks: string[][];
}) => {
  const contentRef = useRef<HTMLDivElement>(null);

  const {
    changeMarketAmount,
    changeMarketAmountSumClick,
    changeMarketPrice,
    total,
    volumeData,
  } = useOrderbookTable({
    orders,
    contentRef: contentRef as MutableRefObject<HTMLDivElement>,
    isSell,
    asks,
    bids,
  });

  const onChangePrice: GenericAction = (selectedIndex) => {
    changeMarketPrice(selectedIndex, isSell ? "asks" : "bids");
  };

  const onChangeAmount: GenericAction = (selectedIndex) =>
    changeMarketAmount(selectedIndex, isSell ? "asks" : "bids");

  const onChangeTotal: GenericAction = (selectedIndex) =>
    changeMarketAmountSumClick(selectedIndex);

  const onChangeAllValues: GenericAction = (selectedIndex) => {
    changeMarketAmount(selectedIndex, isSell ? "asks" : "bids");
    changeMarketPrice(selectedIndex, isSell ? "asks" : "bids");
  };

  if (!orders.length)
    return (
      <GenericMessage
        title="No data"
        illustration="NoData"
        className="bg-level-0 p-0"
      />
    );

  return (
    <div
      ref={contentRef}
      className={classNames(
        "flex flex-col gap-1 flex-1 relative",
        !active && "hidden"
      )}
      style={{ scrollbarGutter: "stable" }}
    >
      {orders.map((order, i) => {
        const price = order[0];
        const amount = order[1];
        return (
          <div
            key={i}
            className="relative grid grid-cols-[30%_35%_35%] px-2 py-1"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onChangeAllValues(i);
            }}
          >
            <div
              className={classNames(
                "absolute w-full h-full",
                isSell ? "bg-danger-base/10" : "bg-success-base/10"
              )}
            />
            <Typography.Text
              appearance={isSell ? "danger" : "success"}
              size="xs"
              bold
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onChangePrice(i);
              }}
            >
              <Decimal
                fixed={precision}
                thousSep=","
                // prevValue={orders[i + 1] ? orders[i + 1][0] : 0}
              >
                {price}
              </Decimal>
            </Typography.Text>
            <Typography.Text
              size="xs"
              bold
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onChangeAmount(i);
              }}
              className="justify-self-end"
            >
              <Decimal fixed={precision} thousSep=",">
                {amount}
              </Decimal>
            </Typography.Text>
            <Typography.Text
              size="xs"
              bold
              onClick={(event) => {
                event.preventDefault();
                event.stopPropagation();
                onChangeTotal(i);
              }}
              className="justify-self-end"
            >
              <Decimal fixed={precision} thousSep=",">
                {total[i]}
              </Decimal>
            </Typography.Text>
          </div>
        );
      })}
    </div>
  );
};
