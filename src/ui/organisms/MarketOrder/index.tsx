import { useState } from "react";
import { useTranslation } from "react-i18next";

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

export const MarketOrder = () => {
  const [isLimit, setIsLimit] = useState(true);
  const handleChangeType = (value: boolean) => setIsLimit(value);

  const [form, setForm] = useState<{
    orderType: string;
    price: string;
    priceMarket?: unknown;
    amountSell: string;
    amountBuy: string;
    erorr: string | null;
  }>({
    orderType: isLimit ? "Limit" : "Market",
    price: "",
    amountSell: "",
    amountBuy: "",
    erorr: null,
  });

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`marketOrder.${key}`);

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
          <MarketOrderAction isLimit={isLimit} form={form} setForm={setForm} />
        </TabContent>
        <TabContent>
          <MarketOrderAction isSell isLimit={isLimit} form={form} setForm={setForm} />
        </TabContent>
      </Tabs>
    </S.Section>
  );
};
export const MarketSkeleton = () => <Skeleton height="100%" width="100%" minWidth="350px" />;
