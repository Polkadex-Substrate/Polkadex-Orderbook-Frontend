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
} from "@orderbook-ui/v2/organisms";
export const Trading = () => {
  return (
    <S.Main>
      <Header />
      <S.Wrapper>
        <S.Container className="test">
          <Information />
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
