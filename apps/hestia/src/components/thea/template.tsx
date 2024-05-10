"use client";

import { Button, GenericMessage, Tabs, Typography } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, useMemo, useState } from "react";
import { RiInformation2Line, RiRefreshLine } from "@remixicon/react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useTheaProvider } from "@orderbook/core/providers";
import { useMeasure } from "react-use";

import { ResponsiveProfile } from "../ui/Header/Profile/responsiveProfile";

import { Help } from "./Help";
import { Form } from "./Form";
import { History } from "./History";
import { Assets } from "./Assets";

import { Footer, Header } from "@/components/ui";

export function Template() {
  const [activeTab, setActiveTab] = useState("history");

  const { width } = useWindowSize();
  const [overViewRef, overviewBounds] = useMeasure<HTMLDivElement>();
  const [headerRef, headerBounds] = useMeasure<HTMLDivElement>();
  const [helpRef, helpBounds] = useMeasure<HTMLDivElement>();
  const [footerRef, footerBounds] = useMeasure<HTMLDivElement>();
  const [interactionRef, interactionBounds] = useMeasure<HTMLDivElement>();
  const [tableTitleRef, tableTitleBounds] = useMeasure<HTMLDivElement>();
  const [filtersRef, filtersBounds] = useMeasure<HTMLDivElement>();

  const { sourceAccount, onRefreshTransactions, transactionsRefetching } =
    useTheaProvider();
  const { browserAccountPresent, extensionAccountPresent } =
    useConnectWalletProvider();

  const mobileView = useMemo(() => width <= 640, [width]);

  const paddingBottom = useMemo(
    () =>
      mobileView ? `${interactionBounds.height}px` : `${footerBounds.height}px`,
    [interactionBounds.height, footerBounds.height, mobileView]
  );

  const tableMaxHeight = useMemo(
    () =>
      `calc(100vh - ${headerBounds.height + helpBounds.height + overviewBounds.height + tableTitleBounds.height + filtersBounds.height + 30}px)`,
    [
      headerBounds.height,
      helpBounds.height,
      overviewBounds.height,
      tableTitleBounds.height,
      filtersBounds.height,
    ]
  );

  return (
    <Fragment>
      <div
        className="flex flex-1 flex-col bg-backgroundBase h-full"
        vaul-drawer-wrapper=""
      >
        <Header ref={headerRef} />
        <main
          className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-[1920px] h-full m-auto"
          style={{
            paddingBottom,
          }}
        >
          <div className="flex-1 flex flex-col">
            <div ref={overViewRef} className="flex flex-col">
              <div className="flex items-center justify-between p-4 border-b border-secondary-base">
                <Typography.Text bold size="lg">
                  Bridge
                </Typography.Text>
                <RiInformation2Line className="w-6 h-6 text-primary" />
              </div>
              <Form />
            </div>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="border-t border-primary"
            >
              <div className="flex-1 flex flex-col">
                <div
                  ref={tableTitleRef}
                  className="flex items-center justify-between border-b border-primary px-4 w-full py-2"
                >
                  <Tabs.List>
                    <Tabs.Trigger value="history">History</Tabs.Trigger>
                    <Tabs.Trigger value="assets">Assets</Tabs.Trigger>
                  </Tabs.List>
                  <Button.Light
                    appearance="secondary"
                    size="xs"
                    className="gap-1"
                    onClick={onRefreshTransactions}
                    disabled={transactionsRefetching}
                  >
                    <RiRefreshLine className="w-4 h-4 text-primary" />
                    {transactionsRefetching && (
                      <Typography.Text appearance="primary" size="xs">
                        Refetching..
                      </Typography.Text>
                    )}
                  </Button.Light>
                </div>
                {sourceAccount ? (
                  <Fragment>
                    <Tabs.Content value="history" className="flex flex-col">
                      <History
                        ref={filtersRef}
                        tableMaxHeight={tableMaxHeight}
                      />
                    </Tabs.Content>
                    <Tabs.Content value="assets" className="flex flex-col">
                      <Assets
                        ref={filtersRef}
                        tableMaxHeight={tableMaxHeight}
                      />
                    </Tabs.Content>
                  </Fragment>
                ) : (
                  <GenericMessage
                    title="Connect a source wallet"
                    illustration="ConnectAccount"
                    className="bg-level-0 border-y border-y-primary"
                    imageProps={{
                      className: "w-22 self-center",
                    }}
                  />
                )}
              </div>
            </Tabs>
            <Help ref={helpRef} />
          </div>
        </main>
        {mobileView && (browserAccountPresent || extensionAccountPresent) && (
          <div
            ref={interactionRef}
            className="flex flex-col gap-4 bg-level-1 border-t border-primary py-3 px-2 fixed bottom-0 left-0 w-full"
          >
            <ResponsiveProfile
              extensionAccountPresent={extensionAccountPresent}
              browserAccountPresent={browserAccountPresent}
            />
          </div>
        )}
        {!mobileView && <Footer ref={footerRef} />}
      </div>
    </Fragment>
  );
}
