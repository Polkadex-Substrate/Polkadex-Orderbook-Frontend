import * as S from "./styles";

import { Button, TabHeader, Tabs } from "src/ui/components";
import { OrderInput } from "src/ui/molecules";

export const OrderForm = () => {
  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <TabHeader>
            <S.TabHeader>Limit</S.TabHeader>
          </TabHeader>
          <TabHeader>
            <S.TabHeader isMarket>Market</S.TabHeader>
          </TabHeader>
        </S.Header>
        <div>
          <form onSubmit={() => console.log("Submit..")}>
            <OrderInput label="Price" placeholder="Price" />
            <OrderInput label="Amount" placeholder="Amount" />
            <OrderInput label="Total" placeholder="Total" />
            <Button
              title="Log in"
              style={{ width: "100%", justifyContent: "center" }}
              background="secondaryBackground"
            />
          </form>
        </div>
      </Tabs>
    </S.Wrapper>
  );
};
