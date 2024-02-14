"use client";

import { Typography, Input, Tabs } from "@polkadex/ux";
import { useElementSize } from "usehooks-ts";
import { useMemo } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";

import { Help } from "./Help";
import { TradesTable } from "./TradesTable";

import { Footer, Header } from "@/components/ui";

export function Template() {
  const [headerRef, { height: headerHeight }] = useElementSize();
  const [footerRef, { height: footerHeight }] = useElementSize();
  const [helpRef, { height: helpeight }] = useElementSize();
  const [tableRowsRef, { height: tableRowsHeight }] = useElementSize();
  const [overviewRef, { height: overviewHeight }] = useElementSize();

  const maxHeight = useMemo(
    () =>
      `calc(100vh - ${
        overviewHeight +
        headerHeight +
        footerHeight +
        helpeight +
        tableRowsHeight +
        1
      }px)`,
    [headerHeight, footerHeight, overviewHeight, helpeight, tableRowsHeight]
  );
  return (
    <div
      className="flex flex-1 flex-col bg-backgroundBase max-sm:pb-16"
      vaul-drawer-wrapper=""
    >
      <Tabs defaultValue="transfer">
        <Header ref={headerRef} />
        <main className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-screen-2xl m-auto">
          <div className="flex-1 flex flex-col">
            <div ref={overviewRef} className="flex flex-col">
              <div className="flex items-end justify-between gap-4 px-4 pt-6 pb-4  border-b border-secondary-base flex-wrap">
                <Typography.Text bold size="lg">
                  Transactions
                </Typography.Text>
                <InformationCircleIcon className="w-6 h-6 text-primary" />
              </div>
              <div className="flex items-center justify-between gap-2 border-b border-primary px-4 w-full">
                <Tabs.List className="py-2">
                  <Tabs.Trigger value="transfer">Transfer</Tabs.Trigger>
                  <Tabs.Trigger value="openOrders">Open Orders</Tabs.Trigger>
                  <Tabs.Trigger value="orderOrders">Order History</Tabs.Trigger>
                  <Tabs.Trigger value="tradeOrders">Trade History</Tabs.Trigger>
                </Tabs.List>
                <div>
                  <Input.Search placeholder="Search transactions.." />
                </div>
              </div>
            </div>
            <Tabs.Content value="transfer" className="flex-1 flex">
              <TradesTable ref={tableRowsRef} maxHeight={maxHeight} />
            </Tabs.Content>
            <Tabs.Content value="openOrders" className="flex-1 flex">
              Open orders
            </Tabs.Content>
            <Help ref={helpRef} />
          </div>
        </main>
        <Footer ref={footerRef} />
      </Tabs>
    </div>
  );
}
