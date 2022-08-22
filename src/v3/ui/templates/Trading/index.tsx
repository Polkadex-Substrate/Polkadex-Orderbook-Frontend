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
  selectCurrentMarket,
  selectCurrentTradePrice,
  selectHasBrowserTradeAccounts,
  selectHasUser,
} from "@polkadex/orderbook-modules";
import { useUserDataFetch } from "@polkadex/orderbook/hooks/useUserDataFetch";
import { AccountBanner, Popup } from "@polkadex/orderbook-ui/molecules";
import Markets, { MarketsSkeleton } from "@orderbook/v2/ui/organisms/Markets";
import Transactions, {
  TransactionsSkeleton,
} from "@polkadex/orderbook/v3/ui/organisms/Transactions";
import RecentTrades, { RecentTradesSkeleton } from "@orderbook/v2/ui/organisms/RecentTrades";
import Graph from "@polkadex/orderbook/v3/ui/organisms/Graph";
import MarketOrder from "@polkadex/orderbook/v3/ui/organisms/MarketOrder";
import { Modal } from "@polkadex/orderbook/v3/ui/molecules";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import Navbar from "@polkadex/orderbook/v3/ui/organisms/Navbar";

export function Trading() {
  const [state, setState] = useState(false);
  const [banner, setBanner] = useState(true);

  const dispatch = useDispatch();
  const { id } = useRouter().query;
  const hasUser = useReduxSelector(selectHasUser);
  const hasAccounts = useReduxSelector(selectHasBrowserTradeAccounts);

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
        <title>
          {currentTrade?.length && marketName?.length && `${currentTrade} | ${marketName} | `}
          Polkadex Orderbook
        </title>
        <meta name="description" content="The trading engine of Web3" />
      </Head>
      <S.Wrapper>
        <Menu handleChange={() => setState(!state)} />
        <Modal
          open={banner && !hasAccounts && hasUser}
          onClose={() => setBanner(false)}
          onOpen={() => setBanner(true)}
          placement="top right"
          isBlur>
          <Modal.Body>
            <AccountBanner onClose={() => setBanner(!banner)} />
          </Modal.Body>
        </Modal>
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
