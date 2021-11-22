import { useRouter } from "next/router";

import * as S from "./styles";

import {
  useMarketsFetch,
  useDepthMarketsFetch,
  useMarketsTickersFetch,
  // useWindowSize,
} from "@polkadex/orderbook-hooks";
import { Header, Orderbook, MarketTrade, Transactions, PlaceOrder } from "src/ui";

export const Trading = () => {
  const router = useRouter();
  const { id } = router.query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useDepthMarketsFetch();

  if (!id) return <div />;

  return (
    <S.Main>
      <Header />

      <S.Wrapper>
        {/* {width < 990 && <Toolbar />} */}
        <Orderbook />
        <MarketTrade />
        <Transactions />
        <PlaceOrder />
      </S.Wrapper>
    </S.Main>
  );
};
