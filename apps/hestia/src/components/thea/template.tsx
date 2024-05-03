"use client";

import { Button, GenericMessage, Tabs, Typography } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, useMemo, useRef, useState } from "react";
import { RiDownload2Line, RiInformation2Line } from "@remixicon/react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useTheaProvider } from "@orderbook/core/providers";

import { ResponsiveProfile } from "../ui/Header/Profile/responsiveProfile";

import { Help } from "./Help";
import { Form } from "./Form";
import { History } from "./History";
import { Assets } from "./Assets";

import { Footer, Header } from "@/components/ui";
import { useSizeObserver, useTour } from "@/hooks";

export function Template({ id }: { id: string }) {
  const [activeTab, setActiveTab] = useState("history");

  const headerRef = useRef<HTMLDivElement | null>(null);
  const helpRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const [footerRef, footerHeight] = useSizeObserver();
  const [interactionRef, interactionHeight] = useSizeObserver();
  const { width } = useWindowSize();

  const { onOpenChange } = useTour();
  const { sourceAccount } = useTheaProvider();
  const { browserAccountPresent, extensionAccountPresent } =
    useConnectWalletProvider();

  const mobileView = useMemo(() => width <= 640, [width]);
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
            paddingBottom: mobileView
              ? `${interactionHeight}px`
              : `${footerHeight}px`,
          }}
        >
          <div className="flex-1 flex flex-col">
            <div
              ref={overviewRef}
              className="flex items-center justify-between px-4 pt-6 pb-4 border-b border-secondary-base"
            >
              <Typography.Text bold size="lg">
                Bridge
              </Typography.Text>
              <RiInformation2Line className="w-6 h-6 text-primary" />
            </div>
            <Form />
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="border-t border-primary"
            >
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between gap-2 border-b border-primary px-4 w-full py-2">
                  <Tabs.List>
                    <Tabs.Trigger value="history">History</Tabs.Trigger>
                    <Tabs.Trigger value="assets">Assets</Tabs.Trigger>
                  </Tabs.List>
                  <Button.Ghost
                    appearance="secondary"
                    size="sm"
                    className="gap-2"
                  >
                    <RiDownload2Line className="w-3.5 h-3.5" />
                    <Typography.Text appearance="primary">
                      Export data
                    </Typography.Text>
                  </Button.Ghost>
                </div>
                {sourceAccount ? (
                  <Fragment>
                    <Tabs.Content value="history" className="flex flex-col">
                      <History />
                    </Tabs.Content>
                    <Tabs.Content value="assets" className="flex flex-col">
                      <Assets />
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
        {!mobileView && <Footer marketsActive ref={footerRef} />}
      </div>
    </Fragment>
  );
}
