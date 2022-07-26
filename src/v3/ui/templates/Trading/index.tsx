import React, { Suspense, useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import Head from "next/head";

import * as S from "./styles";

import {
  useMarketsFetch,
  useMarketsTickersFetch,
  useOrderBookMarketsFetch,
  useReduxSelector,
} from "@polkadex/orderbook-hooks";
import {
  orderBookFetch,
  recentTradesFetch,
  selectCurrentMarket,
  selectCurrentTradePrice,
} from "@polkadex/orderbook-modules";
import { useUserDataFetch } from "@polkadex/orderbook/hooks/useUserDataFetch";
import { Popup } from "@polkadex/orderbook-ui/molecules";
import { MarketsSkeleton } from "@orderbook/v2/ui/organisms/Markets";
import { TransactionsSkeleton } from "@polkadex/orderbook/v3/ui/organisms/Transactions";
import { RecentTradesSkeleton } from "@orderbook/v2/ui/organisms/RecentTrades";
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
  const currentTrade = useReduxSelector(selectCurrentTradePrice);

  // intitialize market dependent events
  useEffect(() => {
    if (market) {
      // dispatch(rangerConnectFetch());
      dispatch(orderBookFetch(market));
      dispatch(recentTradesFetch(market));
    }
  }, [dispatch, market]);

  // initialize user specific sagas
  useUserDataFetch();

  if (!id) return <div />;
  const marketName = market?.name?.replace("/", "");
  return (
    <>
      <Head>
        <title>Trading | Polkadex Orderbook</title>
        <meta name="description" content="The trading engine of Web3" />
      </Head>
      <S.Wrapper>
        <Head>
          <title>
            {currentTrade?.length &&
              marketName?.length &&
              `${currentTrade} | ${marketName} | `}
            Polkadex Orderbook
          </title>
        </Head>
        <Menu handleChange={() => setState(!state)} />
        <Popup
          isMessage
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
            <Suspense fallback={<MarketsSkeleton />}>
              <Graph />
            </Suspense>
            <Suspense fallback={<MarketsSkeleton />}>
              <MarketOrder />
            </Suspense>
          </S.WrapperGraph>
          <S.BottomWrapper>
            <Suspense fallback={<TransactionsSkeleton />}>
              <Transactions />
            </Suspense>
            <Suspense fallback={<RecentTradesSkeleton />}>
              <RecentTrades />
            </Suspense>
          </S.BottomWrapper>
        </S.WrapperMain>
      </S.Wrapper>
    </>
  );
}
