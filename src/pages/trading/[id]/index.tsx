import { useRouter } from "next/router";

import {
  useMarketsFetch,
  useDepthMarketsFetch,
  useMarketsTickersFetch,
  useWindowSize,
} from "@polkadex/orderbook-hooks";
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

const Trading = () => {
  const router = useRouter();
  const { id } = router.query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useDepthMarketsFetch();
  const { width } = useWindowSize();

  if (!id) return <div />;

  return (
    <S.Main>
      <Header />

      <S.Wrapper>
        {/* {width < 990 && <Toolbar />} */}
        {/* <MarketChart /> */}
        <Orderbook />
        <MarketTrade />
        <Transactions />
        <PlaceOrder />
      </S.Wrapper>
    </S.Main>
  );
};

export default Trading;
