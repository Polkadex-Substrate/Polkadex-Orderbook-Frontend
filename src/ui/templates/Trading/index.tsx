import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import Head from "next/head";

import { ShutdownInteraction } from "../ShutdownInteraction";

import * as S from "./styles";

import {
  AccountBanner,
  EmptyMyAccount,
  Footer,
  Icon,
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
  Header,
} from "@polkadex/orderbook-ui/organisms";
import { LOCAL_STORAGE_ID } from "@polkadex/web-constants";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useRecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
import { OrderHistoryProvider } from "@polkadex/orderbook/providers/user/orderHistoryProvider/provider";
import { useMarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/useMarketsProvider";
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

  const { currentMarket: market } = useMarketsProvider();

  const {
    authInfo: { isAuthenticated: isSignedIn, shouldShowInitialBanner },
    selectedAccount: { mainAddress },
    onUserChangeInitBanner,
  } = useProfile();

  const currentTrade = useRecentTradesProvider().getCurrentTradePrice();
  const profileState = useProfile();
  const hasTradeAccount = profileState.selectedAccount.tradeAddress !== "";
  const hasUser = isSignedIn && hasTradeAccount;

  const userAccounts = profileState.userData?.userAccounts;
  const accounts = userAccounts?.filter((account) => account.mainAddress === mainAddress);
  const hasAssociatedAccounts = accounts?.map((account) => account.tradeAddress)?.length;

  const { t } = useTranslation("trading");
  const { t: tc } = useTranslation("common");

  const hasSelectedAccount = isSignedIn &&
    !hasTradeAccount && {
      image: "emptyWallet",
      title: tc("connectTradingAccount.title"),
      description: tc("connectTradingAccount.description"),
      primaryLink: "/createAccount",
      primaryLinkTitle: tc("connectTradingAccount.primaryLinkTitle"),
      secondaryLink: "/settings",
      secondaryLinkTitle: tc("connectTradingAccount.secondaryLinkTitle"),
    };

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
          {currentTrade && marketName && `${currentTrade} | ${marketName} | `}{" "}
          {tc("polkadexOrderbook")}
        </title>
        <meta name="description" content="The trading engine of Web3" />
      </Head>
      <Modal open={shutdownBanner} isBlur onClose={() => setShutdownBanner(false)}>
        <ShutdownInteraction
          title={t("shutDown.title")}
          textLink={t("shutDown.textLink")}
          link="https://polkadex.medium.com/orderbook-v2-thea-and-crowdloan-rewards-are-now-live-on-kaizen-the-polkadex-test-net-7ca5c88855ad"
          footerText={t("shutDown.footerText")}
          buttonLink="https://t.me/Polkadex"
          textButton={t("shutDown.buttonText")}
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
          title={t("accountBanner.title")}
          description={t("accountBanner.description")}
          subDescription={t("accountBanner.subDescription")}
          closeButtonTitle={t("accountBanner.closeButtonText")}
          onClose={closeBanner}
          linkText={t("accountBanner.linkText")}
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
          <Header />
          <S.Flex>
            <Menu />
            <S.WrapperMain>
              <S.ContainerMain>
                <S.Content>
                  <S.WrapperGraph>
                    <S.CenterWrapper>
                      <S.GraphEpmty>
                        <KlineProvider>
                          <Navbar onOpenMarkets={() => setState(!state)} />
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
          </S.Flex>
        </S.Wrapper>
      </S.Container>
    </>
  );
}

export const Profile = ({
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
