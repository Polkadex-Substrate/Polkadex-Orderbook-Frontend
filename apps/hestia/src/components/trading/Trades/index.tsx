"use client";

import { Dropdown, Tabs } from "@polkadex/ux";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { Markets } from "./Market";
import { RecentTrades } from "./RecentTrades";

export const Trades = ({
  maxHeight,
  id,
}: {
  maxHeight: string;
  id: string;
}) => {
  return (
    <Tabs defaultValue="markets">
      <div
        className="flex flex-1 flex-col min-w-[22rem] min-h-[25rem]"
        style={{ maxHeight }}
      >
        <div className="flex items-center justify-between border-b border-primary">
          <Tabs.List className="px-2 py-3">
            <Tabs.Trigger value="markets">Markets</Tabs.Trigger>
            <Tabs.Trigger value="recentTrades">Recent Trades</Tabs.Trigger>
          </Tabs.List>
          <Dropdown>
            <Dropdown.Trigger>
              <div className="flex justify-center items-center w-[1.8rem] h-[1.8rem] p-[0.25rem] hover:bg-level-1 transition-colors duration-300 rounded opacity-100">
                <EllipsisVerticalIcon />
              </div>
            </Dropdown.Trigger>
            <Dropdown.Content>
              {["Example1", "Example2"].map((value, i) => (
                <Dropdown.Item
                  key={i}
                  onClick={() => window.alert("Changing.")}
                >
                  {value}
                </Dropdown.Item>
              ))}
            </Dropdown.Content>
          </Dropdown>
        </div>
        <Tabs.Content
          value="markets"
          // className="flex flex-col flex-1 h-full border-t border-primary overflow-auto"
        >
          <Markets />
        </Tabs.Content>
        <Tabs.Content
          value="recentTrades"
          className="xs:min-h-[25rem] min-h-[22rem]"
        >
          <RecentTrades id={id} />
        </Tabs.Content>
      </div>
    </Tabs>
  );
};
