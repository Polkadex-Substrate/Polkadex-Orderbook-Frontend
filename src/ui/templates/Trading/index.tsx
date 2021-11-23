// TODO: Verify empty Icon props -> Now Only working with Mocks yarn start-mock

import { useRouter } from "next/router";

import * as S from "./styles";

import { Header } from "@polkadex/orderbook-ui/organisms";
import {
  useMarketsFetch,
  useDepthMarketsFetch,
  useMarketsTickersFetch,
  useWindowSize,
} from "@polkadex/orderbook-hooks";
import {
  Orderbook,
  MarketTrade,
  Transactions,
  PlaceOrder,
} from "@polkadex/orderbook-ui/templates";

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
