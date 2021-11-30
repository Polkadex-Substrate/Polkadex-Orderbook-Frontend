import dynamic from "next/dynamic";

import * as S from "./styles";

import { Tabs, TabContent, TabHeader } from "@polkadex/orderbook-ui/molecules";
import { MarketDepth } from "@polkadex/orderbook-ui/templates";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectCurrentMarket } from "@polkadex/orderbook-modules";

const TradingChart = dynamic(
  () =>
    import("@polkadex/orderbook-ui/molecules/TradingChart").then((mod) => mod.TradingChart),
  {
    ssr: false,
  }
);
export const MarketChart = () => {
  const currentMarket = useReduxSelector(selectCurrentMarket);
  return (
    <S.Wrapper>
      <Tabs>
        <S.Header>
          <S.Nav>
            <ul>
              <TabHeader>
                <S.Li>Market Chart</S.Li>
              </TabHeader>
              <TabHeader>
                <S.Li>Depth Chart</S.Li>
              </TabHeader>
            </ul>
          </S.Nav>
          <S.Actions>
            <ul>
              <li></li>
            </ul>
          </S.Actions>
        </S.Header>
        <S.Content>
          <TabContent>{currentMarket && <TradingChart />}</TabContent>
          <TabContent>
            <MarketDepth />
          </TabContent>
        </S.Content>
      </Tabs>
    </S.Wrapper>
  );
};
