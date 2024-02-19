"use client";

import { useMemo, useState } from "react";
import {
  DateRangePicker,
  RangeKeyDict,
  defaultStaticRanges,
} from "react-date-range";
import { Button, Tabs, GenericMessage, Checkbox, Popover } from "@polkadex/ux";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useOpenOrders } from "@orderbook/core/hooks";
import { Ifilters } from "@orderbook/core/providers/types";
import { CalendarDaysIcon } from "@heroicons/react/24/solid";
import { useSessionProvider } from "@orderbook/core/providers/user/sessionProvider";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import { OpenOrdersTable } from "./OpenOrders";
import { OrderHistoryTable } from "./OrderHistory";
import { BalancesTable } from "./Balances";
import { TradeHistoryTable } from "./TradeHistory";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import "@/styles/calendar.scss";

const initialFilters: Ifilters = {
  onlyBuy: false,
  onlySell: false,
  showReverted: false,
  status: "All Orders",
};

type Props = {
  maxHeight: string;
};

const BUY = "BUY";
const SELL = "SELL";

export const Orders = ({ maxHeight }: Props) => {
  const { dispatchUserSessionData, dateFrom, dateTo } = useSessionProvider();
  const { onToogleConnectTrading } = useSettingsProvider();
  const { openOrders } = useOpenOrders();
  const { selectedAddresses } = useProfile();
  const connected = selectedAddresses.tradeAddress.length > 0;

  const [show, setShow] = useState(true);
  const [filters, setFilters] = useState<Ifilters>(initialFilters);

  const ranges = useMemo(() => {
    return [
      {
        startDate: dateFrom,
        endDate: dateTo,
        key: "selection",
        showDateDisplay: true,
      },
    ];
  }, [dateFrom, dateTo]);

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

  const onChangeDateRange = ({
    selection: { startDate, endDate },
  }: RangeKeyDict) => {
    if (startDate && endDate) {
      dispatchUserSessionData({ dateFrom: startDate, dateTo: endDate });
    }
  };

  return (
    <Tabs defaultValue="openOrders" className="min-w-[25rem]">
      <div className="lg:flex items-center justify-between border-r border-b border-primary">
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

        {connected && show && (
          <div className="flex items-center gap-3 mx-2">
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
            <Popover>
              <Popover.Trigger>
                <CalendarDaysIcon className="w-5 h-5" />
              </Popover.Trigger>
              <Popover.Content>
                <DateRangePicker
                  ranges={ranges}
                  onChange={onChangeDateRange}
                  rangeColors={["#E6007A"]}
                  staticRanges={defaultStaticRanges}
                  inputRanges={[]}
                />
              </Popover.Content>
            </Popover>
          </div>
        )}
      </div>

      {connected ? (
        <>
          <Tabs.Content value="openOrders">
            <OpenOrdersTable filters={filters} maxHeight={maxHeight} />
          </Tabs.Content>
          <Tabs.Content value="orderHistory">
            <OrderHistoryTable filters={filters} maxHeight={maxHeight} />
          </Tabs.Content>
          <Tabs.Content value="tradeHistory">
            <TradeHistoryTable filters={filters} maxHeight={maxHeight} />
          </Tabs.Content>
          <Tabs.Content value="balances">
            <BalancesTable maxHeight={maxHeight} />
          </Tabs.Content>
        </>
      ) : (
        <GenericMessage
          title="Connect your trading account to start trading."
          illustration="ConnectAccount"
        >
          <Button.Solid onClick={() => onToogleConnectTrading()}>
            Connect Trading Account
          </Button.Solid>
        </GenericMessage>
      )}
    </Tabs>
  );
};
