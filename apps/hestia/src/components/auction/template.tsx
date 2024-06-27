"use client";

import { Typography, Tabs, ScrollArea } from "@polkadex/ux";
import { useMemo, useRef } from "react";
import { useWindowSize } from "usehooks-ts";
import classNames from "classnames";
import { useRouter, useSearchParams } from "next/navigation";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ResponsiveProfile } from "../ui/Header/Profile/responsiveProfile";

import { Overview } from "./Overview";
import { History } from "./History";

import { Footer, Header } from "@/components/ui";
import { useSizeObserver } from "@/hooks";

export function Template() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { width } = useWindowSize();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const [footerRef, footerHeight] = useSizeObserver();
  const [interactionRef, interactionHeight] = useSizeObserver();

  const scrollAreaView = useMemo(() => width <= 420, [width]);

  const mobileView = useMemo(() => width <= 640, [width]);
  const { browserAccountPresent, extensionAccountPresent } =
    useConnectWalletProvider();

  return (
    <div
      className="flex flex-1 flex-col bg-backgroundBase h-full"
      vaul-drawer-wrapper=""
    >
      <Tabs
        defaultValue={searchParams.get("tab") || "overview"}
        onValueChange={(e) => router.replace(`/auction/?tab=${e}`)}
      >
        <Header ref={headerRef} />
        <main
          className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-[1920px] m-auto"
          style={{
            paddingBottom: mobileView
              ? `${interactionHeight}px`
              : `${footerHeight}px`,
          }}
        >
          <div className="flex-1 flex flex-col">
            <div ref={overviewRef} className="flex flex-col">
              <div className="flex items-center justify-between gap-4 px-4 pt-6 pb-4  border-b border-secondary-base flex-wrap">
                <Typography.Text bold size="lg">
                  Auction
                </Typography.Text>
              </div>
              <ScrollArea
                className={classNames(
                  "border-b border-primary px-4 w-full",
                  scrollAreaView && "max-w-80"
                )}
              >
                <Tabs.List className="py-2 whitespace-nowrap">
                  <Tabs.Trigger value="overview">Overview</Tabs.Trigger>
                  <Tabs.Trigger value="history">Auction History</Tabs.Trigger>
                  <Tabs.Trigger value="about">How Auction Works</Tabs.Trigger>
                </Tabs.List>
                <ScrollArea.Bar orientation="horizontal" />
              </ScrollArea>
            </div>
            <Tabs.Content value="overview" className="flex-1 flex">
              <Overview />
            </Tabs.Content>
            <Tabs.Content value="history" className="flex-1 flex">
              <History />
            </Tabs.Content>
            <Tabs.Content value="about" className="flex-1 flex">
              How Auction Works
            </Tabs.Content>
          </div>
        </main>
        {mobileView && (browserAccountPresent || extensionAccountPresent) && (
          <div
            ref={interactionRef}
            className="flex flex-col gap-4 py-2 bg-level-1 border-t border-primary px-2 fixed bottom-0 left-0 w-full"
          >
            <ResponsiveProfile
              extensionAccountPresent={extensionAccountPresent}
              browserAccountPresent={browserAccountPresent}
            />
          </div>
        )}
        {!mobileView && <Footer marketsActive ref={footerRef} />}
      </Tabs>
    </div>
  );
}
