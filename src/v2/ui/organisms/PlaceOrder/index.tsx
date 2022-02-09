// TODO: Add Formik and Yup validations

import { useState } from "react";

import * as S from "./styles";

import { Range, Loading } from "@orderbook/v2/ui/molecules";
import {
  AvailableMessage,
  Icon,
  Tabs,
  TabContent,
  TabHeader,
} from "@polkadex/orderbook-ui/molecules";
import { usePlaceOrder } from "@polkadex/orderbook/v2/hooks";

export const PlaceOrder = () => {
  const [isLimit, setIsLimit] = useState(false);
  const handleChangeType = (value: boolean) => setIsLimit(value);
  return (
    <S.Main>
      <Tabs>
        <S.Header>
          <h2>Place Order</h2>
          <S.List>
            <S.ListItem isActive={!isLimit} onClick={() => handleChangeType(false)}>
              Market
            </S.ListItem>
            <S.ListItem isActive={isLimit} onClick={() => handleChangeType(true)}>
              Limit
            </S.ListItem>
          </S.List>
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
            <TabContent>
              <OrderForm isLimit={isLimit} />
            </TabContent>
            <TabContent>
              <OrderForm isSell isLimit={isLimit} />
            </TabContent>
          </S.Form>
        </S.Content>
      </Tabs>
    </S.Main>
  );
};

export const OrderForm = ({ isSell = false, isLimit = false }) => {
  const {
    changeAmount,
    changePrice,
    price,
    total,
    amount,
    executeOrder,
    buttonDisabled,
    inputDisabled,
    availableAmount,
    quoteTicker,
    baseTicker,
    orderSide,
    hasUser,
  } = usePlaceOrder(isSell, isLimit);

  return (
    <form onSubmit={executeOrder}>
      {!isLimit && (
        <S.FormInput>
          <S.InputWrapper>
            <input
              type="text"
              placeholder="Price"
              value={price}
              onChange={(e) => changePrice(e.currentTarget.value)}
              disabled={inputDisabled}
            />
            <div>
              <span>{quoteTicker}</span>
            </div>
          </S.InputWrapper>
        </S.FormInput>
      )}
      <S.FormInput isVertical>
        <S.InputWrapper>
          <input
            type="text"
            placeholder="Amount"
            value={amount}
            onChange={(e) => changeAmount(e.currentTarget.value)}
            disabled={inputDisabled}
          />
          <div>
            <span>{baseTicker}</span>
          </div>
        </S.InputWrapper>
        <AvailableMessage message="Soon">
          <Range values={[50]} />
        </AvailableMessage>
      </S.FormInput>
      <S.Available>
        <p>Available:</p>
        <span>
          {availableAmount} {quoteTicker}
        </span>
      </S.Available>
      <S.Box>
        <S.InputWrapper>
          <input
            type="text"
            defaultValue={total}
            placeholder={isLimit ? "Estimated Total" : "Total"}
            disabled={inputDisabled}
          />
          <div>
            <span>{quoteTicker}</span>
          </div>
        </S.InputWrapper>

        <S.Button type="submit" isSell={isSell} disabled={buttonDisabled}>
          {inputDisabled ? (
            <Loading />
          ) : (
            <>{!hasUser ? "Connect your account" : `${orderSide} ${baseTicker}`}</>
          )}
        </S.Button>
      </S.Box>
    </form>
  );
};
