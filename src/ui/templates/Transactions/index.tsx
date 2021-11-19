import * as React from "react";

import * as S from "./styles";

import { selectUserLoggedIn } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import {
  Checkbox,
  Tabs,
  TabContent,
  TabHeader,
  OpenOrders,
  Empty,
  OrderHistory,
  AvailableMessage,
} from "src/ui";
import { Button } from "@polkadex/orderbook-ui/molecules";

export const Transactions = () => {
  const userLoggedIn = useReduxSelector(selectUserLoggedIn);

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
          </S.Content>
        </Tabs>
      ) : (
        <Empty centered description="Connect to a wallet" />
      )}
    </S.Wrapper>
  );
};
