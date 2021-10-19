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
  Toolbar,
} from "src/ui";
import * as S from "src/styles/home/trading";
import {
  useMarketsFetch,
  useDepthMarketsFetch,
  useMarketsTickersFetch,
  useWalletsFetch,
  useWindowSize,
} from "src/hooks";

const Trading = () => {
  const router = useRouter();
  const { id } = router.query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useDepthMarketsFetch();
  useWalletsFetch(); // Testing..
  const { width } = useWindowSize();

  if (!id) return <div />;

  return (
    <S.Main>
      <Header />

      <S.Wrapper>
        {/* {width < 990 && <Toolbar />} */}
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
