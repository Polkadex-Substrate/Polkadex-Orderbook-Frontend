import {
  DateRangePicker,
  RangeKeyDict,
  defaultStaticRanges,
} from "react-date-range";
import { useCallback, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import {
  Icon,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
  Checkbox,
  Popover,
  Dropdown,
  Button,
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
import { useSessionProvider } from "@orderbook/core/providers/user/sessionProvider";
import { Ifilters } from "@orderbook/core/providers/types";
import { useOrders } from "@orderbook/core/providers/user/orders";
import { useOrderHistoryProvider } from "@orderbook/core/providers/user/orderHistoryProvider";

import * as S from "./styles";

const initialFilters: Ifilters = {
  hiddenPairs: false,
  onlyBuy: false,
  onlySell: false,
  showReverted: false,
  status: "All Orders",
};

export const Transactions = () => {
  const { t: translation, "2": isReady } = useTranslation("organisms");
  const t = (key: string) => translation(`transactions.${key}`);

  const initialState = [t("allTransactions"), t("completed"), t("cancelled")];

  const [filters, setFilters] = useState(initialFilters);
  const [trigger, setTrigger] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isTransactionDropdownVisible, setTransactionDropdownVisible] =
    useState(true);

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

  const handleSelect = useCallback(
    ({ selection: { startDate, endDate } }: RangeKeyDict) => {
      if (startDate && endDate) {
        dispatchUserSessionData({ dateFrom: startDate, dateTo: endDate });
      }
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

  if (!isReady) return <></>;

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
              <CancelAllButton />
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
                </S.ContainerTransactions>
              </S.Flex>
            </S.WrapperActions>
          )}
        </S.Header>
        <S.Content>
          <TabContent>
            <OpenOrders
              filters={filters}
              onHideTransactionDropdown={(v: boolean) =>
                setTransactionDropdownVisible(v)
              }
            />
          </TabContent>
          <TabContent>
            <OrderHistory filters={filters} />
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

export const TransactionsSkeleton = () => {
  return (
    <S.SkeletonWrapper>
      <Skeleton width={"100%"} height={"5rem"} />
      <Skeleton width={"100%"} height={"5rem"} />
      <Skeleton width={"100%"} height={"5rem"} />
      <Skeleton width={"100%"} height={"5rem"} />
      <Skeleton width={"100%"} height={"5rem"} />
    </S.SkeletonWrapper>
  );
};

export const CancelAllButton = () => {
  const { openOrders, isOpenOrdersLoading } = useOrderHistoryProvider();
  const { onCancelOrder, cancel } = useOrders();
  const loading = cancel?.isLoading || isOpenOrdersLoading;

  const cancelAll = () => {
    if (loading) return;
    onCancelOrder(
      openOrders.map((order) => {
        return {
          orderId: order.id,
          base: order.m.split("-")[0],
          quote: order.m.split("-")[1],
        };
      })
    );
  };
  return (
    <Button
      disabled={loading}
      isLoading={cancel?.isLoading}
      onClick={cancelAll}
      size={"small"}
    >
      Cancel All
    </Button>
  );
};
