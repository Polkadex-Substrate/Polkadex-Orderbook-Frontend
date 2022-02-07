import { useState } from "react";

import * as S from "./styles";

// import { Range } from "@orderbook/v2/ui/molecules";
import {
  AvailableMessage,
  Icon,
  Tabs,
  TabContent,
  TabHeader,
} from "@polkadex/orderbook-ui/molecules";

export const PlaceOrder = () => {
  const [state, setState] = useState<number[]>([50]);

  return (
    <S.Main>
      <Tabs>
        <S.Header>
          <h2>Place Order</h2>
          <AvailableMessage message="Soon">
            <S.List>
              <S.ListItem isActive>Limit</S.ListItem>
              <S.ListItem>Market</S.ListItem>
            </S.List>
          </AvailableMessage>
        </S.Header>
        <S.Content>
          <S.List>
            <TabHeader>
              <S.ActionItem isActive>
                <Icon name="BuyOrder" size="medium" />
                Buy
              </S.ActionItem>
            </TabHeader>
            <TabHeader>
              <S.ActionItem>
                <Icon name="SellOrder" size="medium" />
                Sell
              </S.ActionItem>
            </TabHeader>
          </S.List>
          <S.Form>
            <S.FormInput>
              <S.InputWrapper>
                <input type="text" placeholder="Price" />
                <div>
                  <span>PDEX</span>
                </div>
              </S.InputWrapper>
            </S.FormInput>
            <S.FormInput isVertical>
              <S.InputWrapper>
                <input type="text" placeholder="Amount" />
                <div>
                  <span>PDEX</span>
                </div>
              </S.InputWrapper>
              <AvailableMessage message="Soon">
                {/* <Range values={state} /> */}
              </AvailableMessage>
            </S.FormInput>
            <S.Available>
              <p>Available:</p>
              <span>1,8019331000</span>
            </S.Available>
            <S.Box>
              <S.InputWrapper>
                <input type="text" placeholder="Total" />
                <div>
                  <span>PDEX</span>
                </div>
              </S.InputWrapper>
              <S.Button>Log in</S.Button>
            </S.Box>
          </S.Form>
        </S.Content>
      </Tabs>
    </S.Main>
  );
};
