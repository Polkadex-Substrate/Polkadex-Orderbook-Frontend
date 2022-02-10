import { useState } from "react";
import { useRouter } from "next/router";

import * as S from "./styles";

import {
  Header,
  Markets,
  ExploreMarket,
  Orderbook,
  Chart,
  News,
  MyOrders,
  PlaceOrder,
  RecentTrades,
  Information,
  Footer,
} from "@orderbook/v2/ui/organisms";
import { Popup } from "@polkadex/orderbook-ui/molecules";
import {
  useMarketsFetch,
  useMarketsTickersFetch,
  useOrderBookMarketsFetch,
} from "@polkadex/orderbook-hooks";
export const Trading = () => {
  const [isActive, setIsActive] = useState(false);

  // Test data
  const { id } = useRouter().query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useOrderBookMarketsFetch();

  if (!id) return <div />;
  const handleClose = () => setIsActive(!isActive);

  return (
    <S.Main>
      <Popup isVisible={isActive} onClose={handleClose} size="fitContent" isRightPosition>
        <Markets />
      </Popup>
      <Header />
      <S.Wrapper>
        <S.Container>
          <Information onOpenMarkets={handleClose} />
          <Chart />
          <Orderbook />
          <ExploreMarket />
        </S.Container>
        <PlaceOrder />
        <MyOrders />
        <News />
        <RecentTrades />
      </S.Wrapper>
      <Footer />
    </S.Main>
  );
};
