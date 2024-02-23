"use client";

import { Fragment } from "react";
import { useMarkets } from "@orderbook/core/hooks";
import { getCurrentMarket } from "@orderbook/core/helpers";
import classNames from "classnames";

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
      <main
        className={classNames(
          "overflow-auto flex-1",
          "grid grid-cols-1",
          "1xl:grid-cols-5 lg:grid-cols-4 md:grid-cols-1"
        )}
      >
        <div
          className={classNames(
            "1xl:min-h-52",
            "1xl:col-span-3 lg:col-span-3 max-1xl:min-h-96"
          )}
        >
          <div className="flex flex-col flex-grow border-r border-primary h-full w-full">
            <AssetInfo currentMarket={currentMarket} />
            <Graph id={id} />
          </div>
        </div>
        <div
          className={classNames(
            "max-1xl:min-h-96 flex flex-col",
            "1xl:col-span-1 lg:col-span-1"
          )}
        >
          <Orderbook maxHeight={tableMaxHeight as string} id={id} />
        </div>
        <div
          className={classNames(
            "1xl:col-span-1 lg:col-span-1",
            "max-1xl:border-t max-1xl:border-x max-1xl:border-primary max-1xl:max-h-80"
          )}
        >
          <Trades maxHeight={tableMaxHeight as string} id={id} />
        </div>
        <div
          className={classNames(
            "1xl:col-span-3 lg:col-span-3 h-fit",
            "h-full flex flex-1 border-t border-primary border-r max-1xl:max-h-80"
          )}
        >
          <Orders maxHeight={ordersMaxHeight as string} />
        </div>
        <div
          ref={marketRef}
          className={classNames(
            "1xl:col-span-2 lg:col-span-4",
            "flex flex-1 border-t border-primary"
          )}
        >
          <PlaceOrder ref={placeOrderRef} market={currentMarket} />
        </div>
      </main>
      <Footer ref={footerRef} marketsActive />
    </Fragment>
  );
}
