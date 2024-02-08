"use client";
import { forwardRef } from "react";
import { Dropdown, Tabs } from "@polkadex/ux";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { Form } from "./form";

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
        <Dropdown>
          <Dropdown.Trigger>
            <div className="flex justify-center items-center w-[1.8rem] h-[1.8rem] p-[0.25rem] hover:bg-level-1 transition-colors duration-300 rounded opacity-100">
              <EllipsisVerticalIcon />
            </div>
          </Dropdown.Trigger>
          <Dropdown.Content>
            {["Example1", "Example2"].map((value, i) => (
              <Dropdown.Item key={i} onClick={() => window.alert("Changing.")}>
                {value}
              </Dropdown.Item>
            ))}
          </Dropdown.Content>
        </Dropdown>
      </div>

      <div ref={ref}>
        <Tabs.Content
          value="limit"
          id="placeOrderContent"
          className="flex flex-1 flex-col gap-1 border-l border-l-primary bg-level-0 p-2"
        >
          <Form />
        </Tabs.Content>
      </div>
    </Tabs>
  );
});
PlaceOrder.displayName = "PlaceOrder";
