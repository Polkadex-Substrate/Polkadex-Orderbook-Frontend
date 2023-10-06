import {
  DateRangePicker,
  RangeKeyDict,
  defaultStaticRanges,
} from "react-date-range";
import { useCallback, useMemo, useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
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
import { useOrderHistoryProvider } from "@orderbook/core/providers/user/orderHistoryProvider";
import { useSessionProvider } from "@orderbook/core/providers/user/sessionProvider";

import * as S from "./styles";

export type Ifilters = {
  hiddenPairs: boolean;
  onlyBuy: boolean;
  onlySell: boolean;
  showReverted: boolean;
  status: "All Transactions" | "Pending" | "Completed" | "Cancelled";
  dateFrom?: Date;
  dateTo?: Date;
};

const initialFilters: Ifilters = {
  hiddenPairs: false,
  onlyBuy: false,
  onlySell: false,
  showReverted: false,
  status: "All Transactions",
};

export const Transactions = () => {
  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`transactions.${key}`);

  const initialState = [
    t("allTransactions"),
    t("pending"),
    t("completed"),
    t("cancelled"),
  ];

  const [filters, setFilters] = useState(initialFilters);
  const [trigger, setTrigger] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransactionDropdownVisible, setTransactionDropdownVisible] =
    useState(true);

  const orderHistory = useOrderHistoryProvider();
  const { filterOrders } = orderHistory;
  const userSession = useSessionProvider();
  const { dispatchUserSessionData } = userSession;

  // Filters Actions
  const handleChangeHidden = (
    type: "hiddenPairs" | "onlyBuy" | "onlySell" | "showReverted"
  ) => {
    setFilters({ ...filters, [type]: !filters[type] });
  };
  const handleActionDropdown = (status: string) => {
    setFilters({ ...filters, status: status as Ifilters["status"] });
  };
  const handleRangeChange = useCallback(
    (dateFrom: Date, dateTo: Date) => {
      setFilters((prevFilters) => ({ ...prevFilters, dateFrom, dateTo }));
    },
    [setFilters]
  );

  useEffect(() => {
    filterOrders(filters);
  }, [filterOrders, filters]);

  const handleSelect = useCallback(
    ({ selection: { startDate, endDate } }: RangeKeyDict) => {
      if (startDate && endDate) {
        handleRangeChange(startDate, endDate);
        dispatchUserSessionData({ dateFrom: startDate, dateTo: endDate });
      }
    },
    [dispatchUserSessionData, handleRangeChange]
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
            }}
          >
            <TabHeader>
              <S.TabHeader>{t("openOrders")}</S.TabHeader>
            </TabHeader>
            <TabHeader>
              <S.TabHeader>{t("orderHistory")}</S.TabHeader>
            </TabHeader>
            <TabHeader>
              <S.TabHeader>{t("tradeHistory")}</S.TabHeader>
            </TabHeader>
            <TabHeader>
              <S.TabHeader>{t("funds")}</S.TabHeader>
            </TabHeader>
          </S.HeaderContent>
          {isVisible && (
            <S.WrapperActions>
              <Checkbox
                checked={filters.showReverted}
                onChange={() => handleChangeHidden("showReverted")}
              >
                {t("showReverted")}
              </Checkbox>
              <Checkbox
                checked={filters.hiddenPairs}
                onChange={() => handleChangeHidden("hiddenPairs")}
              >
                {t("hideOtherPairs")}
              </Checkbox>
              <S.Flex>
                <S.ContainerActions>
                  <Checkbox
                    checked={filters.onlyBuy}
                    onChange={() => handleChangeHidden("onlyBuy")}
                  >
                    {t("buy")}
                  </Checkbox>
                  <Checkbox
                    checked={filters.onlySell}
                    onChange={() => handleChangeHidden("onlySell")}
                  >
                    {t("sell")}
                  </Checkbox>
                </S.ContainerActions>
                <S.ContainerTransactions>
                  {isTransactionDropdownVisible && (
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
                          <Dropdown.Item
                            key={status}
                            onAction={() => handleActionDropdown(status)}
                          >
                            {status}
                          </Dropdown.Item>
                        ))}
                      </Dropdown.Menu>
                    </Dropdown>
                  )}
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
            <TradeHistory
              onHideTransactionDropdown={(v: boolean) =>
                setTransactionDropdownVisible(v)
              }
              filters={filters}
            />
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
