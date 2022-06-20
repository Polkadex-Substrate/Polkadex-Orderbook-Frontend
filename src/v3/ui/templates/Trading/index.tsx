import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

import * as S from "./styles";

import {
  useMarketsFetch,
  useMarketsTickersFetch,
  useOrderBookMarketsFetch,
  useReduxSelector,
} from "@polkadex/orderbook-hooks";
import {
  currentTickerFetch,
  currentTickersUpdate,
  orderBookFetch,
  selectCurrentMarket,
  selectCurrentMarketTickers,
  selectCurrentTrade,
  selectLastRecentTrade,
} from "@polkadex/orderbook-modules";
import { updateTickerWithTrade } from "@polkadex/orderbook/helpers/updateTickerWithTrade";
import { useUserDataFetch } from "@polkadex/orderbook/hooks/useUserDataFetch";

const Markets = dynamic(() => import("@orderbook/v2/ui/organisms/Markets"), {
  ssr: false,
});

const Graph = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Graph"), {
  ssr: false,
});

const MarketOrder = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/MarketOrder"), {
  ssr: false,
});

const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});

const Navbar = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Navbar"), {
  ssr: false,
});

const Transactions = dynamic(
  () => import("@polkadex/orderbook/v3/ui/organisms/Transactions"),
  {
    ssr: false,
  }
);

const RecentTrades = dynamic(() => import("@orderbook/v2/ui/organisms/RecentTrades"), {
  ssr: false,
});

export function Trading() {
  const [state, setState] = useState(false);
  const dispatch = useDispatch();
  const { id } = useRouter().query;
  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useOrderBookMarketsFetch();

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
  useUserDataFetch();

  // intiatilize trade specific events
  useEffect(() => {
    if (currentTrade && lastTrade) {
      const updatedTicker = updateTickerWithTrade(currentTrade, currentTicker);
      dispatch(currentTickersUpdate(updatedTicker));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentTrade, dispatch, lastTrade]);

  if (!id) return <div />;
  return (
    <S.Wrapper>
      <Menu handleChange={() => setState(!state)} />
      {state && <Markets />}
      <S.WrapperMain>
        <Navbar onOpenMarkets={() => setState(!state)} />
        <S.WrapperGraph>
          <Graph />
          <MarketOrder />
        </S.WrapperGraph>
        <S.BottomWrapper>
          <Transactions data={[]} remove={() => console.log("remove")} />
          <RecentTrades />
        </S.BottomWrapper>
      </S.WrapperMain>
    </S.Wrapper>
  );
}
