import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import subDays from "date-fns/subDays";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

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
  usePanelState,
  useTabState,
} from "@polkadex/orderbook-ui/molecules";
// eslint-disable-next-line import/order
import {
  selectBrowserTradeAccounts,
  selectUserAccounts,
  userSessionData,
} from "@polkadex/orderbook-modules";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import {
  Funds,
  OpenOrders,
  OrderHistory,
  TradeHistory,
} from "@polkadex/orderbook-ui/organisms";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useOrderHistory, useReduxSelector } from "@polkadex/orderbook-hooks";
import { IUserTradeAccount } from "@polkadex/orderbook/hooks/types";

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
const initialStateTradingAccounts = ["All Trading Accounts", "crazy geek", "baddest tester"];

export const Transactions = () => {
  const dispatch = useDispatch();
  const browserTradeAccounts = useReduxSelector(selectBrowserTradeAccounts);
  const allAccounts = useReduxSelector(selectUserAccounts);
  const now = new Date();
  const [filters, setFilters] = useState(initialFilters);
  const [to, setTo] = useState(now);
  const [from, setFrom] = useState(subDays(now, 7));
  const [trigger, setTrigger] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const tradeAccounts = useMemo(
    () =>
      allAccounts?.map(({ tradeAddress }): IUserTradeAccount => {
        const account = browserTradeAccounts.find(({ address }) => address === tradeAddress);
        if (account) {
          return {
            address: tradeAddress,
            isPresentInBrowser: true,
            account: account,
          };
        } else {
          return {
            address: tradeAddress,
            isPresentInBrowser: false,
          };
        }
      }),
    [allAccounts, browserTradeAccounts]
  );

  const orderHistory = useOrderHistory(filters);
  // Filters Actions
  const handleChangeHidden = (type: "hiddenPairs" | "onlyBuy" | "onlySell") =>
    setFilters({ ...filters, [type]: !filters[type] });

  const handleSelect = useCallback(
    ({ selection: { startDate, endDate } }) => {
      setFrom(startDate);
      setTo(endDate);
      dispatch(userSessionData({ dateFrom: startDate, dateTo: endDate }));
    },
    [dispatch]
  );

  // GET CURRENT DATA WHEN TAB IS SWITCHED
  useEffect(() => {
    const now = new Date();
    dispatch(userSessionData({ dateFrom: subDays(now, 7), dateTo: now }));
  }, [trigger]);

  const ranges = useMemo(() => {
    return [
      {
        startDate: from,
        endDate: to,
        key: "selection",
      },
    ];
  }, [from, to]);
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
                    <Dropdown.Menu>
                      {initialState.map((status) => (
                        <Dropdown.Item key={status}>{status}</Dropdown.Item>
                      ))}
                    </Dropdown.Menu>
                  </Dropdown>
                  {tradeAccounts.length ? (
                    <div style={{ marginLeft: 10 }}>
                      <Dropdown>
                        <Dropdown.Trigger>
                          <S.Icon>
                            {"Trading accounts"}
                            <div>
                              <Icons.ArrowBottom />
                            </div>
                          </S.Icon>
                        </Dropdown.Trigger>
                        <Dropdown.Menu>
                          {tradeAccounts.map((tradeAcc) => (
                            <Dropdown.Item key={tradeAcc.address}>
                              {tradeAcc?.account?.meta?.name}
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  ) : null}
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
