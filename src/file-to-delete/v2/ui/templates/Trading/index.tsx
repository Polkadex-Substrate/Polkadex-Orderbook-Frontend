import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import { useDispatch } from "react-redux";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { Popup } from "@polkadex/orderbook/file-to-delete/ui/molecules/Popup";
import {
  useMarketsFetch,
  useMarketsTickersFetch,
  useOrderBookMarketsFetch,
  useReduxSelector,
} from "@polkadex/orderbook-hooks";
import {
  orderBookChannelFetch,
  orderBookFetch,
  selectCurrentMarket,
  selectCurrentMarketTickers,
  selectCurrentTradePrice,
  selectHasCurrentTradeAccount,
  selectLastTradePrice,
} from "@polkadex/orderbook-modules";
import { updateTickerWithTrade } from "@polkadex/orderbook/helpers/updateTickerWithTrade";
import { useUserDataFetch } from "@polkadex/orderbook/hooks/useUserDataFetch";

const Header = dynamic(
  () =>
    import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/Header").then(
      (mod) => mod.Header
    ),
  {
    ssr: false,
  }
);
const Footer = dynamic(
  () =>
    import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/Footer").then(
      (mod) => mod.Footer
    ),
  {
    ssr: false,
  }
);
// const Orderbook = dynamic(
//   () => import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/Orderbook"),
//   {
//     ssr: false,
//   }
// );
const Chart = dynamic(
  () => import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/Chart"),
  {
    ssr: false,
  }
);
const News = dynamic(() => import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/News"), {
  ssr: false,
});
// const MyOrders = dynamic(
//   () => import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/MyOrders"),
//   {
//     ssr: false,
//   }
// );
const PlaceOrder = dynamic(
  () => import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/PlaceOrder"),
  {
    ssr: false,
  }
);
// const RecentTrades = dynamic(
//   () => import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/RecentTrades"),
//   {
//     ssr: false,
//   }
// );
const Information = dynamic(
  () => import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/Information"),
  {
    ssr: false,
  }
);
const Markets = dynamic(() => import("@polkadex/orderbook-ui/organisms/Markets"), {
  ssr: false,
});
// const ExploreMarket = dynamic(
//   () => import("@polkadex/orderbook/file-to-delete/v2/ui/organisms/ExploreMarket").then((mod) => mod.ExploreMarket),
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

  const hasUser = useReduxSelector(selectHasCurrentTradeAccount);
  const market = useReduxSelector(selectCurrentMarket);
  const currentTrade = useReduxSelector(selectCurrentTradePrice);
  const lastTrade = useReduxSelector(selectLastTradePrice);
  const currentTicker = useReduxSelector(selectCurrentMarketTickers);
  // intitialize market dependent events
  useEffect(() => {
    if (market?.m) {
      dispatch(orderBookFetch(market));
      dispatch(orderBookChannelFetch(market));
    }
  }, [dispatch, market]);

  // initialize user specific sagas
  useUserDataFetch();

  // intiatilize trade specific events
  useEffect(() => {
    if (currentTrade && lastTrade) {
      const updatedTicker = updateTickerWithTrade(currentTrade, currentTicker);
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
          {/* <Orderbook /> */}
        </S.Container>
        <PlaceOrder />
        {/* <MyOrders />
        <RecentTrades /> */}
      </S.Wrapper>
      <Footer />
    </S.Main>
  );
};
