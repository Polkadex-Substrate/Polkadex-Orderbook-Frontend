import { useState } from "react";

import DropdownItem from "../../molecules/DropdownItem";
import Checkbox from "../../molecules/Checkbox";
import OrderHistory from "../../molecules/OrderHistory";
import TradeHistory from "../../molecules/TradeHistory";
import { DropdownContent, DropdownHeader } from "../../molecules";
import OpenOrders from "../../molecules/OpenOrders";

import * as S from "./styles";

import { Dropdown, Icon, TabContent, TabHeader, Tabs } from "@polkadex/orderbook-ui/molecules";
import { Logged } from "@polkadex/orderbook/v2/ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasUser } from "@polkadex/orderbook-modules";

const initialFilters = {
  hiddenPairs: false,
  onlyBuy: false,
  onlySell: false,
  status: "All Transactions",
};

const initialState = ["All Transactions", "Pending", "Completed", "Canceled"];

const Transactions = () => {
  const [filters, setFilters] = useState(initialFilters);
  const userLoggedIn = useReduxSelector(selectHasUser);

  // Filters Actions
  const handleChangeHidden = () =>
    setFilters({ ...filters, hiddenPairs: !filters.hiddenPairs });

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
              action={handleChangeHidden}
            />
            <S.ContainerActions>
              <Checkbox
                title="Buy"
                checked={filters.onlyBuy}
                action={() => console.log("...")}
              />
              <Checkbox
                title="Sell"
                checked={filters.onlySell}
                action={() => console.log("...")}
              />
            </S.ContainerActions>
            <S.ContainerTransactions>
              <Dropdown
                header={<DropdownHeader>{filters.status} </DropdownHeader>}
                direction="bottom"
                isClickable>
                <DropdownContent>
                  {initialState.map((status) => (
                    <DropdownItem
                      key={status}
                      title={status}
                      handleAction={() => console.log("...")}
                    />
                  ))}
                </DropdownContent>
              </Dropdown>
              <Icon
                name="Calendar"
                stroke="text"
                background="secondaryBackground"
                color="secondaryBackground"
                size="extraMedium"
                style={{ marginLeft: 10 }}
              />
            </S.ContainerTransactions>
          </S.WrapperActions>
        </S.Header>
        {userLoggedIn ? (
          <S.Content>
            <TabContent>
              <OpenOrders />
            </TabContent>
            <TabContent>
              <OrderHistory />
            </TabContent>
            <TabContent>
              <TradeHistory />
            </TabContent>
          </S.Content>
        ) : (
          <Logged />
        )}
      </Tabs>
    </S.Section>
  );
};

export default Transactions;
