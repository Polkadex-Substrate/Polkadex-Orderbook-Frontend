"use client";

import { Typography, Input, Tabs } from "@polkadex/ux";
import { useMemo } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { OrdersProvider } from "@orderbook/core/providers";
import { useElementSize } from "usehooks-ts";
import { useProfile } from "@orderbook/core/providers/user/profile";

import { Help } from "./Help";
import { TransferHistory } from "./Transfer";
import { OpenOrders } from "./OpenOrders";
import { OrderHistory } from "./OrderHistory";
import { TradeHistory } from "./TradeHistory";

import { Footer, Header } from "@/components/ui";
import { ConnectTradingInteraction } from "@/components/ui/ConnectWalletInteraction/connectTradingInteraction";
import { ConnectAccountWrapper } from "@/components/ui/ReadyToUse";

// useElementSize Deprecated -> useResizeObserver
export function Template() {
  const [headerRef, { height: headerHeight = 0 }] = useElementSize();
  const [footerRef, { height: footerHeight = 0 }] = useElementSize();
  const [helpRef, { height: helpeight = 0 }] = useElementSize();
  const [tableRowsRef, { height: tableRowsHeight = 0 }] = useElementSize();
  const [overviewRef, { height: overviewHeight = 0 }] = useElementSize();

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
  const {
    selectedAddresses: { mainAddress, tradeAddress },
  } = useProfile();

  return (
    <>
      <ConnectTradingInteraction />
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
                    <Tabs.Trigger value="orderHistory">
                      Order History
                    </Tabs.Trigger>
                    <Tabs.Trigger value="tradeHistory">
                      Trade History
                    </Tabs.Trigger>
                  </Tabs.List>
                  <div>
                    <Input.Search placeholder="Search transactions.." />
                  </div>
                </div>
              </div>
              <Tabs.Content value="transfer" className="flex-1 flex">
                {mainAddress?.length ? (
                  <TransferHistory ref={tableRowsRef} maxHeight={maxHeight} />
                ) : (
                  <ConnectAccountWrapper funding />
                )}
              </Tabs.Content>
              <Tabs.Content value="openOrders" className="flex-1 flex">
                {tradeAddress?.length ? (
                  <OrdersProvider>
                    <OpenOrders ref={tableRowsRef} maxHeight={maxHeight} />
                  </OrdersProvider>
                ) : (
                  <ConnectAccountWrapper />
                )}
              </Tabs.Content>
              <Tabs.Content value="orderHistory" className="flex-1 flex">
                {tradeAddress?.length ? (
                  <OrderHistory ref={tableRowsRef} maxHeight={maxHeight} />
                ) : (
                  <ConnectAccountWrapper />
                )}
              </Tabs.Content>
              <Tabs.Content value="tradeHistory" className="flex-1 flex">
                {tradeAddress?.length ? (
                  <TradeHistory ref={tableRowsRef} maxHeight={maxHeight} />
                ) : (
                  <ConnectAccountWrapper />
                )}
              </Tabs.Content>
              <Help ref={helpRef} />
            </div>
          </main>
          <Footer ref={footerRef} />
        </Tabs>
      </div>
    </>
  );
}
