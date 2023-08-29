import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useFormik } from "formik";

import * as S from "./styles";

import {
  Dropdown,
  Skeleton,
  TabContent,
  TabHeader,
  Tabs,
  MarketOrderAction,
} from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";

type FormValues = {
  priceSell: string;
  priceBuy: string;
  amountSell: string;
  amountBuy: string;
  totalBuy: string;
  totalSell: string;
};

export const MarketOrder = () => {
  const [isLimit, setIsLimit] = useState(true);
  const handleChangeType = (value: boolean) => setIsLimit(value);
  const orderType = isLimit ? "Limit" : "Market";

  const { t: translation, "2": isReady } = useTranslation("organisms");
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

  return (
    <S.Section>
      {!isReady ? (
        <MarketSkeleton />
      ) : (
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
                  {isLimit ? t("limitOrder") : t("marketOrder")} <Icons.ArrowBottom />
                </S.DropdownTrigger>
              </Dropdown.Trigger>
              <Dropdown.Menu fill="secondaryBackgroundSolid">
                <Dropdown.Item key="limit" onAction={() => handleChangeType(true)}>
                  {t("limitOrder")}
                </Dropdown.Item>
                <Dropdown.Item key="market" onAction={() => handleChangeType(false)}>
                  {t("marketOrder")}
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </S.Header>
          <TabContent>
            <MarketOrderAction isLimit={isLimit} orderType={orderType} formik={formik} />
          </TabContent>
          <TabContent>
            <MarketOrderAction
              isSell
              isLimit={isLimit}
              orderType={orderType}
              formik={formik}
            />
          </TabContent>
        </Tabs>
      )}
    </S.Section>
  );
};
export const MarketSkeleton = () => <Skeleton height="40rem" width="100%" minWidth="350px" />;
