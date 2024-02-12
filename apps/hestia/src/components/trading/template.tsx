"use client";

import { Fragment, useMemo } from "react";
import { useElementSize } from "usehooks-ts";
import { useMarkets } from "@orderbook/core/hooks";
import { getCurrentMarket } from "@orderbook/core/helpers";

import { ConnectTradingInteraction } from "../ui/ConnectWalletInteraction/connectTradingInteraction";

import { AssetInfo } from "./AssetInfo";
import { Graph } from "./Graph";
import { Orderbook } from "./Orderbook";
import { Trades } from "./Trades";
import { Orders } from "./Orders";
import { PlaceOrder } from "./PlaceOrder";

import { Footer, Header } from "@/components/ui";
import { useSizeObserver } from "@/hooks";

export function Template({ id }: { id: string }) {
  const [headerRef, { height: headerHeight }] = useElementSize();
  const [footerRef, { height: footerHeight }] = useElementSize();
  const [marketRef, marketHeight] = useSizeObserver();
  const [placeOrderRef, placeOrderHeight] = useSizeObserver();

  const maxHeight = useMemo(
    () => `calc(100vh - ${marketHeight + headerHeight + footerHeight + 1}px)`,
    [headerHeight, footerHeight, marketHeight]
  );

  const ordersSize = useMemo(() => `${placeOrderHeight}px`, [placeOrderHeight]);

  const { list } = useMarkets();

  const currentMarket = getCurrentMarket(list, id);
  return (
    <Fragment>
      <ConnectTradingInteraction />
      <Header ref={headerRef} />
      <main className="flex flex-1 flex-col overflow-auto">
        <div className="flex flex-1 flex-wrap">
          <div className="flex flex-col flex-grow border-r border-primary min-h-[26rem]">
            <AssetInfo currentMarket={currentMarket} />
            <Graph id={id} />
          </div>
          <div className="flex min-h-[22rem] flex-1 max-md:flex-wrap">
            <Orderbook maxHeight={maxHeight} id={id} />
            <Trades maxHeight={maxHeight} id={id} />
          </div>
        </div>
        <div
          ref={marketRef}
          className="flex flex-wrap border-t border-t-primary"
        >
          <Orders maxHeight={ordersSize} id={id} />
          <PlaceOrder ref={placeOrderRef} />
        </div>
      </main>
      <Footer ref={footerRef} marketsActive />
    </Fragment>
  );
}
