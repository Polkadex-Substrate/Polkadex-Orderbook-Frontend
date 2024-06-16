"use client";

import { Button, GenericMessage, Tabs, Typography } from "@polkadex/ux";
import { useWindowSize } from "usehooks-ts";
import { Fragment, useMemo, useState } from "react";
import { RiRefreshLine } from "@remixicon/react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useMeasure } from "react-use";
import Link from "next/link";

import { ResponsiveProfile } from "../ui/Header/Profile/responsiveProfile";

import { Help } from "./Help";
import { Deposit } from "./Deposit";
import { History } from "./History";

import { Footer, Header } from "@/components/ui";

export function Template() {
  const [activeTab, setActiveTab] = useState("history");
  const { width } = useWindowSize();

  const [footerRef, footerBounds] = useMeasure<HTMLDivElement>();
  const [interactionRef, interactionBounds] = useMeasure<HTMLDivElement>();

  const { browserAccountPresent, extensionAccountPresent } =
    useConnectWalletProvider();

  const mobileView = useMemo(() => width <= 640, [width]);

  const paddingBottom = useMemo(
    () =>
      mobileView ? `${interactionBounds.height}px` : `${footerBounds.height}px`,
    [interactionBounds.height, footerBounds.height, mobileView]
  );

  return (
    <Fragment>
      <div
        className="flex flex-1 flex-col bg-backgroundBase h-full"
        vaul-drawer-wrapper=""
      >
        <Header />
        <main
          className="flex flex-1 overflow-auto border-x border-secondary-base w-full max-w-[1920px] h-full m-auto"
          style={{
            paddingBottom,
          }}
        >
          <div className="flex-1 flex flex-col">
            <Tabs className="flex flex-row flex-1" defaultValue="deposit">
              <div className="flex flex-col">
                <Tabs.List className="flex flex-col items-start gap-0 py-4">
                  <Tabs.Trigger
                    className="px-10 py-2 w-full text-left"
                    value="deposit"
                  >
                    Deposit
                  </Tabs.Trigger>
                  <Tabs.Trigger
                    className="px-10 py-2 w-full text-left"
                    value="withdraw"
                  >
                    Withdraw
                  </Tabs.Trigger>
                </Tabs.List>
              </div>
              <div className="flex flex-1 border-x border-primary p-8">
                <Tabs.Content value="deposit">
                  <Deposit />
                </Tabs.Content>
                <Tabs.Content value="withdraw">Withdraw</Tabs.Content>
              </div>
              <div className="flex flex-col gap-4 p-6">
                <Typography.Heading type="h2">FAQ</Typography.Heading>
                <div className="flex flex-col gap-2 max-w-[200px]">
                  {fakeNews.map((e) => (
                    <Link
                      key={e.id}
                      className="text-primary hover:text-primary-base transition-colors duration-300 text-sm"
                      href={e.link}
                    >
                      {e.title}
                    </Link>
                  ))}
                </div>
              </div>
            </Tabs>
            <Tabs
              value={activeTab}
              onValueChange={setActiveTab}
              className="border-t border-primary"
            >
              <div className="flex-1 flex flex-col">
                <div className="flex items-center justify-between border-b border-primary px-4 w-full py-2">
                  <Tabs.List>
                    <Tabs.Trigger value="history">History</Tabs.Trigger>
                  </Tabs.List>
                  <Button.Light
                    appearance="secondary"
                    size="xs"
                    className="gap-1"
                    onClick={() => {}}
                  >
                    <RiRefreshLine className="w-4 h-4 text-primary" />
                    {false && (
                      <Typography.Text appearance="primary" size="xs">
                        Refetching..
                      </Typography.Text>
                    )}
                  </Button.Light>
                </div>
                {false ? (
                  <Fragment>
                    <Tabs.Content value="history" className="flex flex-col">
                      <History searchTerm="" />
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
            <Help />
          </div>
        </main>
        {mobileView && (browserAccountPresent || extensionAccountPresent) && (
          <div
            ref={interactionRef}
            className="flex flex-col gap-4 bg-level-1 border-t border-primary py-2 px-2 fixed bottom-0 left-0 w-full"
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

const fakeNews = [
  {
    id: 1,
    title: "How to withdraw from Ethereum?",
    link: "#",
  },
  {
    id: 2,
    title: "Why hasn't my withdraw arrived?",
    link: "#",
  },
  {
    id: 3,
    title: "How to withdraw from Polkadot?",
    link: "#",
  },
  {
    id: 3,
    title: "How to find my transaction ID?",
    link: "#",
  },
  {
    id: 4,
    title: "How to withdraw from AssetHub?",
    link: "#",
  },
];
