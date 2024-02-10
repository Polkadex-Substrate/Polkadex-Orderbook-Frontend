"use client";
import { forwardRef, useEffect, useState } from "react";
import { Tabs } from "@polkadex/ux";
import { Market } from "@orderbook/core/utils/orderbookService/types";
import { tryUnlockTradeAccount } from "@orderbook/core/helpers";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

import { LimitOrder } from "./limitOrder";
import { MarketOrder } from "./marketOrder";

type Props = { market?: Market };

// TODO: Account unlocking functionality

export const PlaceOrder = forwardRef<HTMLDivElement, Props>(
  ({ market }, ref) => {
    const [isPasswordProtected, setIsPasswordProtected] = useState(false);
    const { selectedAccount } = useConnectWalletProvider();

    useEffect(() => {
      tryUnlockTradeAccount(selectedAccount);
      setIsPasswordProtected(Boolean(selectedAccount?.isLocked));
    }, [selectedAccount]);

    return (
      <Tabs defaultValue="limit">
        <div className="flex items-center justify-between border-b border-primary">
          <Tabs.List className="px-2 py-3">
            <Tabs.Trigger value="limit">Limit</Tabs.Trigger>
            <Tabs.Trigger value="market">Market</Tabs.Trigger>
            <Tabs.Trigger value="stopLimit" disabled>
              Stop Limit
            </Tabs.Trigger>
          </Tabs.List>
        </div>

        <div ref={ref} className="min-h-[18rem]">
          <Tabs.Content
            value="limit"
            id="placeOrderContent"
            className="flex flex-1 flex-col gap-1 border-l border-l-primary bg-level-0 p-2"
          >
            <LimitOrder market={market} />
          </Tabs.Content>
          <Tabs.Content
            value="market"
            id="placeOrderContent"
            className="flex flex-1 flex-col gap-1 border-l border-l-primary bg-level-0 p-2"
          >
            <MarketOrder market={market} />
          </Tabs.Content>
        </div>
      </Tabs>
    );
  }
);
PlaceOrder.displayName = "PlaceOrder";
