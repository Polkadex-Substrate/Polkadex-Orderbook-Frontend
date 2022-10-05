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
  selectAssociatedTradeAddresses,
  selectCurrentMarket,
  selectCurrentTradePrice,
  selectHasSelectedAccount,
  selectIsAddressInExtension,
  selectIsUserSignedIn,
  selectShouldShowInitialBanner,
  selectUserIdentity,
  selectUsingAccount,
  userChangeInitBanner,
} from "@polkadex/orderbook-modules";
import { useUserDataFetch } from "@polkadex/orderbook/hooks/useUserDataFetch";
import {
  AccountBanner,
  Button,
  EmptyMyAccount,
  Footer,
  Icon,
  Logo,
  Modal,
} from "@polkadex/orderbook-ui/molecules";
import Markets from "@polkadex/orderbook-ui/organisms/Markets";
import Transactions from "@polkadex/orderbook/v3/ui/organisms/Transactions";
import Graph from "@polkadex/orderbook/v3/ui/organisms/Graph";
import MarketOrder from "@polkadex/orderbook/v3/ui/organisms/MarketOrder";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import Navbar from "@polkadex/orderbook/v3/ui/organisms/Navbar";
import { RecentTrades } from "@polkadex/orderbook-ui/organisms";

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
  const hasTradeAccount = useReduxSelector(selectHasSelectedAccount);
  const hasUser = isSignedIn && hasTradeAccount;
  const email = useReduxSelector(selectUserIdentity);
  const { linkedMainAddress } = useReduxSelector(selectUsingAccount);
  const hasMainAccount = useReduxSelector(selectIsAddressInExtension(linkedMainAddress));
  const hasAssociatedAccounts = useReduxSelector(
    selectAssociatedTradeAddresses(linkedMainAddress)
  )?.length;

  const currentMainAddr = useReduxSelector(selectUsingAccount).linkedMainAddress;
  const currentTradeAddr = useReduxSelector(selectUsingAccount).selectedTradeAddress;

  const hasSelectedAccount = isSignedIn &&
    !hasTradeAccount && {
      image: "emptyWallet",
      title: "Connect your Trading Account",
      description: "Import your existing wallet, or create a new wallet",
      primaryLink: "/createAccount",
      primaryLinkTitle: "Create Account",
      secondaryLink: "/accountManager",
      secondaryLinkTitle: "Select Account",
    };

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
        <Markets onClose={() => setState(false)} />
      </Modal>
      <S.Container>
        <S.Wrapper>
          <Menu handleChange={() => setState(!state)} isWallet={false} />
          <S.WrapperMain>
            <S.ContainerMain>
              <S.Box>
                <S.Logo>
                  <Logo size="Medium" href="/trading" />
                </S.Logo>
                {!isSignedIn ? (
                  <Button
                    onClick={() => router.push("/signIn")}
                    color="inverse"
                    background="text"
                    isFull
                    icon={{
                      name: "Wallet",
                      background: "inverse",
                      size: "extraMedium",
                      stroke: "text",
                      fill: "text",
                    }}>
                    Login/Sign Up
                  </Button>
                ) : (
                  <Profile
                    hasTradeAccount={hasTradeAccount}
                    hasMainAccount={hasMainAccount}
                    currentMainAccount={currentMainAddr}
                    currentTradeAccount={currentTradeAddr}
                    email={email}
                  />
                )}
              </S.Box>
              <S.Content>
                <S.WrapperGraph>
                  <Navbar onOpenMarkets={() => setState(!state)} />
                  <Graph />
                  {hasUser ? (
                    <Transactions />
                  ) : (
                    <EmptyMyAccount hasLimit {...hasSelectedAccount} />
                  )}
                </S.WrapperGraph>
                <S.WrapperRight>
                  <S.Actions isSignedIn={isSignedIn}>
                    {!isSignedIn ? (
                      <Button
                        onClick={() => router.push("/signIn")}
                        color="inverse"
                        background="text"
                        style={{ alignSelf: "flex-end" }}
                        icon={{
                          name: "Wallet",
                          background: "inverse",
                          size: "extraMedium",
                          stroke: "text",
                          fill: "text",
                        }}>
                        Login/Sign Up
                      </Button>
                    ) : (
                      <Profile
                        hasTradeAccount={hasTradeAccount}
                        hasMainAccount={hasMainAccount}
                        currentMainAccount={currentMainAddr}
                        currentTradeAccount={currentTradeAddr}
                        email={email}
                      />
                    )}
                  </S.Actions>
                  <MarketOrder />
                  <RecentTrades />
                </S.WrapperRight>
              </S.Content>
            </S.ContainerMain>
            <Footer />
          </S.WrapperMain>
        </S.Wrapper>
      </S.Container>
    </>
  );
}

const Profile = ({
  hasTradeAccount,
  hasMainAccount,
  currentMainAccount,
  currentTradeAccount,
  email,
}) => {
  const address = hasTradeAccount ? currentTradeAccount : currentMainAccount;
  const shortAddress = address?.slice(0, 10) + "..." + address?.slice(address?.length - 10);

  return (
    <S.Profile>
      <Icon
        name={hasTradeAccount || hasMainAccount ? "Wallet" : "Email"}
        background="secondaryBackgroundOpacity"
        size="large"
        stroke="text"
      />
      <span>{address.length ? shortAddress : email}</span>
    </S.Profile>
  );
};
