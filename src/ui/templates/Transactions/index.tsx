import * as React from "react";

import * as S from "./styles";
import OpenOrders from "./openOrders";

import { Tabs, TabContent, TabHeader, Button } from "src/ui/components";
import { Checkbox } from "src/ui/molecules";

export const Transactions = ({ active = false }) => {
  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <S.Tabs>
            <TabHeader>
              <S.Tab>Open Orders</S.Tab>
            </TabHeader>
            <TabHeader>
              <S.Tab>Order History</S.Tab>
            </TabHeader>
            <TabHeader>
              <S.Tab>Trade History</S.Tab>
            </TabHeader>
            <TabHeader>
              <S.Tab>Funds</S.Tab>
            </TabHeader>
          </S.Tabs>
          <S.Filters>
            <Checkbox label="Hide Other Pairs" />
            <Button title="Cancel All" size="Small" style={{ width: "fit-content" }} />
          </S.Filters>
        </S.Header>
        <S.Content>
          <TabContent>
            <OpenOrders />
          </TabContent>
          <TabContent>{/* <MyTradeHistory /> */}</TabContent>
        </S.Content>
      </Tabs>
    </S.Wrapper>
  );
};
