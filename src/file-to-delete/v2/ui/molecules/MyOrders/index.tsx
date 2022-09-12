import { useState } from "react";

import { Flex } from "../../atoms";

import * as S from "./styles";

import {
  Icon,
  Tabs,
  TabContent,
  TabHeader,
  AvailableMessage,
  EmptyData,
  Logged,
} from "@polkadex/orderbook-ui/molecules";
import {
  OrderHistory,
  TradeHistory,
  TradeHistoryTable,
  OrderHistoryTable,
} from "@orderbook/v2/ui/molecules";
import { useOrderHistory, useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectHasCurrentTradeAccount } from "@polkadex/orderbook-modules";
import { selectGetAsset } from "@polkadex/orderbook/modules/public/assets";

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
  const hasUser = useReduxSelector(selectHasCurrentTradeAccount);
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
  const { priceFixed, amountFixed, orders, userLoggedIn, trades } = useOrderHistory([]);
  const getAsset = useReduxSelector(selectGetAsset);
  const OrderHistoryComponent = showList ? OrderHistoryTable : OrderHistory;
  const TradeHistoryComponent = showList ? TradeHistoryTable : TradeHistory;
  return (
    <S.Content>
      {userLoggedIn ? (
        <>
          <TabContent>
            {orders?.length ? (
              <OrderHistoryComponent
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
              <TradeHistoryComponent
                priceFixed={priceFixed}
                amountFixed={amountFixed}
                getAsset={getAsset}
                orders={trades}
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
