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
const Trading = () => {
  useMarketsFetch();
  useMarketsTickersFetch();

  return (
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
