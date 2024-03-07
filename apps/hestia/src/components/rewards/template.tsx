"use client";

import { Typography, Tabs, Carousel, HoverCard, Skeleton } from "@polkadex/ux";
import { useResizeObserver, useWindowSize } from "usehooks-ts";
import { Fragment, useMemo, useRef, useState } from "react";
import {
  RiArrowLeftSLine,
  RiArrowRightSLine,
  RiInformation2Line,
} from "@remixicon/react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";
import { useEpochs } from "@orderbook/core/hooks";

import { ResponsiveProfile } from "../ui/Header/Profile/responsiveProfile";

import { Table } from "./Table";
import { Help } from "./Help";
import { Info } from "./info";

import { Footer, Header } from "@/components/ui";
import { useSizeObserver } from "@/hooks";

export function Template() {
  const [tab, setTab] = useState(fakeData[1].id.toString());
  const { width } = useWindowSize();

  const headerRef = useRef<HTMLDivElement | null>(null);
  const helpRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const tableRowsRef = useRef<HTMLDivElement | null>(null);
  const [footerRef, footerHeight] = useSizeObserver();
  const [interactionRef, interactionHeight] = useSizeObserver();

  const { height: overviewHeight = 0 } = useResizeObserver({
    ref: overviewRef,
    box: "border-box",
  });

  const { height: helpHeight = 0 } = useResizeObserver({
    ref: helpRef,
    box: "border-box",
  });

  const { height: headerHeight = 0 } = useResizeObserver({
    ref: headerRef,
    box: "border-box",
  });

  const { height: tableRowsHeight = 0 } = useResizeObserver({
    ref: tableRowsRef,
    box: "border-box",
  });

  const maxHeight = useMemo(
    () =>
      `calc(100vh - ${
        overviewHeight +
        headerHeight +
        footerHeight +
        helpHeight +
        tableRowsHeight +
        1
      }px)`,
    [headerHeight, footerHeight, overviewHeight, helpHeight, tableRowsHeight]
  );
  const mobileView = useMemo(() => width < 640, [width]);
  const { browserAccountPresent, extensionAccountPresent } =
    useConnectWalletProvider();

  const { isLoading } = useEpochs();

  return (
    <div
      className="flex flex-1 flex-col bg-backgroundBase h-full"
      vaul-drawer-wrapper=""
    >
      <Header ref={headerRef} />
      <main
        className="flex flex-1 overflow-hidden border-x border-secondary-base w-full max-w-[1920px] m-auto"
        style={{
          paddingBottom: mobileView
            ? `${interactionHeight}px`
            : `${footerHeight}px`,
        }}
      >
        <Tabs
          defaultValue={fakeData[1].id.toString()}
          value={tab}
          onValueChange={setTab}
        >
          <div className="flex-1 flex flex-col">
            <div ref={overviewRef} className="flex flex-col">
              <div className="flex items-end justify-between gap-4 px-4 pt-6 pb-4 border-b border-secondary-base flex-wrap">
                <Typography.Text bold size="lg">
                  Rewards
                </Typography.Text>
                <RiInformation2Line className="w-6 h-6 text-primary" />
              </div>
              <div className="flex max-md:flex-col md:items-center border-b border-primary w-full">
                <HoverCard>
                  <HoverCard.Trigger className="cursor-pointer h-full transition-colors duration-300 hover:bg-level-0">
                    <div className="flex items-center gap-2 px-4 py-2 h-full">
                      <RiInformation2Line className="w-3 h-3 text-primary" />
                      <Typography.Paragraph className="whitespace-nowrap">
                        Period (Epoch)
                      </Typography.Paragraph>
                    </div>
                  </HoverCard.Trigger>
                  <HoverCard.Content>
                    <Info />
                  </HoverCard.Content>
                </HoverCard>
                <Tabs.List className="w-full max-md:border-t border-primary">
                  {isLoading ? (
                    <Skeleton
                      loading
                      className="h-[5.5rem] w-[33%] flex-none"
                    />
                  ) : (
                    <Carousel
                      options={{ align: "start" }}
                      className="mx-8 max-md:w-full md:w-fit "
                    >
                      <Carousel.Content className="gap-2">
                        {fakeData.map((value, i) => {
                          const active = value.id.toString() === tab;
                          return (
                            <Carousel.Item
                              key={value.id}
                              className="max-md:px-3 max-md:py-4 md:p-5 basis-1/2 md:basis-1/3"
                            >
                              <Tabs.Trigger
                                value={value.id.toString()}
                                key={value.id}
                              >
                                <HoverCard defaultOpen={i === 2}>
                                  <HoverCard.Trigger>
                                    <div className="flex flex-col items-start">
                                      <Typography.Text
                                        bold
                                        appearance={
                                          active ? "primary-base" : "primary"
                                        }
                                      >
                                        {value.from} - {value.to}
                                      </Typography.Text>
                                      <Typography.Text appearance="secondary">
                                        {value.type}
                                      </Typography.Text>
                                    </div>
                                  </HoverCard.Trigger>
                                  <HoverCard.Content side="top">
                                    {value.epoch}
                                  </HoverCard.Content>
                                </HoverCard>
                              </Tabs.Trigger>
                            </Carousel.Item>
                          );
                        })}
                      </Carousel.Content>
                      <Carousel.Previous
                        className="h-full w-8 -left-8 border-x border-primary"
                        variant="light"
                        appearance="secondary"
                      >
                        <RiArrowLeftSLine className="w-full h-full" />
                      </Carousel.Previous>
                      <Carousel.Next
                        className="h-full w-8 -right-8 border-x border-primary"
                        variant="light"
                        appearance="secondary"
                      >
                        <RiArrowRightSLine className="w-full h-full" />
                      </Carousel.Next>
                    </Carousel>
                  )}
                </Tabs.List>
              </div>
            </div>
            {fakeData.map((value) => (
              <Tabs.Content
                key={value.id}
                value={value.id.toString()}
                className="flex flex-col flex-1"
              >
                <Table ref={tableRowsRef} maxHeight={maxHeight} />
              </Tabs.Content>
            ))}
            <Help ref={helpRef} />
          </div>
        </Tabs>
      </main>
      {mobileView ? (
        (browserAccountPresent || extensionAccountPresent) && (
          <Fragment>
            <div
              ref={interactionRef}
              className="flex flex-col gap-4 bg-level-1 border-t border-primary py-3 px-2 fixed bottom-0 left-0 w-full"
            >
              <ResponsiveProfile
                extensionAccountPresent={extensionAccountPresent}
                browserAccountPresent={browserAccountPresent}
              />
            </div>
          </Fragment>
        )
      ) : (
        <Footer ref={footerRef} />
      )}
    </div>
  );
}

const fakeData = [
  {
    id: 2,
    from: "25 Jan",
    to: "21 Feb",
    epoch: "Ended",
    type: "Previous period",
  },
  {
    id: 1,
    from: "22 Feb",
    to: "20 Mar",
    epoch: "Ended",
    type: "Current period",
  },
  {
    id: 3,
    from: "21 Mar",
    to: "10 Apr",
    epoch: "20 days 2 hours 50 mins",
    type: "Next period",
  },
  {
    id: 4,
    from: "21 Mar",
    to: "10 Apr",
    epoch: "50 days 1 hours 10 mins",
    type: "Next period",
  },
];
