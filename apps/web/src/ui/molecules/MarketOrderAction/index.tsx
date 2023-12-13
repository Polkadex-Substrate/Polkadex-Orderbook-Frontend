import Link from "next/link";
import { ChangeEvent, useMemo } from "react";
import { useFormik } from "formik";
import { useTranslation } from "next-i18next";
import {
  Icon,
  ButtonStatus,
  LoadingSection,
  MarketInput,
  PassCode,
  SliderPercentage,
  Skeleton,
} from "@polkadex/orderbook-ui/molecules";
import { usePlaceOrder, useTryUnlockTradeAccount } from "@orderbook/core/hooks";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import { selectTradeAccount } from "@orderbook/core/providers/user/tradeWallet";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { buySellValidation } from "@orderbook/core/validations";
import { useWalletProvider } from "@orderbook/core/providers/user/walletProvider";

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
    showProtectedPassword,
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

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name.startsWith("price")) changePrice(value);
    else if (name.startsWith("amount")) changeAmount(value);
    else changeTotal(value);
  };

  const showPriceError = Boolean(
    isSell
      ? values.priceSell && errors.priceSell && errors.priceSell.length > 0
      : values.priceBuy && errors.priceBuy && errors.priceBuy.length > 0
  );

  const showAmountError = Boolean(
    isSell
      ? values.amountSell && errors.amountSell && errors.amountSell.length > 0
      : values.amountBuy && errors.amountBuy && errors.amountBuy.length > 0
  );

  return (
    <S.WrapperOrder>
      {showProtectedPassword ? (
        <ProtectPassword />
      ) : (
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
                <Link href="/wallets">
                  <S.Connect>{t("connectTradingAccount")}</S.Connect>
                </Link>
              )}
            </form>
          </S.ContainerForm>
        </>
      )}
    </S.WrapperOrder>
  );
};

const ProtectPassword = () => {
  const profileState = useProfile();
  const { localTradingAccounts, onUnlockTradeAccount } = useWalletProvider();
  const currTradeAddr = profileState.selectedAccount.tradeAddress;
  const tradeAccount = selectTradeAccount(
    currTradeAddr,
    localTradingAccounts || []
  );
  // if account is not protected by password use default password to unlock account.
  useTryUnlockTradeAccount(tradeAccount);

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      showPassword: false,
      password: "",
    },
    validationSchema: buySellValidation,
    onSubmit: (values) => {
      typeof onUnlockTradeAccount === "function" &&
        isValidSize &&
        tradeAccount?.isLocked &&
        onUnlockTradeAccount({
          address: currTradeAddr,
          password: values.password,
        });
    },
  });

  const isLoading = false;

  const isValidSize = useMemo(
    () => values?.password?.length === 5,
    [values.password]
  );

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) =>
    translation(`marketOrderAction.protectPassword.${key}`);

  return (
    <LoadingSection isActive={isLoading} color="transparent">
      <form onChange={handleSubmit}>
        <S.ProtectPassword>
          <S.ProtectPasswordTitle>
            <span>{t("title")}</span>
            <S.Show
              type="button"
              onClick={() =>
                setFieldValue("showPassword", !values.showPassword)
              }
            >
              {!values.showPassword ? <Icons.Hidden /> : <Icons.Show />}
            </S.Show>
          </S.ProtectPasswordTitle>
          <S.ProtectPasswordContent>
            <PassCode
              numInputs={5}
              onChange={(e) => setFieldValue("password", e)}
              value={values.password}
              name="password"
              error={errors.password}
              type={!values.showPassword ? "password" : "tel"}
            />
          </S.ProtectPasswordContent>
        </S.ProtectPassword>
      </form>
    </LoadingSection>
  );
};

export const AvaliableBalanceSkeleton = () => (
  <Skeleton height={normalizeValue(2)} width={normalizeValue(10)} />
);
export const ButtonSkeleton = () => (
  <S.ButtonSkeletonWrapper>
    <Skeleton height={normalizeValue(4)} width="100%" />
  </S.ButtonSkeletonWrapper>
);
