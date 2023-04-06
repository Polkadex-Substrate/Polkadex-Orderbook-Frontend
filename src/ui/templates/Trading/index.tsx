import React, { useEffect, useMemo, useState } from "react";
import { useDispatch } from "react-redux";
import { useRouter } from "next/router";
import Head from "next/head";

import * as S from "./styles";

import {
  useMarketsFetch,
  useMarketsTickersFetch,
  useReduxSelector,
} from "@polkadex/orderbook-hooks";
import {
  recentTradesFetch,
  selectCurrentMarket,
  selectCurrentTradePrice,
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
import { RecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
import { OrderHistoryProvider } from "@polkadex/orderbook/providers/user/orderHistoryProvider/provider";
import { useExtensionWallet } from "@polkadex/orderbook/providers/user/extensionWallet";
import { selectIsAddressInExtension } from "@polkadex/orderbook/providers/user/extensionWallet/helper";
import { SessionProvider } from "@polkadex/orderbook/providers/user/sessionProvider/provider";

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
  const [banner, setBanner] = useState(false);
  const [disclaimer, setDisclaimer] = useState(!shouldShowDisclaimer);

  const router = useRouter();
  const dispatch = useDispatch();
  const { id } = useRouter().query;

  useMarketsFetch(id as string);
  useMarketsTickersFetch();

  const { email } = useAuth();
  const {
    authInfo: { isAuthenticated: isSignedIn, shouldShowInitialBanner },
    selectedAccount: { mainAddress },
  } = useProfile();
  const extensionWalletState = useExtensionWallet();

  const market = useReduxSelector(selectCurrentMarket);
  const currentTrade = useReduxSelector(selectCurrentTradePrice);
  const profileState = useProfile();
  const hasTradeAccount = profileState.selectedAccount.tradeAddress !== "";
  const hasUser = isSignedIn && hasTradeAccount;
  const hasMainAccount = selectIsAddressInExtension(
    mainAddress,
    extensionWalletState.allAccounts
  );

  const userAccounts = profileState.userData.userAccounts;
  const accounts = userAccounts.filter((account) => account.mainAddress === mainAddress);
  const hasAssociatedAccounts = accounts.map((account) => account.tradeAddress)?.length;

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

  // intitialize market dependent events
  useEffect(() => {
    if (market) {
      // dispatch(rangerConnectFetch());
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
      <Modal
        open={isSignedIn && disclaimer}
        onClose={handleAcceptDisclaimer}
        placement="start">
        <Disclaimer onClose={handleAcceptDisclaimer} />
      </Modal>
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
                      <Graph />
                      {hasUser ? (
                        <SessionProvider>
                          <OrderHistoryProvider>
                            <Transactions />
                          </OrderHistoryProvider>
                        </SessionProvider>
                      ) : (
                        <EmptyMyAccount hasLimit {...hasSelectedAccount} />
                      )}
                    </S.GraphEpmty>
                    <S.WrapperRight>
                      <MarketOrder />
                      <RecentTradesProvider>
                        <RecentTrades />
                      </RecentTradesProvider>
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
