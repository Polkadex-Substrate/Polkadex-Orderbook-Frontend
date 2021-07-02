import * as React from "react"
import { Tabs, TabContent, TabHeader, CustomButton } from "src/components";
import { MyTradeHistory } from "./myTradeHistory";
import { OpenOrders } from "./openOrders"
import * as S from "./styles";

export const CustomTransactions = () => {
  return (
    <S.Wrapper>
      <Tabs>
      <S.Header>
        <S.Tabs>
          <S.Tab>
            <TabHeader>
              <CustomButton title="Open Orders"/>
            </TabHeader>         
          </S.Tab>
          <S.Tab>
          </S.Tab>
          <S.Tab>
            <TabHeader>
              <CustomButton title="My Trade History"/>
            </TabHeader>
          </S.Tab>
        </S.Tabs>
        <S.Filters />
     </S.Header>
      <S.Content>
        <TabContent>
          <OpenOrders />
        </TabContent>
        <TabContent>
          <MyTradeHistory />
        </TabContent>
      </S.Content>
      </Tabs>
    </S.Wrapper>
  );
};
