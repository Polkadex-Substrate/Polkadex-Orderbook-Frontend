"use client";

import { Fragment, useMemo, useRef } from "react";
import { useMarkets } from "@orderbook/core/hooks";
import { getCurrentMarket } from "@orderbook/core/helpers";
import { useWindowSize } from "react-use";
import classNames from "classnames";
import { useResizeObserver } from "usehooks-ts";

import { Resizable, ImperativePanelHandle } from "../ui/Temp/resizable";

import { AssetInfo } from "./AssetInfo";
import { Orderbook } from "./Orderbook";
import { Trades } from "./Trades";
import { Orders } from "./Orders";
import { PlaceOrder } from "./PlaceOrder";
import { Graph } from "./Graph";
import { ResponsiveInteraction } from "./PlaceOrder/responsiveInteraction";
import { Responsive } from "./responsive";

import { ConnectTradingInteraction } from "@/components/ui/ConnectWalletInteraction/connectTradingInteraction";
import { Footer, Header } from "@/components/ui";

export function Template({ id }: { id: string }) {
  const footerRef = useRef<HTMLDivElement | null>(null);
  const interactionRef = useRef<HTMLDivElement | null>(null);

  const { height: footerHeight = 0 } = useResizeObserver({
    ref: footerRef,
    box: "border-box",
  });
  const { height: interactionHeight = 0 } = useResizeObserver({
    ref: interactionRef,
    box: "border-box",
  });
  const mainPanelRef = useRef<ImperativePanelHandle>(null);
  const orderbookPanelRef = useRef<ImperativePanelHandle>(null);

  const { width } = useWindowSize();

  const { list } = useMarkets();
  const currentMarket = getCurrentMarket(list, id);

  const mobileView = useMemo(() => width < 640, [width]);
  const desktopView = useMemo(() => width >= 1280, [width]);

  return (
    <Fragment>
      <ConnectTradingInteraction />
      <Header />
      {mobileView ? (
        <div
          className="flex flex-col h-full min-h-screen"
          style={{
            paddingBottom: `${interactionHeight}px`,
          }}
        >
          <Responsive id={id} />
          <Orders />
        </div>
      ) : (
        <Resizable
          direction="vertical"
          className="flex-1 h-full"
          vaul-drawer-wrapper=""
          style={{
            paddingBottom: `${footerHeight}px`,
          }}
        >
          <Resizable.Panel
            ref={mainPanelRef}
            defaultSize={80}
            minSize={50}
            className="flex min-h-[500px]"
          >
            <Resizable direction="horizontal">
              <Resizable.Panel minSize={40}>
                <div className="flex flex-col flex-grow h-full w-full">
                  <AssetInfo currentMarket={currentMarket} />
                  <Graph id={id} />
                </div>
              </Resizable.Panel>
              <Resizable.Handle />
              <Resizable.Panel
                ref={orderbookPanelRef}
                defaultSize={22}
                minSize={21}
                className="min-w-[280px]"
              >
                <Orderbook id={id} />
              </Resizable.Panel>
              {desktopView && (
                <Fragment>
                  <Resizable.Handle />
                  <Resizable.Panel
                    defaultSize={22}
                    minSize={21}
                    collapsible
                    collapsedSize={0}
                  >
                    <Trades id={id} />
                  </Resizable.Panel>
                </Fragment>
              )}
            </Resizable>
          </Resizable.Panel>
          <Resizable.Handle />
          <Resizable.Panel
            className={classNames(
              desktopView || mobileView ? "min-h-[310px]" : "min-h-[700px]"
            )}
          >
            <Resizable direction={desktopView ? "horizontal" : "vertical"}>
              <Resizable.Panel defaultSize={58} minSize={58}>
                <Orders />
              </Resizable.Panel>
              <Resizable.Handle />
              {!mobileView && (
                <Resizable.Panel
                  className="border-x border-primary min-h-[310px]"
                  collapsible
                  collapsedSize={0}
                  defaultValue={38}
                  minSize={38}
                >
                  <PlaceOrder market={currentMarket} />
                </Resizable.Panel>
              )}
            </Resizable>
          </Resizable.Panel>
        </Resizable>
      )}

      {mobileView && (
        <ResponsiveInteraction isResponsive={mobileView} ref={interactionRef} />
      )}
      <Footer marketsActive ref={footerRef} />
    </Fragment>
  );
}
