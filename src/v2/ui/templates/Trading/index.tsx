import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { Popup } from "@polkadex/orderbook-ui/molecules";
import {
  useMarketsFetch,
  useMarketsTickersFetch,
  useOrderBookMarketsFetch,
  useReduxSelector,
} from "@polkadex/orderbook-hooks";
import {
  balanceChannelFetch,
  balancesFetch,
  currentTickerFetch,
  currentTickersUpdate,
  orderBookFetch,
  selectCurrentMarket,
  selectCurrentMarketTickers,
  selectCurrentTrade,
  selectHasUser,
  selectLastRecentTrade,
} from "@polkadex/orderbook-modules";
import { updateTickerWithTrade } from "@polkadex/orderbook/helpers/updateTickerWithTrade";

const Header = dynamic(
  () => import("@orderbook/v2/ui/organisms/Header").then((mod) => mod.Header),
  {
    ssr: false,
  }
);
const Footer = dynamic(
  () => import("@orderbook/v2/ui/organisms/Footer").then((mod) => mod.Footer),
  {
    ssr: false,
  }
);
const Orderbook = dynamic(() => import("@orderbook/v2/ui/organisms/Orderbook"), {
  ssr: false,
});
const Chart = dynamic(() => import("@orderbook/v2/ui/organisms/Chart"), {
  ssr: false,
});
const News = dynamic(() => import("@orderbook/v2/ui/organisms/News"), {
  ssr: false,
});
const MyOrders = dynamic(() => import("@orderbook/v2/ui/organisms/MyOrders"), {
  ssr: false,
});
const PlaceOrder = dynamic(() => import("@orderbook/v2/ui/organisms/PlaceOrder"), {
  ssr: false,
});
const RecentTrades = dynamic(() => import("@orderbook/v2/ui/organisms/RecentTrades"), {
  ssr: false,
});
const Information = dynamic(() => import("@orderbook/v2/ui/organisms/Information"), {
  ssr: false,
});
const Markets = dynamic(() => import("@orderbook/v2/ui/organisms/Markets"), {
  ssr: false,
});
// const ExploreMarket = dynamic(
//   () => import("@orderbook/v2/ui/organisms/ExploreMarket").then((mod) => mod.ExploreMarket),
//   {
//     ssr: false,
//   }
// );

export const Trading = () => {
  const [isActive, setIsActive] = useState(false);
  const dispatch = useDispatch();
  // Test data
  const { id } = useRouter().query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useOrderBookMarketsFetch();

  const hasUser = useReduxSelector(selectHasUser);
  const market = useReduxSelector(selectCurrentMarket);
  const currentTrade = useReduxSelector(selectCurrentTrade);
  const lastTrade = useReduxSelector(selectLastRecentTrade);
  const currentTicker = useReduxSelector(selectCurrentMarketTickers);
  // intitialize market dependent events
  useEffect(() => {
    if (market) {
      const tickerMarketId = `${market.assetIdArray[0]}-${market.assetIdArray[1]}`;
      // dispatch(rangerConnectFetch());
      dispatch(orderBookFetch(market));
      dispatch(currentTickerFetch({ marketId: tickerMarketId }));
    }
  }, [dispatch, market]);

  // initialize user specific sagas
  useEffect(() => {
    if (hasUser) {
      if (hasUser) {
        dispatch(balancesFetch());
        dispatch(balanceChannelFetch());
      }
    }
  }, [dispatch, hasUser]);

  // intiatilize trade specific events
  useEffect(() => {
    if (currentTrade && lastTrade) {
      const updatedTicker = updateTickerWithTrade(currentTrade, currentTicker);
      dispatch(currentTickersUpdate(updatedTicker));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade, dispatch, lastTrade]);

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
          {/* <ExploreMarket /> */}
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
