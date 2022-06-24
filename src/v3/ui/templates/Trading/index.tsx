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
  marketsTickersFetch,
  orderBookFetch,
  selectCurrentMarket,
  selectCurrentMarketTickers,
  selectCurrentTrade,
  selectLastRecentTrade,
} from "@polkadex/orderbook-modules";
import { updateTickerWithTrade } from "@polkadex/orderbook/helpers/updateTickerWithTrade";
import { useUserDataFetch } from "@polkadex/orderbook/hooks/useUserDataFetch";
import { Popup } from "@polkadex/orderbook-ui/molecules";

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
      // dispatch(rangerConnectFetch());
      dispatch(orderBookFetch(market));
    }
  }, [dispatch, market]);

  // initialize user specific sagas
  useUserDataFetch();

  if (!id) return <div />;
  return (
    <S.Wrapper>
      <Menu handleChange={() => setState(!state)} />
      <Popup
        isVisible={state}
        onClose={() => setState(!state)}
        size="fitContent"
        isRightPosition
        style={{
          maxWidth: "192rem",
          margin: "0 auto",
        }}>
        <Markets />
      </Popup>
      <S.WrapperMain>
        <Navbar onOpenMarkets={() => setState(!state)} />
        <S.WrapperGraph>
          <Graph />
          <MarketOrder />
        </S.WrapperGraph>
        <S.BottomWrapper>
          <Transactions />
          <RecentTrades />
        </S.BottomWrapper>
      </S.WrapperMain>
    </S.Wrapper>
  );
}
