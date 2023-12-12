import { useEffect, useMemo, useState } from "react";
import { useTranslation } from "next-i18next";
import Head from "next/head";
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
import { LOCAL_STORAGE_ID } from "@orderbook/core/constants";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { SessionProvider } from "@orderbook/core/providers/user/sessionProvider";
import { KlineProvider } from "@orderbook/core/providers/public/klineProvider";
import { defaultConfig } from "@orderbook/core/config";
import { useMarkets, useTickers } from "@orderbook/core/hooks";
import { getCurrentMarket } from "@orderbook/core/helpers";
import { WalletProvider } from "@orderbook/core/providers/user/walletProvider";
import {
  ExtensionAccountsProvider,
  ExtensionsProvider,
} from "@polkadex/react-providers";

import { ShutdownInteraction } from "../ShutdownInteraction";

import * as S from "./styles";

type Props = {
  market: string;
};

export function Trading({ market: id }: Props) {
  const shouldShowDisclaimer = useMemo(
    () =>
      process.browser &&
      window.localStorage.getItem(LOCAL_STORAGE_ID.DEFAULT_DISCLAIMER),
    []
  );

  const handleAcceptDisclaimer = () => {
    process.browser &&
      window.localStorage.setItem(LOCAL_STORAGE_ID.DEFAULT_DISCLAIMER, "true");
    setDisclaimer(false);
  };

  const [state, setState] = useState(false);
  const [shutdownBanner, setShutdownBanner] = useState(
    defaultConfig.showShutdownPopup
  );

  const [banner, setBanner] = useState(false);
  const [disclaimer, setDisclaimer] = useState(!shouldShowDisclaimer);

  const { list } = useMarkets();
  const market = getCurrentMarket(list, id);
  const {
    currentTicker: { currentPrice: currentTradePrice },
  } = useTickers(market?.id ?? "");

  const {
    authInfo: { shouldShowInitialBanner },
    selectedAccount: { mainAddress },
    onUserChangeInitBanner,
  } = useProfile();

  const profileState = useProfile();
  const hasTradeAccount = profileState.selectedAccount.tradeAddress !== "";
  const hasUser = hasTradeAccount;

  const userAccounts = profileState.userData?.userAccounts;
  const accounts = userAccounts?.filter(
    (account) => account.mainAddress === mainAddress
  );
  const hasAssociatedAccounts = accounts?.map((account) => account.tradeAddress)
    ?.length;

  const { t } = useTranslation("trading");
  const { t: tc } = useTranslation("common");

  const hasSelectedAccount = !hasTradeAccount && {
    image: "emptyWallet",
    title: tc("connectTradingAccount.title"),
    description: tc("connectTradingAccount.description"),
    primaryLink: "/wallets",
    primaryLinkTitle: tc("connectTradingAccount.primaryLinkTitle"),
    secondaryLink: "/wallets",
    secondaryLinkTitle: tc("connectTradingAccount.secondaryLinkTitle"),
  };

  const marketName = market?.name?.replace("/", "");

  useEffect(() => {
    if (shouldShowInitialBanner && !hasAssociatedAccounts) {
      setBanner(true);
    }
  }, [hasAssociatedAccounts, shouldShowInitialBanner]);

  const closeBanner = () => {
    setBanner(false);
    onUserChangeInitBanner();
  };

  if (!id) return <div />;

  return (
    <WalletProvider>
      <ExtensionsProvider>
        <ExtensionAccountsProvider
          ss58={88}
          dappName="Orderbook"
          network="wss://polkadex.public.curie.radiumblock.co/ws"
        >
          <Head>
            <title>
              {currentTradePrice &&
                marketName &&
                `${currentTradePrice} | ${marketName} | `}{" "}
              {tc("polkadexOrderbook")}
            </title>
            <meta name="description" content="The trading engine of Web3" />
          </Head>
          <Modal
            open={shutdownBanner}
            isBlur
            onClose={() => setShutdownBanner(false)}
          >
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
            open={disclaimer}
            onClose={handleAcceptDisclaimer}
            placement="start"
          >
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
              link="/wallets"
              heroAlt="Man in tie with open arms welcoming"
              heroImage="welcomeBack.svg"
            />
          </Modal>
          <Modal
            open={state}
            onClose={() => setState(false)}
            onOpen={() => setState(true)}
            placement="start left"
            isFullHeight
            isBlur
          >
            <Markets onClose={() => setState(false)} market={id} />
          </Modal>
          <S.Container>
            <S.Wrapper>
              <Header />
              <S.Flex>
                <Menu open={false} />
                <S.WrapperMain>
                  <S.ContainerMain>
                    <S.Content>
                      <S.WrapperGraph>
                        <S.CenterWrapper>
                          <S.GraphEpmty>
                            <KlineProvider>
                              <Navbar
                                onOpenMarkets={() => setState(!state)}
                                market={id}
                              />
                              <Graph market={id} />
                            </KlineProvider>
                            {hasUser ? (
                              <SessionProvider>
                                <Transactions market={id} />
                              </SessionProvider>
                            ) : (
                              <EmptyMyAccount
                                hasLimit
                                {...hasSelectedAccount}
                              />
                            )}
                          </S.GraphEpmty>
                          <S.WrapperRight>
                            <MarketOrder market={id} />
                            <RecentTrades market={id} />
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
        </ExtensionAccountsProvider>
      </ExtensionsProvider>
    </WalletProvider>
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
  const shortAddress =
    address?.slice(0, 10) + "..." + address?.slice(address?.length - 10);

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
