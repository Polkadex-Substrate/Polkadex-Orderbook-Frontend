import Link from "next/link";
import { ChangeEvent, useMemo } from "react";
import { useFormik } from "formik";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

import {
  Icon,
  ButtonStatus,
  LoadingSection,
  MarketInput,
  PassCode,
  SliderPercentage,
} from "@polkadex/orderbook-ui/molecules";
import { usePlaceOrder, useTryUnlockTradeAccount } from "@polkadex/orderbook/hooks";
import { Decimal, Icons } from "@polkadex/orderbook-ui/atoms";
import { selectTradeAccount } from "@polkadex/orderbook/providers/user/tradeWallet/helper";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useTradeWallet } from "@polkadex/orderbook/providers/user/tradeWallet";
import { buySellValidation } from "@polkadex/orderbook/validations";

type FormValues = {
  priceSell: string;
  priceBuy: string;
  amountSell: string;
  amountBuy: string;
};

type Props = {
  isSell?: boolean;
  orderType: "Limit" | "Market";
  isLimit: boolean;
  formik: ReturnType<typeof useFormik<FormValues>>;
};

export const MarketOrderAction = ({ isSell = false, orderType, isLimit, formik }: Props) => {
  const { values, isValid, dirty, setValues, setErrors, errors } = formik;

  const {
    changeAmount,
    changePrice,
    handleSliderClick,
    total,
    executeOrder,
    isOrderLoading,
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
  } = usePlaceOrder({
    isSell,
    isLimit,
    orderType,
    formValues: values,
    setFormValues: setValues,
    errors,
    setFormErrors: setErrors,
  });

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`marketOrderAction.${key}`);

  const handleCustomChange = (e: ChangeEvent<HTMLInputElement>) => {
    const name = e.target.name;
    const value = e.target.value;
    if (name.startsWith("price")) changePrice(value);
    else changeAmount(value);
  };

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
                <Decimal fixed={8} hasStyle={false}>
                  {availableAmount}
                </Decimal>{" "}
                {isSell ? baseTicker : quoteTicker}
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
                    placeholder="0.00"
                    id="order-price"
                    name={isSell ? "priceSell" : "priceBuy"}
                    value={isSell ? values.priceSell : values.priceBuy}
                    onChange={(e) => handleCustomChange(e)}
                    autoComplete="off"
                    disabled={isOrderLoading}
                  />
                  <S.Error>
                    {isSell
                      ? values.priceSell && errors.priceSell
                      : values.priceBuy && errors.priceBuy}
                  </S.Error>
                </>
              )}
              <MarketInput
                label={t("amountLabel")}
                icon="Amount"
                inputInfo={isLimit ? baseTicker : isSell ? baseTicker : quoteTicker}
                fullWidth={true}
                type="text"
                placeholder="0.00"
                id="order-amount"
                name={isSell ? "amountSell" : "amountBuy"}
                value={isSell ? values.amountSell : values.amountBuy}
                autoComplete="off"
                onChange={(e) => handleCustomChange(e)}
                disabled={isOrderLoading}
              />
              <S.Error>
                {isSell
                  ? values.amountSell && errors.amountSell
                  : values.amountBuy && errors.amountBuy}
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
                  inputInfo={isLimit ? quoteTicker : isSell ? quoteTicker : baseTicker}
                  fullWidth={true}
                  type="text"
                  value={total}
                  placeholder={isLimit ? t("totalLabel") : t("estimatedAmount")}
                  autoComplete="off"
                  disabled={isOrderLoading}
                  readOnly
                />
              )}
              {hasUser ? (
                <ButtonStatus
                  isSell={isSell}
                  heading={{
                    text: !isSignedIn ? t("signIntoPlaceOrder") : `${orderSide} ${baseTicker}`,
                    loading: t("waiting"),
                    success: t("orderCreated"),
                  }}
                  isLoading={isOrderLoading}
                  isSuccess={isOrderExecuted}
                  type="submit"
                  disabled={!hasUser || !isSignedIn || buttonDisabled || !(isValid && dirty)}
                />
              ) : (
                <Link href="/settings">
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
  const tradeWalletState = useTradeWallet();
  const currTradeAddr = profileState.selectedAccount.tradeAddress;
  const tradeAccount = selectTradeAccount(currTradeAddr, tradeWalletState.allBrowserAccounts);
  // if account is not protected by password use default password to unlock account.
  useTryUnlockTradeAccount(tradeAccount);

  const { values, setFieldValue, handleSubmit, errors } = useFormik({
    initialValues: {
      showPassword: false,
      password: "",
    },
    validationSchema: buySellValidation,
    onSubmit: (values) => {
      isValidSize &&
        tradeAccount.isLocked &&
        tradeWalletState.onUnlockTradeAccount({
          address: currTradeAddr,
          password: values.password,
        });
    },
  });

  const isLoading = false;

  const isValidSize = useMemo(() => values?.password?.length === 5, [values.password]);

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) => translation(`marketOrderAction.protectPassword.${key}`);

  return (
    <LoadingSection isActive={isLoading} color="transparent">
      <form onChange={handleSubmit}>
        <S.ProtectPassword>
          <S.ProtectPasswordTitle>
            <span>{t("title")}</span>
            <S.Show
              type="button"
              onClick={() => setFieldValue("showPassword", !values.showPassword)}>
              {values.showPassword ? <Icons.Hidden /> : <Icons.Show />}
            </S.Show>
          </S.ProtectPasswordTitle>
          <S.ProtectPasswordContent>
            <PassCode
              numInputs={5}
              onChange={(e) => setFieldValue("password", e)}
              value={values.password}
              name="password"
              error={errors.password}
              type={values.showPassword ? "password" : "tel"}
            />
          </S.ProtectPasswordContent>
        </S.ProtectPassword>
      </form>
    </LoadingSection>
  );
};
