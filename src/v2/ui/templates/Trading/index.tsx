import { useState } from "react";

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
import { Popup } from "@polkadex/orderbook-ui/molecules";
export const Trading = () => {
  const [isActive, setIsActive] = useState(false);
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
