"use client";

import { useState } from "react";
import { Button, Tabs, GenericMessage, Checkbox } from "@polkadex/ux";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useOpenOrders } from "@orderbook/core/hooks";
import { Ifilters } from "@orderbook/core/providers/types";

import { OpenOrdersTable } from "./openOrders";
import { OrderHistoryTable } from "./orderHistory";
import { BalancesTable } from "./balances";
import { TradeHistoryTable } from "./tradeHistory";

const initialFilters: Ifilters = {
  onlyBuy: false,
  onlySell: false,
  showReverted: false,
  status: "All Orders",
};

type Props = {
  maxHeight: string;
  id: string;
};

const BUY = "BUY";
const SELL = "SELL";
const MAX_HEIGHT = "260px";

export const Orders = ({ id }: Props) => {
  const { openOrders } = useOpenOrders(id);
  const { selectedAddresses } = useProfile();
  const connected = selectedAddresses.tradeAddress.length > 0;

  const [show, setShow] = useState(true);
  const [filters, setFilters] = useState<Ifilters>(initialFilters);

  const onChangeFilters = (key: typeof BUY | typeof SELL) => {
    switch (key) {
      case BUY: {
        setFilters((filters) => ({ ...filters, onlyBuy: !filters.onlyBuy }));
        break;
      }
      case SELL: {
        setFilters((filters) => ({ ...filters, onlySell: !filters.onlySell }));
        break;
      }
      default: {
        break;
      }
    }
  };

  return (
    <Tabs defaultValue="openOrders" className="min-w-[25rem]">
      <div className="flex items-center justify-between">
        <Tabs.List className="px-2 py-3">
          <Tabs.Trigger value="openOrders" onClick={() => setShow(true)}>
            Open Orders({openOrders?.length || 0})
          </Tabs.Trigger>
          <Tabs.Trigger value="orderHistory" onClick={() => setShow(true)}>
            Order History
          </Tabs.Trigger>
          <Tabs.Trigger value="tradeHistory" onClick={() => setShow(true)}>
            Trade History
          </Tabs.Trigger>
          <Tabs.Trigger value="balances" onClick={() => setShow(false)}>
            Balances
          </Tabs.Trigger>
        </Tabs.List>

        {show && (
          <div className="flex justify-center items-center gap-3 mr-3">
            <Checkbox.Solid
              id={BUY}
              checked={filters.onlyBuy}
              onCheckedChange={() => onChangeFilters(BUY)}
            >
              <Checkbox.Label htmlFor={BUY}>Buy</Checkbox.Label>
            </Checkbox.Solid>
            <Checkbox.Solid
              id={SELL}
              checked={filters.onlySell}
              onCheckedChange={() => onChangeFilters(SELL)}
            >
              <Checkbox.Label htmlFor={SELL}>Sell</Checkbox.Label>
            </Checkbox.Solid>
          </div>
        )}
      </div>

      {connected ? (
        <>
          <Tabs.Content value="openOrders">
            <OpenOrdersTable
              filters={filters}
              market={id}
              maxHeight={MAX_HEIGHT}
            />
          </Tabs.Content>
          <Tabs.Content value="orderHistory">
            <OrderHistoryTable market={id} maxHeight={MAX_HEIGHT} />
          </Tabs.Content>
          <Tabs.Content value="tradeHistory">
            <TradeHistoryTable market={id} maxHeight={MAX_HEIGHT} />
          </Tabs.Content>
          <Tabs.Content value="balances">
            <BalancesTable maxHeight={MAX_HEIGHT} />
          </Tabs.Content>
        </>
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
