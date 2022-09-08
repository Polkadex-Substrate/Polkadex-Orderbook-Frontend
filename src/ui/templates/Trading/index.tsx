import React, { useEffect, useState } from "react";
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
import { AccountBanner, Button, Logo, Modal } from "@polkadex/orderbook-ui/molecules";
import Markets from "@polkadex/orderbook-ui/organisms/Markets";
import Transactions from "@polkadex/orderbook/v3/ui/organisms/Transactions";
import RecentTrades from "@orderbook/v2/ui/organisms/RecentTrades";
import Graph from "@polkadex/orderbook/v3/ui/organisms/Graph";
import MarketOrder from "@polkadex/orderbook/v3/ui/organisms/MarketOrder";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import Navbar from "@polkadex/orderbook/v3/ui/organisms/Navbar";

export function Trading() {
  const [state, setState] = useState(false);
  const [banner, setBanner] = useState(false);

  const router = useRouter();
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
      <Modal open={banner} onClose={closeBanner} placement="top right">
        <AccountBanner onClose={closeBanner} />
      </Modal>
      <Modal
        open={state}
        onClose={() => setState(false)}
        onOpen={() => setState(true)}
        placement="start left"
        isFullHeight>
        <Markets />
      </Modal>
      <S.Container>
        <S.Wrapper>
          <Menu handleChange={() => setState(!state)} isWallet={false} />
          <S.WrapperMain>
            <S.Box>
              <S.Logo>
                <Logo size="Medium" href="/trading" />
              </S.Logo>
              {!isSignedIn && (
                <Button
                  onClick={() => router.push("/signIn")}
                  color="white"
                  icon={{
                    name: "Wallet",
                    background: "black",
                    size: "extraMedium",
                    stroke: "white",
                  }}>
                  Login/Sign Up
                </Button>
              )}
            </S.Box>
            <S.Content>
              <S.WrapperGraph>
                <Navbar onOpenMarkets={() => setState(!state)} />
                <Graph />
                <Transactions />
              </S.WrapperGraph>
              <S.WrapperRight>
                <S.Actions>
                  {!isSignedIn && (
                    <Button
                      onClick={() => router.push("/signIn")}
                      color="black"
                      isFull
                      icon={{
                        name: "Wallet",
                        background: "black",
                        size: "extraMedium",
                        stroke: "white",
                        fill: "white",
                      }}>
                      Login/Sign Up
                    </Button>
                  )}
                </S.Actions>
                <MarketOrder />
                <RecentTrades />
              </S.WrapperRight>
            </S.Content>
          </S.WrapperMain>
        </S.Wrapper>
      </S.Container>
    </>
  );
}
