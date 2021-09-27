import { useRouter } from "next/router";

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
import { useKeyringInitalize } from "src/hooks/useKeyringInitalize";
// import { useMarketsTickersFetch } from "src/hooks/useTickersFetch";

const Trading = () => {
  const router = useRouter();
  const { id } = router.query;

  useMarketsFetch(id as string);
  // useMarketsTickersFetch();
  const loading = useKeyringInitalize();

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
