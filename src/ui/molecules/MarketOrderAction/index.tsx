import Link from "next/link";

import Input from "../../../v3/ui/molecules/Input";

import * as S from "./styles";

import { Icon, ButtonStatus, Range } from "@polkadex/orderbook-ui/molecules";
import { usePlaceOrder } from "@polkadex/orderbook/hooks";

export const MarketOrderAction = ({ isSell = false, isLimit }) => {
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
    isSignedIn,
    isOrderExecuted,
  } = usePlaceOrder(isSell, isLimit);
  return (
    <S.WrapperOrder>
      <S.ContainerWallet>
        <Icon
          name="Wallet"
          background="primaryBackgroundOpacity"
          size="extraLarge"
          stroke="text"
        />
        <S.WrapperBalance>
          <span>Available</span>
          <S.Span>
            {availableAmount} {isSell ? baseTicker : quoteTicker}
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
            inputInfo={isLimit ? baseTicker : isSell ? baseTicker : quoteTicker}
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

          {isLimit && (
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
          )}
          {hasUser ? (
            <ButtonStatus
              isSell={isSell}
              heading={{
                text: !isSignedIn ? "Sign In to Place Order" : `${orderSide} ${baseTicker}`,
                loading: "Waiting",
                success: "Order Created",
              }}
              isLoading={isOrderLoading}
              isSuccess={isOrderExecuted}
              type="submit"
              disabled={!hasUser || !isSignedIn}
            />
          ) : (
            <Link href="/accountManager">
              <S.Connect>Connect Trading Account</S.Connect>
            </Link>
          )}
        </form>
      </S.ContainerForm>
    </S.WrapperOrder>
  );
};
