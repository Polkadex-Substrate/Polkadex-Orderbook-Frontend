import { useState } from "react";

import { Flex } from "../../atoms";

import * as S from "./styles";

import {
  Icon,
  Tabs,
  TabContent,
  TabHeader,
  AvailableMessage,
} from "@polkadex/orderbook-ui/molecules";
import {
  OrderHistory,
  TradeHistory,
  TradeHistoryTable,
  OrderHistoryTable,
  Logged,
  EmptyData,
} from "@orderbook/v2/ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasUser } from "@polkadex/orderbook-modules";
import { useOrderHistory } from "@polkadex/orderbook/v2/hooks";

const MyOrders = () => {
  const [state, setState] = useState(true);
  return (
    <S.Main>
      <Tabs>
        <Header showList={state} changeToList={() => setState(!state)} />
        <Content showList={state} />
      </Tabs>
    </S.Main>
  );
};

const Header = ({ showList, changeToList }) => {
  const hasUser = useReduxSelector(selectHasUser);
  return (
    <S.Header>
      <S.HeaderWrapper>
        <S.HeaderAsideLeft>
          <ul>
            <TabHeader>
              <S.HeaderLeftLi isActive>
                <Icon name="Document" stroke="inverse" size="extraSmall" />
                Order History
              </S.HeaderLeftLi>
            </TabHeader>
            <TabHeader>
              <S.HeaderLeftLi>
                <Icon name="Time" color="inverse" size="extraSmall" />
                Trade History
              </S.HeaderLeftLi>
            </TabHeader>
          </ul>
        </S.HeaderAsideLeft>
        {hasUser && (
          <S.HeaderAsideRight>
            <ul>
              <S.HeaderRightLi onClick={changeToList} isActive={!showList}>
                <Icon
                  name={showList ? "List" : "Grid"}
                  color={showList ? "inverse" : "text"}
                  size="extraSmall"
                  style={{ padding: "0.1rem" }}
                />
              </S.HeaderRightLi>
              <AvailableMessage message="Soon">
                <Flex>
                  <S.HeaderRightLi>
                    <Icon name="Search" stroke="inverse" size="extraSmall" />
                  </S.HeaderRightLi>
                  <S.HeaderRightExpand>
                    Less
                    <Icon name="Expand" color="inverse" style={{ marginLeft: 5 }} />
                  </S.HeaderRightExpand>
                </Flex>
              </AvailableMessage>
            </ul>
          </S.HeaderAsideRight>
        )}
      </S.HeaderWrapper>
    </S.Header>
  );
};

const Content = ({ showList }) => {
  const { priceFixed, amountFixed, orders, userLoggedIn } = useOrderHistory();
  const OrderHistoryComponent = showList ? OrderHistoryTable : OrderHistory;
  const TradeHistoryComponent = showList ? TradeHistoryTable : TradeHistory;
  return (
    <S.Content>
      {userLoggedIn ? (
        <>
          <TabContent>
            {orders?.length ? (
              <OrderHistoryComponent
                priceFixed={priceFixed}
                amountFixed={amountFixed}
                orders={orders}
              />
            ) : (
              <EmptyData />
            )}
          </TabContent>
          <TabContent>
            {orders?.length ? (
              <TradeHistoryComponent
                priceFixed={priceFixed}
                amountFixed={amountFixed}
                orders={orders}
              />
            ) : (
              <EmptyData />
            )}
          </TabContent>
        </>
      ) : (
        <Logged />
      )}
    </S.Content>
  );
};

export default MyOrders;
