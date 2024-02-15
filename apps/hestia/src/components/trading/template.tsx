"use client";

import { Fragment } from "react";
import { useMarkets } from "@orderbook/core/hooks";
import { getCurrentMarket } from "@orderbook/core/helpers";

import { AssetInfo } from "./AssetInfo";
import { Graph } from "./Graph";
import { Orderbook } from "./Orderbook";
import { Trades } from "./Trades";
import { Orders } from "./Orders";
import { PlaceOrder } from "./PlaceOrder";
import { useSizeProvider } from "./provider";

import { ConnectTradingInteraction } from "@/components/ui/ConnectWalletInteraction/connectTradingInteraction";
import { Footer, Header } from "@/components/ui";

export function Template({ id }: { id: string }) {
  const {
    footerRef,
    headerRef,
    ordersMaxHeight,
    placeOrderRef,
    tableMaxHeight,
    marketRef,
  } = useSizeProvider();

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
            <Orderbook maxHeight={tableMaxHeight as string} id={id} />
            <Trades maxHeight={tableMaxHeight as string} id={id} />
          </div>
        </div>
        <div
          ref={marketRef}
          className="flex flex-wrap border-t border-t-primary"
        >
          <Orders maxHeight={ordersMaxHeight as string} id={id} />
          <PlaceOrder ref={placeOrderRef} market={currentMarket} />
        </div>
      </main>
      <Footer ref={footerRef} marketsActive />
    </Fragment>
  );
}
