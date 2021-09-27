import dynamic from "next/dynamic";

import {
  Header,
  MarketChart,
  Orderbook,
  MarketTrade,
  Transactions,
  PlaceOrder,
} from "src/ui/templates";
import * as S from "src/styles/home/trading";
import { useMarketsFetch } from "src/hooks";
import { useMarketsTickersFetch } from "src/hooks/useTickersFetch";
import { useKeyringInitalize } from "src/hooks/useKeyringInitalize";
// const HeaderComponent = dynamic(() => import("../components/hello"));

const Trading = () => {
  useMarketsFetch();
  useMarketsTickersFetch();
  const loading= useKeyringInitalize();
  return  (
    <S.Main>
      <Header />
      <S.Wrapper>
        <MarketChart />
        <Orderbook />
        <MarketTrade />
        <Transactions />
        <PlaceOrder />
      </S.Wrapper>
    </S.Main>
  );
};

export default Trading;
