"use client";

import { Fragment, useMemo } from "react";
import { useMarkets } from "@orderbook/core/hooks";
import { getCurrentMarket } from "@orderbook/core/helpers";
import classNames from "classnames";
import { useWindowSize } from "react-use";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { ResponsiveProfile } from "../ui/Header/Profile/responsiveProfile";

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
  const { selectedWallet, selectedAccount } = useConnectWalletProvider();

  // Move to useConnectWalletProvider
  const tradingWalletPresent = useMemo(
    () => !!Object.keys(selectedAccount ?? {})?.length,
    [selectedAccount]
  );

  const fundWalletPresent = useMemo(
    () => !!Object.keys(selectedWallet ?? {})?.length,
    [selectedWallet]
  );
  const { width } = useWindowSize();

  const { list } = useMarkets();
  const currentMarket = getCurrentMarket(list, id);
  const responsiveView = useMemo(() => width < 640, [width]);

  return (
    <Fragment>
      <ConnectTradingInteraction />
      <Header ref={headerRef} />
      <main
        className={classNames(
          "overflow-auto flex-1",
          "grid grid-cols-1",
          "1xl:grid-cols-5 xl:grid-cols-4 lg:grid-cols-4 md:grid-cols-1"
        )}
      >
        <div
          className={classNames(
            "max-xl:min-h-96",
            "1xl:col-span-3 xl:col-span-2 lg:col-span-3"
          )}
        >
          <div className="flex flex-col flex-grow border-r border-primary h-full w-full">
            <AssetInfo currentMarket={currentMarket} />
            <Graph id={id} />
          </div>
        </div>
        <div
          className={classNames(
            "max-xl:min-h-96 flex flex-col",
            "1xl:col-span-1 xl:col-span-1 lg:col-span-1"
          )}
        >
          <Orderbook maxHeight={tableMaxHeight as string} id={id} />
        </div>
        <div
          className={classNames(
            "1xl:col-span-1 xl:col-span-1 lg:col-span-1",
            "max-1xl:border-t max-1xl:border-x max-1xl:border-primary max-xl:min-h-96"
          )}
        >
          <Trades maxHeight={tableMaxHeight as string} id={id} />
        </div>
        <div
          className={classNames(
            "1xl:col-span-3 xl:col-span-2 lg:col-span-3",
            "h-full flex flex-1 border-t border-primary border-r"
          )}
        >
          <Orders maxHeight={ordersMaxHeight as string} />
        </div>
        <div
          ref={marketRef}
          className={classNames(
            "1xl:col-span-2 xl:col-span-2 lg:col-span-4",
            "flex flex-1 border-t border-primary"
          )}
        >
          <PlaceOrder ref={placeOrderRef} market={currentMarket} />
        </div>
      </main>
      {responsiveView && (tradingWalletPresent || fundWalletPresent) ? (
        <ResponsiveProfile />
      ) : (
        <Footer ref={footerRef} marketsActive />
      )}
    </Fragment>
  );
}
