import { DateRangePicker, defaultStaticRanges } from "react-date-range";
import subDays from "date-fns/subDays";
import { useCallback, useMemo, useRef, useState } from "react";
import { useDispatch } from "react-redux";

import DropdownItem from "../../molecules/DropdownItem";
import Checkbox from "../../molecules/Checkbox";
import OrderHistory from "../../molecules/OrderHistory";
import TradeHistory from "../../molecules/TradeHistory";
import { DropdownContent, DropdownHeader } from "../../molecules";
import OpenOrders from "../../molecules/OpenOrders";
import Funds from "../../molecules/Funds";

import * as S from "./styles";

import {
  Dropdown,
  Icon,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
} from "@polkadex/orderbook-ui/molecules";
import { Logged } from "@polkadex/orderbook/v2/ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasCurrentTradeAccount, userSessionData } from "@polkadex/orderbook-modules";

import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";

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
  const now = useRef(new Date());

  const [filters, setFilters] = useState(initialFilters);
  const [to, setTo] = useState(now.current);
  const [from, setFrom] = useState(subDays(now.current, 7));

  const userLoggedIn = useReduxSelector(selectHasCurrentTradeAccount);

  // Filters Actions
  const handleChangeHidden = (type: "hiddenPairs" | "onlyBuy" | "onlySell") =>
    setFilters({ ...filters, [type]: !filters[type] });

  const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
    setFrom(startDate);
    setTo(endDate);
    dispatch(userSessionData({ dateFrom: startDate, dateTo: endDate }));
  }, []);

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
          <S.HeaderContent>
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
        {userLoggedIn ? (
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
        ) : (
          <Logged />
        )}
      </Tabs>
    </S.Section>
  );
};
export const TransactionsSkeleton = () => (
  <Skeleton height="100%" width="100%" minWidth="350px" />
);

export default Transactions;
