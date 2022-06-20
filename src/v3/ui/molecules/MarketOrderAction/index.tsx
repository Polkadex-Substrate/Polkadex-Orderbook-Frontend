import Button from "../Button";
import Input from "../Input";

import * as S from "./styles";

import { Range } from "@orderbook/v2/ui/molecules";
import { Icon } from "@polkadex/orderbook-ui/molecules";
import { usePlaceOrder } from "@polkadex/orderbook/v2/hooks";

const MarketOrderAction = ({ isSell = false, isLimit }) => {
  const {
    changeAmount,
    changePrice,
    updateRange,
    rangeValue,
    price,
    total,
    amount,
    executeOrder,
    isOrderLoading,
    availableAmount,
    quoteTicker,
    baseTicker,
    orderSide,
    hasUser,
  } = usePlaceOrder(isSell, isLimit);
  return (
    <S.WrapperOrder>
      <S.ContainerWallet>
        <Icon
          name="Wallet"
          background="secondaryBackground"
          size="extraLarge"
          stroke="white"
        />
        <S.WrapperBalance>
          <span>Available</span>
          <S.Span>
            {availableAmount} {baseTicker}
          </S.Span>
        </S.WrapperBalance>
      </S.ContainerWallet>
      <S.ContainerForm>
        <form onSubmit={executeOrder}>
          {isLimit && (
            <Input
              label="Price"
              icon="Price"
              inputInfo={quoteTicker}
              fullWidth={true}
              type="text"
              placeholder="0.000000000"
              id="order-price"
              value={price}
              autoComplete="off"
              onChange={(e) => changePrice(e.currentTarget.value)}
              disabled={isOrderLoading}
            />
          )}
          <Input
            label="Amount"
            icon="Amount"
            inputInfo={baseTicker}
            fullWidth={true}
            type="text"
            placeholder="0.000000000"
            id="order-amount"
            value={amount}
            autoComplete="off"
            onChange={(e) => changeAmount(e.currentTarget.value)}
            disabled={isOrderLoading}
          />

          <S.RangeWrapper>
            <Range values={rangeValue} setValues={updateRange} />
          </S.RangeWrapper>
          <Input
            label="Total"
            inputInfo={isLimit ? quoteTicker : isSell ? quoteTicker : baseTicker}
            fullWidth={true}
            type="text"
            defaultValue={total}
            placeholder={isLimit ? "Total" : "Estimated Amount"}
            autoComplete="off"
            disabled={isOrderLoading}
            readOnly
          />
          <Button
            type="submit"
            title={!hasUser ? "Connect your account" : `${orderSide} ${baseTicker}`}
            fullWidth={true}
            background={!hasUser ? "secondaryBackground" : isSell ? "primary" : "green"}
            disabled={!hasUser}
          />
        </form>
      </S.ContainerForm>
    </S.WrapperOrder>
  );
};

export default MarketOrderAction;
