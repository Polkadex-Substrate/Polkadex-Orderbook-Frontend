import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import subDays from "date-fns/subDays";
import { useCallback, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";

import Checkbox from "../../molecules/Checkbox";

import * as S from "./styles";

import {
  Dropdown,
  Icon,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
  DropdownHeader,
  DropdownContent,
} from "@polkadex/orderbook-ui/molecules";
// eslint-disable-next-line import/order
import { userSessionData } from "@polkadex/orderbook-modules";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import DropdownItem from "@polkadex/orderbook-ui/molecules/DropdownItem";
import {
  Funds,
  OpenOrders,
  OrderHistory,
  TradeHistory,
} from "@polkadex/orderbook-ui/organisms";

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

const Transactions = () => {
  const dispatch = useDispatch();
  const now = new Date();

  const [filters, setFilters] = useState(initialFilters);
  const [to, setTo] = useState(now);
  const [from, setFrom] = useState(subDays(now, 7));
  const [trigger, setTrigger] = useState(false);

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
          <S.WrapperActions>
            <Checkbox
              title="Hide Other Pairs"
              checked={filters.hiddenPairs}
              action={() => handleChangeHidden("hiddenPairs")}
            />
            <S.Flex>
              <S.ContainerActions>
                <Checkbox
                  title="Buy"
                  checked={filters.onlyBuy}
                  action={() => handleChangeHidden("onlyBuy")}
                />
                <Checkbox
                  title="Sell"
                  checked={filters.onlySell}
                  action={() => handleChangeHidden("onlySell")}
                />
              </S.ContainerActions>
              <S.ContainerTransactions>
                <Dropdown
                  header={<DropdownHeader>{filters.status} </DropdownHeader>}
                  direction="bottom"
                  isClickable>
                  <DropdownContent>
                    {initialState.map((status) => (
                      <DropdownItem key={status} title={status} handleAction={undefined} />
                    ))}
                  </DropdownContent>
                </Dropdown>
                <S.Calendar>
                  <Dropdown
                    direction="bottomRight"
                    header={
                      <Icon
                        name="Calendar"
                        stroke="text"
                        background="secondaryBackground"
                        size="extraMedium"
                        style={{ marginLeft: 10 }}
                      />
                    }>
                    <DateRangePicker
                      ranges={ranges}
                      onChange={handleSelect}
                      rangeColors={["#E6007A"]}
                      staticRanges={defaultStaticRanges}
                      inputRanges={[]}
                    />
                  </Dropdown>
                </S.Calendar>
              </S.ContainerTransactions>
            </S.Flex>
          </S.WrapperActions>
        </S.Header>
        <S.Content>
          <TabContent>
            <OpenOrders filters={filters} />
          </TabContent>
          <TabContent>
            <OrderHistory filters={filters} />
          </TabContent>
          <TabContent>
            <TradeHistory filters={filters} />
          </TabContent>
          <TabContent>
            <Funds />
          </TabContent>
        </S.Content>
      </Tabs>
    </S.Section>
  );
};
export const TransactionsSkeleton = () => (
  <Skeleton height="100%" width="100%" minWidth="350px" />
);

export default Transactions;
