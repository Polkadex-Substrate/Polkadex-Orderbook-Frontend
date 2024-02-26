// TODO: Fix responsive interaction (reflect columns updates)

"use client";

import { useEffect, useMemo, useState } from "react";
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import classNames from "classnames";
import {
  useCancelOrder,
  useOpenOrders,
  CancelOrderArgs,
} from "@orderbook/core/hooks";
import { GenericMessage, Modal, Table as PolkadexTable } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Ifilters } from "@orderbook/core/providers/types";
import { tryUnlockTradeAccount } from "@orderbook/core/helpers";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { Loading } from "../loading";
import { OpenOrderResponsiveCard } from "../responsiveCard";

import { columns } from "./columns";

import { UnlockAccount } from "@/components/ui/ReadyToUse/unlockAccount";

export const OpenOrdersTable = ({
  filters,
  maxHeight,
}: {
  filters: Ifilters;
  maxHeight: string;
}) => {
  const { mutateAsync: cancelOrder } = useCancelOrder();
  const { selectedAccount } = useConnectWalletProvider();
  const { isLoading, openOrders } = useOpenOrders(filters);
  const { width } = useWindowSize();

  const [showPassword, setShowPassword] = useState(false);
  const [orderPayload, setOrderPayload] = useState<CancelOrderArgs | null>(
    null
  );

  const responsiveView = useMemo(
    () => width < 500 || (width >= 715 && width <= 1115),
    [width]
  );

  const onCancelOrder = async (payload: CancelOrderArgs | null) => {
    if (!payload) return;
    if (selectedAccount?.isLocked) {
      setShowPassword(true);
      setOrderPayload(payload);
    } else {
      await cancelOrder(payload);
      setOrderPayload(null);
    }
  };

  const table = useReactTable({
    data: openOrders,
    columns: columns({ onCancelOrder }),
    getCoreRowModel: getCoreRowModel(),
  });

  useEffect(() => {
    if (selectedAccount) tryUnlockTradeAccount(selectedAccount);
  }, [selectedAccount]);

  if (isLoading) return <Loading />;

  if (!openOrders.length)
    return <GenericMessage title={"No open orders"} illustration="NoData" />;

  return (
    <>
      <Modal open={showPassword} onOpenChange={setShowPassword}>
        <Modal.Content>
          <UnlockAccount
            onClose={() => setShowPassword(false)}
            onAction={async () => await onCancelOrder(orderPayload)}
            tempBrowserAccount={selectedAccount}
          />
        </Modal.Content>
      </Modal>
      <div
        className="flex-1 overflow-y-hidden hover:overflow-y-auto"
        style={{ maxHeight, scrollbarGutter: "stable" }}
      >
        {responsiveView ? (
          <OpenOrderResponsiveCard
            orders={openOrders}
            onCancelOrder={onCancelOrder}
          />
        ) : (
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
        )}
      </div>
    </>
  );
};
