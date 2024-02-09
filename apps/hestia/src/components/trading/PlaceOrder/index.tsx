"use client";
import { forwardRef } from "react";
import { Tabs } from "@polkadex/ux";

import { LimitOrder } from "./limitOrder";
import { MarketOrder } from "./marketOrder";

export const PlaceOrder = forwardRef<HTMLDivElement>((_, ref) => {
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
          <LimitOrder />
        </Tabs.Content>
        <Tabs.Content
          value="market"
          id="placeOrderContent"
          className="flex flex-1 flex-col gap-1 border-l border-l-primary bg-level-0 p-2"
        >
          <MarketOrder />
        </Tabs.Content>
      </div>
    </Tabs>
  );
});
PlaceOrder.displayName = "PlaceOrder";
