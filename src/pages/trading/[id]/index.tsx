import { useRouter } from "next/router";

import {
  Header,
  MarketChart,
  Orderbook,
  MarketTrade,
  Transactions,
  PlaceOrder,
  TransferInteraction,
  Popup,
} from "src/ui";
import * as S from "src/styles/home/trading";
import {
  useMarketsFetch,
  useDepthMarketsFetch,
  useMarketsTickersFetch,
  useWalletsFetch,
} from "src/hooks";

const Trading = () => {
  const router = useRouter();
  const { id } = router.query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useDepthMarketsFetch();
  useWalletsFetch(); // Testing..

  if (!id) return <div />;
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
