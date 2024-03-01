"use client";

import { Typography, Input } from "@polkadex/ux";
import { useResizeObserver, useWindowSize } from "usehooks-ts";
import { useMemo, useRef } from "react";
import { RiInformation2Line } from "@remixicon/react";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ResponsiveProfile } from "../ui/Header/Profile/responsiveProfile";

import { Table } from "./Table";
import { Help } from "./Help";

import { Footer, Header } from "@/components/ui";

export function Template() {
  const { width } = useWindowSize();

  const footerRef = useRef<HTMLDivElement | null>(null);
  const headerRef = useRef<HTMLDivElement | null>(null);
  const helpRef = useRef<HTMLDivElement | null>(null);
  const overviewRef = useRef<HTMLDivElement | null>(null);
  const interactionRef = useRef<HTMLDivElement | null>(null);
  const tableRowsRef = useRef<HTMLDivElement | null>(null);

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

  const { height: footerHeight = 0 } = useResizeObserver({
    ref: footerRef,
    box: "border-box",
  });

  const { height: interactionHeight = 0 } = useResizeObserver({
    ref: interactionRef,
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
  return (
    <div
      className="flex flex-1 flex-col bg-backgroundBase h-full"
      vaul-drawer-wrapper=""
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
            <div className="flex items-end justify-between gap-4 px-4 pt-6 pb-4  border-b border-secondary-base flex-wrap">
              <Typography.Text bold size="lg">
                Rewards
              </Typography.Text>
              <RiInformation2Line className="w-6 h-6 text-primary" />
            </div>
            <div className="flex items-center justify-between gap-2 border-b border-primary px-4 w-full p-2">
              <Typography.Text appearance="primary" bold>
                Markets (5)
              </Typography.Text>
              <div>
                <Input.Search placeholder="Search markets.." />
              </div>
            </div>
          </div>
          <Table ref={tableRowsRef} maxHeight={maxHeight} />
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
      <Footer ref={footerRef} />
    </div>
  );
}
