import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Head from "next/head";

import { ShutdownInteraction } from "../ShutdownInteraction";

import * as S from "./styles";

import {
  AccountBanner,
  Button,
  EmptyMyAccount,
  Footer,
  Icon,
  Logo,
  Modal,
} from "@polkadex/orderbook-ui/molecules";
import {
  Markets,
  Transactions,
  Graph,
  MarketOrder,
  Menu,
  Navbar,
  RecentTrades,
  Disclaimer,
} from "@polkadex/orderbook-ui/organisms";
import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";
import { useAuth } from "@polkadex/orderbook/providers/user/auth";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useRecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
import { OrderHistoryProvider } from "@polkadex/orderbook/providers/user/orderHistoryProvider/provider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { selectIsAddressInExtension } from "@polkadex/orderbook/providers/user/extensionWallet/helper";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { SessionProvider } from "@polkadex/orderbook/providers/user/sessionProvider/provider";
import { KlineProvider } from "@polkadex/orderbook/providers/public/klineProvider/provider";
import { TradesProvider } from "@polkadex/orderbook/providers/user/trades/provider";
import { defaultConfig } from "@polkadex/orderbook-config";

export function Trading() {
  const shouldShowDisclaimer = useMemo(
    () => process.browser && window.localStorage.getItem(LOCAL_STORAGE_ID.DEFAULT_DISCLAIMER),
    []
  );

  const handleAcceptDisclaimer = () => {
    process.browser &&
      window.localStorage.setItem(LOCAL_STORAGE_ID.DEFAULT_DISCLAIMER, "true");
    setDisclaimer(false);
  };

  const [state, setState] = useState(false);
  const [shutdownBanner, setShutdownBanner] = useState(defaultConfig.showShutdownPopup);

  const [banner, setBanner] = useState(false);
  const [disclaimer, setDisclaimer] = useState(!shouldShowDisclaimer);

  const router = useRouter();
  const { id } = router?.query;

  const {
    loading: isMarketLoading,
    timestamp,
    onMarketsFetch,
    list: markets,
    setCurrentMarket,
    currentMarket: market,
    tickersTimestamp,
    onMarketTickersFetch,
  } = useMarketsProvider();

  const shouldDispatchMarketsFetch = useCallback(() => {
    return !isMarketLoading && !timestamp;
  }, [isMarketLoading, timestamp]);

  const selectMarket = markets.find(
    (item) => `${item.base_ticker}${item.quote_ticker}` === id
  );

  const { list: allAssets } = useAssetsProvider();

  useEffect(() => {
    if (shouldDispatchMarketsFetch()) {
      onMarketsFetch(allAssets);
    } else if (!shouldDispatchMarketsFetch && markets && selectMarket?.id)
      setCurrentMarket(selectMarket);
  }, [
    shouldDispatchMarketsFetch,
    markets,
    selectMarket,
    allAssets,
    onMarketsFetch,
    setCurrentMarket,
  ]);

  useEffect(() => {
    if (!market?.id && !tickersTimestamp) {
      onMarketTickersFetch();
    }
  }, [market, onMarketTickersFetch, tickersTimestamp]);

  const { email } = useAuth();
  const {
    authInfo: { isAuthenticated: isSignedIn, shouldShowInitialBanner },
    selectedAccount: { mainAddress },
    onUserChangeInitBanner,
  } = useProfile();
  const extensionWalletState = useExtensionWallet();

  const currentTrade = useRecentTradesProvider().getCurrentTradePrice();
  const profileState = useProfile();
  const hasTradeAccount = profileState.selectedAccount.tradeAddress !== "";
  const hasUser = isSignedIn && hasTradeAccount;
  const hasMainAccount = selectIsAddressInExtension(
    mainAddress,
    extensionWalletState.allAccounts
  );

  const userAccounts = profileState.userData?.userAccounts;
  const accounts = userAccounts?.filter((account) => account.mainAddress === mainAddress);
  const hasAssociatedAccounts = accounts?.map((account) => account.tradeAddress)?.length;

  const { selectedAccount } = useProfile();

  const currentMainAddr = selectedAccount.mainAddress;
  const currentTradeAddr = selectedAccount.tradeAddress;
  const hasSelectedAccount = isSignedIn &&
    !hasTradeAccount && {
      image: "emptyWallet",
      title: "Connect your Trading Account",
      description: "Import your existing account, or create a new account",
      primaryLink: "/createAccount",
      primaryLinkTitle: "Create Account",
      secondaryLink: "/settings",
      secondaryLinkTitle: "Select Account",
    };

  // initialize user specific sagas

  const marketName = market?.name?.replace("/", "");

  useEffect(() => {
    if (isSignedIn && shouldShowInitialBanner && !hasAssociatedAccounts) {
      setBanner(true);
    }
  }, [isSignedIn, hasAssociatedAccounts, shouldShowInitialBanner]);

  const closeBanner = () => {
    setBanner(false);
    onUserChangeInitBanner();
  };

  if (!id) return <div />;

  return (
    <>
      <Head>
        <title>
          {currentTrade && marketName && `${currentTrade} | ${marketName} | `} Polkadex
          Orderbook
        </title>
        <meta name="description" content="The trading engine of Web3" />
      </Head>
      <Modal open={shutdownBanner} isBlur onClose={() => setShutdownBanner(false)}>
        <ShutdownInteraction
          title="Orderbook v1 will go offline as it is upgraded to v2"
          textLink="Read the full statement"
          link="https://polkadex.medium.com/orderbook-v2-thea-and-crowdloan-rewards-are-now-live-on-kaizen-the-polkadex-test-net-7ca5c88855ad"
          footerText="Join our Telegram for more updates!"
          buttonLink="https://t.me/Polkadex"
          textButton="Join Telegram"
          onClose={() => setShutdownBanner(false)}
        />
      </Modal>
      <Modal
        open={isSignedIn && disclaimer}
        onClose={handleAcceptDisclaimer}
        placement="start">
        <Disclaimer onClose={handleAcceptDisclaimer} />
      </Modal>
      <Modal open={banner} onClose={closeBanner} placement="top right">
        <AccountBanner
          title="Welcome back!"
          description="Looks like you’re using this browser for the first time."
          subDescription="Please create a new trading account."
          closeButtonTitle="Close"
          onClose={closeBanner}
          linkText="Create Account"
          link="/settings"
          heroAlt="Man in tie with open arms welcoming"
          heroImage="welcomeBack.svg"
        />
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
          <Menu />
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
                    icon={{
                      name: "Wallet",
                      background: "inverse",
                      size: "medium",
                      stroke: "text",
                      fill: "text",
                    }}>
                    Login/Sign Up
                  </Button>
                ) : (
                  <S.Profile>
                    <Profile
                      hasTradeAccount={hasTradeAccount}
                      hasMainAccount={hasMainAccount}
                      currentMainAccount={currentMainAddr}
                      currentTradeAccount={currentTradeAddr}
                      email={email}
                    />
                  </S.Profile>
                )}
              </S.Box>
              <S.Content>
                <S.WrapperGraph>
                  <S.Header>
                    <Navbar onOpenMarkets={() => setState(!state)} />
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
                            size: "medium",
                            stroke: "text",
                            fill: "text",
                          }}>
                          Login/Sign Up
                        </Button>
                      ) : (
                        <S.Profile>
                          <Profile
                            hasTradeAccount={hasTradeAccount}
                            hasMainAccount={hasMainAccount}
                            currentMainAccount={currentMainAddr}
                            currentTradeAccount={currentTradeAddr}
                            email={email}
                          />
                        </S.Profile>
                      )}
                    </S.Actions>
                  </S.Header>
                  <S.CenterWrapper>
                    <S.GraphEpmty>
                      <KlineProvider>
                        <Graph />
                      </KlineProvider>
                      {hasUser ? (
                        <SessionProvider>
                          <TradesProvider>
                            <OrderHistoryProvider>
                              <Transactions />
                            </OrderHistoryProvider>
                          </TradesProvider>
                        </SessionProvider>
                      ) : (
                        <EmptyMyAccount hasLimit {...hasSelectedAccount} />
                      )}
                    </S.GraphEpmty>
                    <S.WrapperRight>
                      <MarketOrder />
                      <RecentTrades />
                    </S.WrapperRight>
                  </S.CenterWrapper>
                </S.WrapperGraph>
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
