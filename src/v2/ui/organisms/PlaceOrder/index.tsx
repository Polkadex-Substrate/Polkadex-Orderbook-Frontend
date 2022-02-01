import { useState } from "react";

import * as S from "./styles";

import { Range } from "@orderbook-ui/v2/molecules";
import { AvailableMessage, Icon } from "@polkadex/orderbook-ui/molecules";

export const PlaceOrder = () => {
  const [state, setState] = useState<number[]>([50]);

  return (
    <S.Main>
      <AvailableMessage message="Soon">
        <S.Header>
          <h2>Place Order</h2>
          <S.List>
            <S.ListItem isActive>Limit</S.ListItem>
            <S.ListItem>Market</S.ListItem>
          </S.List>
        </S.Header>
        <S.Content>
          <S.List>
            <S.ActionItem isActive>
              <Icon name="BuyOrder" size="medium" />
              Buy
            </S.ActionItem>
            <S.ActionItem>
              <Icon name="SellOrder" size="medium" />
              Sell
            </S.ActionItem>
          </S.List>
          <S.Form>
            <S.FormInput>
              <S.InputLabel>Price</S.InputLabel>
              <S.InputWrapper>
                <input type="text" value="0.012570000" />
                <span>PDEX</span>
              </S.InputWrapper>
            </S.FormInput>
            <S.FormInput isVertical>
              <S.FormInputFlex>
                <S.InputLabel>Amount</S.InputLabel>
                <S.InputWrapper>
                  <input type="text" value="0.012570000" />
                  <span>PDEX</span>
                </S.InputWrapper>
              </S.FormInputFlex>
              <Range values={state} />
            </S.FormInput>
            <S.Available>
              <p>Available:</p>
              <span>1,8019331000</span>
            </S.Available>
            <S.Box>
              <S.BoxInput>
                <span>Total</span>
                <S.InputWrapper>
                  <input type="text" value="0.11577000" />
                  <span>PDEX</span>
                </S.InputWrapper>
              </S.BoxInput>
              <S.Button>Log in</S.Button>
            </S.Box>
          </S.Form>
        </S.Content>
      </AvailableMessage>
    </S.Main>
  );
};
