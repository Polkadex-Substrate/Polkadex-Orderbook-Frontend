import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import { useCallback, useMemo, useState, useEffect } from "react";

import * as S from "./styles";

import {
  Icon,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
  Checkbox,
  Popover,
  Dropdown,
} from "@polkadex/orderbook-ui/molecules";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Funds,
  OpenOrders,
  OrderHistory,
  TradeHistory,
} from "@polkadex/orderbook-ui/organisms";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useOrderHistoryProvider } from "@polkadex/orderbook/providers/user/orderHistoryProvider/useOrderHistroyProvider";
import { useSessionProvider } from "@polkadex/orderbook/providers/user/sessionProvider/useSessionProvider";

export type Ifilters = {
  hiddenPairs: boolean;
  onlyBuy: boolean;
  onlySell: boolean;
  status: string;
};

const initialFilters: Ifilters = {
  hiddenPairs: false,
  onlyBuy: false,
  onlySell: false,
  status: "All Transactions",
};

const initialState = ["All Transactions", "Pending", "Completed", "Canceled"];

export const Transactions = () => {
  const [filters, setFilters] = useState(initialFilters);
  const [trigger, setTrigger] = useState(false);
  const [isVisible, setIsVisible] = useState(true);

  const orderHistory = useOrderHistoryProvider();
  const { filterOrders } = orderHistory;
  const userSession = useSessionProvider();
  const { dispatchUserSessionData } = userSession;

  // Filters Actions
  const handleChangeHidden = (type: "hiddenPairs" | "onlyBuy" | "onlySell") => {
    setFilters({ ...filters, [type]: !filters[type] });
  };

  useEffect(() => {
    filterOrders(filters);
  }, [filterOrders, filters]);

  const handleSelect = useCallback(
    ({ selection: { startDate, endDate } }) => {
      dispatchUserSessionData({ dateFrom: startDate, dateTo: endDate });
    },
    [dispatchUserSessionData]
  );

  const ranges = useMemo(() => {
    return [
      {
        startDate: userSession.dateFrom,
        endDate: userSession.dateTo,
        key: "selection",
      },
    ];
  }, [userSession.dateFrom, userSession.dateTo]);
  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <S.HeaderContent
            onClick={() => {
              setTrigger(!trigger);
            }}>
            <TabHeader>
              <S.TabHeader>Open Orders</S.TabHeader>
            </TabHeader>
            <TabHeader>
              <S.TabHeader>Order History</S.TabHeader>
            </TabHeader>
            <TabHeader>
              <S.TabHeader>Trade History</S.TabHeader>
            </TabHeader>
            <TabHeader>
              <S.TabHeader>Funds</S.TabHeader>
            </TabHeader>
          </S.HeaderContent>
          {isVisible && (
            <S.WrapperActions>
              <Checkbox
                checked={filters.hiddenPairs}
                onChange={() => handleChangeHidden("hiddenPairs")}>
                Hide Other Pairs
              </Checkbox>
              <S.Flex>
                <S.ContainerActions>
                  <Checkbox
                    checked={filters.onlyBuy}
                    onChange={() => handleChangeHidden("onlyBuy")}>
                    Buy
                  </Checkbox>
                  <Checkbox
                    checked={filters.onlySell}
                    onChange={() => handleChangeHidden("onlySell")}>
                    Sell
                  </Checkbox>
                </S.ContainerActions>
                <S.ContainerTransactions>
                  <Dropdown>
                    <Dropdown.Trigger>
                      <S.Icon>
                        {filters.status}
                        <div>
                          <Icons.ArrowBottom />
                        </div>
                      </S.Icon>
                    </Dropdown.Trigger>
                    <Dropdown.Menu fill="secondaryBackgroundSolid">
                      {initialState.map((status) => (
                        <Dropdown.Item key={status}>{status}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  <Popover>
                    <Popover.Trigger>
                      <div>
                        <Icon
                          name="Calendar"
                          stroke="text"
                          background="secondaryBackground"
                          size="extraMedium"
                          style={{ marginLeft: 10 }}
                        />
                      </div>
                    </Popover.Trigger>
                    <Popover.Content>
                      <DateRangePicker
                        ranges={ranges}
                        onChange={handleSelect}
                        rangeColors={["#E6007A"]}
                        staticRanges={defaultStaticRanges}
                        inputRanges={[]}
                      />
                    </Popover.Content>
                  </Popover>

                  <S.Calendar></S.Calendar>
                </S.ContainerTransactions>
              </S.Flex>
            </S.WrapperActions>
          )}
        </S.Header>
        <S.Content>
          <TabContent>
            <OpenOrders orderHistory={orderHistory} />
          </TabContent>
          <TabContent>
            <OrderHistory orderHistory={orderHistory} />
          </TabContent>
          <TabContent>
            <TradeHistory filters={filters} />
          </TabContent>
          <TabContent>
            <Funds onHideFilters={(v: boolean) => setIsVisible(v)} />
          </TabContent>
        </S.Content>
      </Tabs>
    </S.Section>
  );
};
export const TransactionsSkeleton = () => (
  <Skeleton height="100%" width="100%" minWidth="350px" />
);
