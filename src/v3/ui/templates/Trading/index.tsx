import { setTimeout } from "timers";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
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
  selectAssociatedTradeAccounts,
  selectCurrentMarket,
  selectCurrentTradePrice,
  selectIsUserSignedIn,
  selectShouldShowInitialBanner,
  userChangeInitBanner,
} from "@polkadex/orderbook-modules";
import { useUserDataFetch } from "@polkadex/orderbook/hooks/useUserDataFetch";
import { AccountBanner, Popup } from "@polkadex/orderbook-ui/molecules";
import Markets from "@orderbook/v2/ui/organisms/Markets";
import Transactions from "@polkadex/orderbook/v3/ui/organisms/Transactions";
import RecentTrades from "@orderbook/v2/ui/organisms/RecentTrades";
import Graph from "@polkadex/orderbook/v3/ui/organisms/Graph";
import MarketOrder from "@polkadex/orderbook/v3/ui/organisms/MarketOrder";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import Navbar from "@polkadex/orderbook/v3/ui/organisms/Navbar";

export function Trading() {
  const [state, setState] = useState(false);
  const [banner, setBanner] = useState(false);

  const dispatch = useDispatch();
  const { id } = useRouter().query;

  useMarketsFetch(id as string);
  useMarketsTickersFetch();
  useOrderBookMarketsFetch();

  const market = useReduxSelector(selectCurrentMarket);
  const currentTrade = useReduxSelector(selectCurrentTradePrice);
  const shouldShowInitialBanner = useReduxSelector(selectShouldShowInitialBanner);
  const isSignedIn = useReduxSelector(selectIsUserSignedIn);
  const hasAssociatedAccounts = useReduxSelector(selectAssociatedTradeAccounts)?.length;

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

  const marketName = market?.name?.replace("/", "");

  useEffect(() => {
    if (isSignedIn && shouldShowInitialBanner && !hasAssociatedAccounts) {
      setBanner(true);
    }
  }, [isSignedIn, hasAssociatedAccounts, dispatch, shouldShowInitialBanner]);

  const closeBanner = () => {
    setBanner(false);
    dispatch(userChangeInitBanner());
  };

  console.log(
    "isSignedIn",
    isSignedIn,
    "shouldShowInitialBanner",
    shouldShowInitialBanner,
    "hasAssociatedAccounts",
    !!hasAssociatedAccounts
  );
  if (!id) return <div />;

  return (
    <>
      <Head>
        <title>
          {currentTrade?.length && marketName?.length && `${currentTrade} | ${marketName} | `}
          Polkadex Orderbook
        </title>
        <meta name="description" content="The trading engine of Web3" />
      </Head>
      <Popup
        isMessage
        isVisible={banner}
        onClose={closeBanner}
        style={{
          justifyContent: "flex-end",
          alignItems: "flex-start",
          paddingTop: "2rem",
        }}>
        <AccountBanner onClose={closeBanner} />
      </Popup>
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
      <S.Wrapper>
        <Menu handleChange={() => setState(!state)} />

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
    </>
  );
}
