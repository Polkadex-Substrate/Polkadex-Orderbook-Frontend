import { ChangeEvent } from "react";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import {
  Icon,
  ButtonStatus,
  MarketInput,
  SliderPercentage,
  Skeleton,
} from "@polkadex/orderbook-ui/molecules";
import { usePlaceOrder } from "@orderbook/core/hooks";
import { Decimal } from "@polkadex/orderbook-ui/atoms";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";

import * as S from "./styles";

import { normalizeValue } from "@/utils/normalize";

type FormValues = {
  priceSell: string;
  priceBuy: string;
  amountSell: string;
  amountBuy: string;
  totalBuy: string;
  totalSell: string;
};

type Props = {
  isSell?: boolean;
  orderType: "Limit" | "Market";
  isLimit: boolean;
  formik: ReturnType<typeof useFormik<FormValues>>;
  market: string;
};

export const MarketOrderAction = ({
  isSell = false,
  orderType,
  isLimit,
  formik,
  market,
}: Props) => {
  const { values, isValid, dirty, setValues, setErrors, errors } = formik;

  const {
    changeAmount,
    changePrice,
    handleSliderClick,
    changeTotal,
    executeOrder,
    isOrderLoading,
    isMarketFetching,
    isBalanceFetching,
    availableAmount,
    quoteTicker,
    baseTicker,
    orderSide,
    hasUser,
    isSignedIn,
    isOrderExecuted,
    slider,
    buttonDisabled,
    pricePrecision,
    qtyPrecision,
  } = usePlaceOrder(
    isSell,
    isLimit,
    orderType,
    values,
    setValues,
    errors,
    setErrors,
    market
  );
  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`marketOrderAction.${key}`);
  const { onToogleConnectTrading } = useSettingsProvider();

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name.startsWith("price")) changePrice(value);
    else if (name.startsWith("amount")) changeAmount(value);
    else changeTotal(value);
  };

  const showPriceError =
    Boolean(
      isSell
        ? values.priceSell && errors.priceSell && errors.priceSell.length > 0
        : values.priceBuy && errors.priceBuy && errors.priceBuy.length > 0
    ) && isSignedIn;

  const showAmountError =
    Boolean(
      isSell
        ? values.amountSell && errors.amountSell && errors.amountSell.length > 0
        : values.amountBuy && errors.amountBuy && errors.amountBuy.length > 0
    ) && isSignedIn;

  return (
    <S.WrapperOrder>
      <>
        <S.ContainerWallet>
          <Icon
            name="Wallet"
            background="primaryBackgroundOpacity"
            size="extraLarge"
            stroke="text"
          />
          <S.WrapperBalance>
            <small>{t("avaliable")}</small>
            <S.Span>
              {isMarketFetching || isBalanceFetching ? (
                <AvaliableBalanceSkeleton />
              ) : (
                <>
                  <Decimal
                    fixed={isSell ? qtyPrecision : pricePrecision}
                    hasStyle={false}
                  >
                    {availableAmount}
                  </Decimal>{" "}
                  {isSell ? baseTicker : quoteTicker}
                </>
              )}
            </S.Span>
          </S.WrapperBalance>
        </S.ContainerWallet>
        <S.ContainerForm>
          <form onSubmit={executeOrder}>
            {isLimit && (
              <>
                <MarketInput
                  label={t("priceLabel")}
                  icon="Price"
                  inputInfo={quoteTicker}
                  fullWidth={true}
                  type="text"
                  placeholder="0.0000"
                  id="order-price"
                  name={isSell ? "priceSell" : "priceBuy"}
                  value={isSell ? values.priceSell : values.priceBuy}
                  onChange={(e) => handleCustomChange(e)}
                  autoComplete="off"
                  disabled={isOrderLoading}
                  hasError={showPriceError}
                />
                <S.Error hasError={showPriceError}>
                  <S.ErrorText>
                    {isSell
                      ? values.priceSell && errors.priceSell
                      : values.priceBuy && errors.priceBuy}
                  </S.ErrorText>
                </S.Error>
              </>
            )}
            <MarketInput
              label={t("amountLabel")}
              icon="Amount"
              inputInfo={
                isLimit ? baseTicker : isSell ? baseTicker : quoteTicker
              }
              fullWidth={true}
              type="text"
              placeholder="0.0000"
              id="order-amount"
              name={isSell ? "amountSell" : "amountBuy"}
              value={isSell ? values.amountSell : values.amountBuy}
              autoComplete="off"
              onChange={(e) => handleCustomChange(e)}
              disabled={isOrderLoading}
              hasError={showAmountError}
            />
            <S.Error hasError={showAmountError}>
              <S.ErrorText>
                {isSell
                  ? values.amountSell && errors.amountSell
                  : values.amountBuy && errors.amountBuy}
              </S.ErrorText>
            </S.Error>
            <S.SliderWrapper>
              {slider.map((data, index) => (
                <SliderPercentage
                  {...data}
                  key={index}
                  isDisabled={false}
                  handleOnClick={handleSliderClick}
                />
              ))}
            </S.SliderWrapper>
            {isLimit && (
              <MarketInput
                label={t("totalLabel")}
                inputInfo={
                  isLimit ? quoteTicker : isSell ? quoteTicker : baseTicker
                }
                fullWidth={true}
                type="text"
                value={isSell ? values.totalSell : values.totalBuy}
                name={isSell ? "totalSell" : "totalBuy"}
                onChange={(e) => handleCustomChange(e)}
                placeholder={isLimit ? t("totalLabel") : t("estimatedAmount")}
                autoComplete="off"
                disabled={isOrderLoading}
              />
            )}
            {isMarketFetching || !baseTicker ? (
              <ButtonSkeleton />
            ) : hasUser ? (
              <ButtonStatus
                isSell={isSell}
                heading={{
                  text: !isSignedIn
                    ? t("signIntoPlaceOrder")
                    : `${orderSide} ${baseTicker}`,
                  loading: t("waiting"),
                  success: t("orderCreated"),
                }}
                isLoading={isOrderLoading}
                isSuccess={isOrderExecuted}
                type="submit"
                disabled={
                  !hasUser ||
                  !isSignedIn ||
                  buttonDisabled ||
                  !(isValid && dirty)
                }
              />
            ) : (
              <S.Connect
                onClick={() => onToogleConnectTrading(true)}
                type="button"
              >
                {t("connectTradingAccount")}
              </S.Connect>
            )}
          </form>
        </S.ContainerForm>
      </>
    </S.WrapperOrder>
  );
};

export const AvaliableBalanceSkeleton = () => (
  <Skeleton
    style={{ marginTop: 2 }}
    height={normalizeValue(2)}
    width={normalizeValue(10)}
  />
);

export const ButtonSkeleton = () => (
  <S.ButtonSkeletonWrapper>
    <Skeleton height={normalizeValue(4)} width="100%" />
  </S.ButtonSkeletonWrapper>
);
