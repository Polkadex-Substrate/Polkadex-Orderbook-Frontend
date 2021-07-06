import * as React from "react"
import { Tabs, TabContent, TabHeader, CustomButton, CustomCheckbox } from "src/components";
import { MyTradeHistory } from "./myTradeHistory";
import { OpenOrders } from "./openOrders"
import * as S from "./styles";

export const CustomTransactions = () => {
  return (
    <S.Wrapper>
      <Tabs>
      <S.Header>
        <S.Tabs>  
          <TabHeader>
            <S.Tab>
              Open Orders
            </S.Tab>
          </TabHeader>         
          <TabHeader>
            <S.Tab>
              Order History
            </S.Tab>
          </TabHeader>
          <TabHeader>
            <S.Tab>
              Trade History
            </S.Tab>
          </TabHeader>
          <TabHeader>
            <S.Tab>
              Funds
            </S.Tab>     
          </TabHeader>
        </S.Tabs>
        <S.Filters>
          <CustomCheckbox label="Hide Other Pairs"/>
          <CustomButton title="Cancel All" size="small" style={{width: 'fit-content'}}/>
        </S.Filters>
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
