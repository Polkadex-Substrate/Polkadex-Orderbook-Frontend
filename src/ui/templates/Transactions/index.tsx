import * as React from "react";

import * as S from "./styles";

import { Button, Checkbox, Tabs, TabContent, TabHeader, OpenOrders, Empty } from "src/ui";
import { selectUserLoggedIn } from "src/modules";
import { useReduxSelector } from "src/hooks";

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
                <S.Tab>Order History</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Trade History</S.Tab>
              </TabHeader>
              <TabHeader>
                <S.Tab>Funds</S.Tab>
              </TabHeader>
            </ul>
            <S.Filters>
              <Checkbox label="Hide Other Pairs" />
              <Button title="Cancel All" size="small" style={{ width: "fit-content" }} />
            </S.Filters>
          </S.Header>
          <S.Content>
            <TabContent>
              <OpenOrders />
            </TabContent>
            <TabContent></TabContent>
          </S.Content>
        </Tabs>
      ) : (
        <Empty centered description="Connect to a wallet" />
      )}
    </S.Wrapper>
  );
};
