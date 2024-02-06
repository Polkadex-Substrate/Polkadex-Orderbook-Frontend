"use client";

import { Button, Dropdown, Tabs, GenericMessage } from "@polkadex/ux";
import { Fragment } from "react";
import { EllipsisVerticalIcon } from "@heroicons/react/24/outline";

import { Table } from "./table";

export const Orders = ({ maxHeight }: { maxHeight: string }) => {
  const connected = false;
  return (
    <Tabs defaultValue="openOrders" className="min-w-[25rem]">
      <div className="flex items-center justify-between ">
        <Tabs.List className="px-2 py-3">
          <Tabs.Trigger value="openOrders">Open Orders(0)</Tabs.Trigger>
          <Tabs.Trigger value="orderHistory">Order History</Tabs.Trigger>
          <Tabs.Trigger value="tradeHistory">Trade History</Tabs.Trigger>
          <Tabs.Trigger value="balances" disabled>
            Balances
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

      {connected ? (
        <Fragment>
          <Tabs.Content
            value="openOrders"
            className="flex-1"
            style={{ maxHeight }}
          >
            <Table />
          </Tabs.Content>
        </Fragment>
      ) : (
        <GenericMessage
          title="Connect your trading account to start trading."
          illustration="ConnectAccount"
        >
          <Button.Solid>Connect Wallet</Button.Solid>
        </GenericMessage>
      )}
    </Tabs>
  );
};
