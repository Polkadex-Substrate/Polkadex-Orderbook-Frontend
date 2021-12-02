import { useEffect } from "react";
import { useDispatch } from "react-redux";

import * as S from "./styles";

import {
  selectHasUser,
  selectOrdersHistory,
  selectUserInfo,
  userOrdersHistoryFetch,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  Checkbox,
  AvailableMessage,
  Button,
  Tabs,
  TabContent,
  TabHeader,
  Empty,
} from "@polkadex/orderbook-ui/molecules";
import { Funds, OpenOrders, OrderHistory } from "@polkadex/orderbook-ui/organisms";
export const Transactions = () => {
  const dispatch = useDispatch();
  const orders = useReduxSelector(selectOrdersHistory);
  const userLoggedIn = useReduxSelector(selectHasUser);

  console.log("Orders", { orders });
  return (
    <S.Wrapper>
      {userLoggedIn ? (
        <Tabs>
          <S.Header>
            <ul>
              <TabHeader>
                <S.Tab>Open Orders</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Orders History</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Trade History</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Funds</S.Tab>
              </TabHeader>
            </ul>
            <AvailableMessage>
              <S.Filters>
                <Checkbox label="Hide Other Pairs" />
                <Button size="small">Cancel All</Button>
              </S.Filters>
            </AvailableMessage>
          </S.Header>
          <S.Content>
            <TabContent>
              <OpenOrders />
            </TabContent>
            <TabContent>
              <OrderHistory />
            </TabContent>
            <TabContent>
              <div />
            </TabContent>
            <TabContent>
              <Funds />
            </TabContent>
          </S.Content>
        </Tabs>
      ) : (
        <Empty centered description="Connect to a wallet" />
      )}
    </S.Wrapper>
  );
};
