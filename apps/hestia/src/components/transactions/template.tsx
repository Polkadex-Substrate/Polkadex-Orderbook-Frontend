"use client";

import { Typography, Input, Tabs, Tooltip } from "@polkadex/ux";
import { useMemo, useState } from "react";
import { InformationCircleIcon } from "@heroicons/react/24/outline";
import { OrdersProvider } from "@orderbook/core/providers";
import { useElementSize, useWindowSize } from "usehooks-ts";
import { useProfile } from "@orderbook/core/providers/user/profile";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();
  const [headerRef, { height: headerHeight = 0 }] = useElementSize();
  const [footerRef, { height: footerHeight = 0 }] = useElementSize();
  const [helpRef, { height: helpeight = 0 }] = useElementSize();
  const [tableRowsRef, { height: tableRowsHeight = 0 }] = useElementSize();
  const [overviewRef, { height: overviewHeight = 0 }] = useElementSize();
  const [searchTerm, setSearchTerm] = useState("");

  const responsiveView = useMemo(() => width <= 675, [width]);

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
        <Tabs
          defaultValue={searchParams.get("tab") || "transfer"}
          onValueChange={(e) => router.replace(`/transactions/?tab=${e}`)}
        >
          <Header ref={headerRef} />
          <main className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-screen-2xl m-auto">
            <div className="flex-1 flex flex-col">
              <div ref={overviewRef} className="flex flex-col">
                <div className="flex items-end justify-between gap-4 px-4 pt-6 pb-4  border-b border-secondary-base flex-wrap">
                  <Typography.Text bold size="lg">
                    Transactions
                  </Typography.Text>
                  <Tooltip>
                    <Tooltip.Trigger>
                      <InformationCircleIcon className="w-6 h-6 text-primary" />
                    </Tooltip.Trigger>
                    <Tooltip.Content className="w-52" side="left">
                      <Typography.Text>
                        Explore detailed records of your Transfers & Orders
                        here.
                      </Typography.Text>
                    </Tooltip.Content>
                  </Tooltip>
                </div>
                <div
                  className={classNames(
                    "flex items-center justify-between gap-2 border-b border-primary px-4 w-full",
                    responsiveView && "flex-col"
                  )}
                >
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
                    <Input.Search
                      className="py-2 text-sm"
                      placeholder="Search transactions.."
                      onChange={(e) => setSearchTerm(e.target.value)}
                    />
                  </div>
                </div>
              </div>
              <Tabs.Content value="transfer" className="flex-1 flex">
                {mainAddress?.length ? (
                  <TransferHistory
                    ref={tableRowsRef}
                    maxHeight={maxHeight}
                    searchTerm={searchTerm}
                  />
                ) : (
                  <ConnectAccountWrapper funding />
                )}
              </Tabs.Content>
              <Tabs.Content value="openOrders" className="flex-1 flex">
                {tradeAddress?.length ? (
                  <OrdersProvider>
                    <OpenOrders
                      ref={tableRowsRef}
                      maxHeight={maxHeight}
                      searchTerm={searchTerm}
                    />
                  </OrdersProvider>
                ) : (
                  <ConnectAccountWrapper />
                )}
              </Tabs.Content>
              <Tabs.Content value="orderHistory" className="flex-1 flex">
                {tradeAddress?.length ? (
                  <OrderHistory
                    ref={tableRowsRef}
                    maxHeight={maxHeight}
                    searchTerm={searchTerm}
                  />
                ) : (
                  <ConnectAccountWrapper />
                )}
              </Tabs.Content>
              <Tabs.Content value="tradeHistory" className="flex-1 flex">
                {tradeAddress?.length ? (
                  <TradeHistory
                    ref={tableRowsRef}
                    maxHeight={maxHeight}
                    searchTerm={searchTerm}
                  />
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
