import { useState } from "react";

import DropdownItem from "../../molecules/DropdownItem";
import Checkbox from "../../molecules/Checkbox";
import OrderHistory from "../../molecules/OrderHistory";
import TradeHistory from "../../molecules/TradeHistory";
import { DropdownContent, DropdownHeader } from "../../molecules";

import * as S from "./styles";

import { Dropdown, Icon, TabContent, TabHeader, Tabs } from "@polkadex/orderbook-ui/molecules";
import { EmptyData, Logged } from "@polkadex/orderbook/v2/ui/molecules";
import { useOrderHistory } from "@polkadex/orderbook/v2/hooks";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";

const initialFilters = {
  hiddenPairs: false,
  onlyBuy: false,
  onlySell: false,
  status: "All Transactions",
};

const initialState = ["All Transactions", "Pending", "Completed", "Canceled"];

const Transactions = ({ data, remove, pair = "DOT" }) => {
  const [filters, setFilters] = useState(initialFilters);

  // Filters Actions
  const handleChangeHidden = () =>
    setFilters({ ...filters, hiddenPairs: !filters.hiddenPairs });

  const { priceFixed, amountFixed, orders, userLoggedIn, trades } = useOrderHistory();
  const getAsset = useReduxSelector(selectGetAsset);

  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <S.HeaderContent>
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
              {orders?.length ? (
                <OrderHistory
                  getAsset={getAsset}
                  priceFixed={priceFixed}
                  amountFixed={amountFixed}
                  orders={orders}
                />
              ) : (
                <EmptyData />
              )}
            </TabContent>
            <TabContent>
              {trades?.length ? (
                <TradeHistory
                  getAsset={getAsset}
                  priceFixed={priceFixed}
                  amountFixed={amountFixed}
                  orders={orders}
                />
              ) : (
                <EmptyData />
              )}
            </TabContent>
            {/* <TabPanel>
          <TransactionTable data={data} />
        </TabPanel>
        <TabPanel>
          <TransactionTable data={data} />
        </TabPanel>
        <TabPanel>
          <TransactionTable data={data} />
        </TabPanel> */}
          </S.Content>
        ) : (
          <Logged />
        )}
      </Tabs>
    </S.Section>
  );
};

export default Transactions;
