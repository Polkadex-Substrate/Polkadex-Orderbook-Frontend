import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import { useFormik } from "formik";
import {
  Dropdown,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
  MarketOrderAction,
  LoadingSection,
  PassCode,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { tryUnlockTradeAccount } from "@orderbook/core/helpers";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useSettingsProvider } from "@orderbook/core/providers/public/settings";
import { useUserAccounts } from "@polkadex/react-providers";
import { buySellValidation } from "@orderbook/core/validations";
import { useConnectWalletProvider } from "@orderbook/core/providers/user/connectWalletProvider";

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
  market: string;
};

export const MarketOrder = ({ market }: Props) => {
  const [isPasswordProtected, setIsPasswordProtected] = useState(false);
  const [isLimit, setIsLimit] = useState(true);
  const { selectedAccount } = useConnectWalletProvider();
  const handleChangeType = (value: boolean) => setIsLimit(value);
  const orderType = isLimit ? "Limit" : "Market";

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`marketOrder.${key}`);

  const initialValues: FormValues = useMemo(() => {
    return {
      priceSell: "",
      priceBuy: "",
      amountSell: "",
      amountBuy: "",
      totalBuy: "",
      totalSell: "",
    };
  }, []);

  const formik = useFormik<FormValues>({
    initialValues,
    onSubmit: () => {},
  });

  useEffect(() => {
    tryUnlockTradeAccount(selectedAccount);
    setIsPasswordProtected(Boolean(selectedAccount?.isLocked));
  }, [selectedAccount]);

  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <S.HeaderWrapper>
            <TabHeader>
              <S.ActionItem isActive>{t("buy")}</S.ActionItem>
            </TabHeader>
            <TabHeader>
              <S.ActionItem>{t("sell")}</S.ActionItem>
            </TabHeader>
          </S.HeaderWrapper>
          <Dropdown>
            <Dropdown.Trigger>
              <S.DropdownTrigger>
                {isLimit ? t("limitOrder") : t("marketOrder")}{" "}
                <Icons.ArrowBottom />
              </S.DropdownTrigger>
            </Dropdown.Trigger>
            <Dropdown.Menu fill="secondaryBackgroundSolid">
              <Dropdown.Item
                key="limit"
                onAction={() => handleChangeType(true)}
              >
                {t("limitOrder")}
              </Dropdown.Item>
              <Dropdown.Item
                key="market"
                onAction={() => handleChangeType(false)}
              >
                {t("marketOrder")}
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </S.Header>
        {isPasswordProtected && (
          <ProtectPassword
            dispatchAction={() => setIsPasswordProtected(false)}
          />
        )}
        <S.Content show={!isPasswordProtected}>
          <TabContent>
            <MarketOrderAction
              isLimit={isLimit}
              orderType={orderType}
              formik={formik}
              market={market}
            />
          </TabContent>
          <TabContent>
            <MarketOrderAction
              isSell
              isLimit={isLimit}
              orderType={orderType}
              formik={formik}
              market={market}
            />
          </TabContent>
        </S.Content>
      </Tabs>
    </S.Section>
  );
};
export const MarketSkeleton = () => (
  <Skeleton
    style={{ marginTop: 10 }}
    height={normalizeValue(40)}
    width="100%"
    minWidth="350px"
  />
);

const ProtectPassword = ({
  dispatchAction,
}: {
  dispatchAction: () => void;
}) => {
  const {
    selectedAddresses: { tradeAddress },
  } = useProfile();
  const { onHandleError } = useSettingsProvider();
  const { wallet, isReady } = useUserAccounts();
  const tradeAccount =
    isReady && tradeAddress ? wallet.getPair(tradeAddress) : undefined;

  const {
    values,
    setFieldValue,
    handleSubmit,
    errors,
    isValid,
    dirty,
    isSubmitting,
  } = useFormik({
    initialValues: {
      showPassword: false,
      password: "",
    },
    validationSchema: buySellValidation,
    onSubmit: async (values) => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 1000));
        if (isValidSize && tradeAccount?.isLocked) {
          tradeAccount.unlock(values.password);
          if (!tradeAccount?.isLocked) dispatchAction();
        }
      } catch (error) {
        onHandleError("Invalid Password");
      }
    },
  });

  const isValidSize = useMemo(
    () => values?.password?.length === 5,
    [values.password]
  );

  const { t: translation } = useTranslation("molecules");
  const t = (key: string) =>
    translation(`marketOrderAction.protectPassword.${key}`);

  return (
    <LoadingSection isActive={isSubmitting} color="transparent">
      <form onSubmit={handleSubmit}>
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
            <S.UnlockButton
              type="submit"
              disabled={isSubmitting || !(isValid && dirty) || !isValidSize}
            >
              {t("unlock")}
            </S.UnlockButton>
          </S.ProtectPasswordContent>
        </S.ProtectPassword>
      </form>
    </LoadingSection>
  );
};
