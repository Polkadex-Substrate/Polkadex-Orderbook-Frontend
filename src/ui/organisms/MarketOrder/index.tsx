import { useState } from "react";

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

  return (
    <S.Section>
      <Tabs>
        <S.Header>
          <S.HeaderWrapper>
            <TabHeader>
              <S.ActionItem isActive>Buy</S.ActionItem>
            </TabHeader>
            <TabHeader>
              <S.ActionItem>Sell</S.ActionItem>
            </TabHeader>
          </S.HeaderWrapper>
          <Dropdown>
            <Dropdown.Trigger>
              <S.DropdownTrigger>
                {isLimit ? "Limit Order" : "Market Order"} <Icons.ArrowBottom />
              </S.DropdownTrigger>
            </Dropdown.Trigger>
            <Dropdown.Menu fill="secondaryBackgroundSolid">
              <Dropdown.Item key="limit" onAction={() => handleChangeType(true)}>
                Limit Order
              </Dropdown.Item>
              <Dropdown.Item key="limit" onAction={() => handleChangeType(false)}>
                Market Order
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </S.Header>
        <TabContent>
          <MarketOrderAction isLimit={isLimit} />
        </TabContent>
        <TabContent>
          <MarketOrderAction isSell isLimit={isLimit} />
        </TabContent>
      </Tabs>
    </S.Section>
  );
};
export const MarketSkeleton = () => <Skeleton height="100%" width="100%" minWidth="350px" />;
