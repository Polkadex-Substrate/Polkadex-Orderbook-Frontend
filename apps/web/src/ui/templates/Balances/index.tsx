// TODO: Verify why the translations are not working correctly
import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useTour } from "@reactour/tour";
import {
  BalancesTable,
  Header,
  Intro,
  Menu,
} from "@polkadex/orderbook-ui/organisms";
import {
  Checkbox,
  EmptyMyAccount,
  Footer,
  Search,
} from "@polkadex/orderbook-ui/molecules";
import { DEFAULTBALANCESINTRONAME } from "@orderbook/core/constants";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useMemo } from "react";
import { useAssets } from "@orderbook/core/hooks";

import * as S from "./styles";
import { TableSkeleton } from "./skeleton";

import { defaulIntrotStyles } from "@/styles/introStyles";

export const BalancesTemplate = () => {
  const { t } = useTranslation("balances");
  const { t: tc } = useTranslation("common");

  const { connecting } = useNativeApi();
  const { selectedAddresses } = useProfile();

  const userHasSelectedAccount = selectedAddresses?.mainAddress?.length > 0;

  const connectWalletData = {
    image: "emptyWallet",
    title: tc("connectTradingAccount.title"),
  };

  const { assets, filters, loading, onHideZeroBalance, onSearchToken } =
    useAssets();

  const showLoader = useMemo(
    () => connecting || loading,
    [connecting, loading]
  );

  return (
    <Intro
      active={!showLoader && !!userHasSelectedAccount && !!assets.length}
      localStorageName={DEFAULTBALANCESINTRONAME}
      steps={[
        {
          selector: ".depositButton",
          content: (
            <S.IntroCard>
              <span>What is Deposit?</span>
              <p>
                Deposit refers to the action of transferring tokens from either
                a Polkadot Parachain or the Polkadot Relay Chain into the
                Polkadex network for the purpose of trading.
              </p>
            </S.IntroCard>
          ),
          position: "bottom",
          styles: defaulIntrotStyles,
        },
        {
          selector: ".withdrawButton",
          content: (
            <S.IntroCard>
              <span>What is Withdrawal?</span>
              <p>
                Withdrawal refers to the action of transferring tokens from the
                Polkadex network to any other Polkadot Parachain or the Polkadot
                Relay Chain.
              </p>
            </S.IntroCard>
          ),
          position: "bottom",
          styles: defaulIntrotStyles,
        },
        {
          selector: ".transferButton",
          content: (
            <S.IntroCard>
              <span>What is Transfer?</span>
              <div>
                <p>
                  Transfer refers to the movement of tokens between your Funding
                  Account and your Trading Account within the Polkadex platform.
                  This transfer is primarily conducted to facilitate trading
                  activities, allowing you to allocate funds for trading or move
                  trading proceeds back to your Funding Account.
                </p>
                <p>
                  Additionally, you have the option to transfer tokens between
                  different Polkadex accounts, providing flexibility in managing
                  your assets within the Polkadex ecosystem.
                </p>
              </div>
            </S.IntroCard>
          ),
          position: "bottom",
          styles: defaulIntrotStyles,
        },
      ]}
    >
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content={t("description")} />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <Menu open />
          <S.Wrapper>
            <S.ContainerMain>
              <S.Header>
                <h1>{t("heading")}</h1>
                <h2>{t("subheading")}</h2>
              </S.Header>
              <S.Container>
                <S.Title>
                  <h2>{t("overview")}</h2>
                  <S.Filters>
                    <Search
                      value={filters.search}
                      onChange={onSearchToken}
                      isFull
                      placeholder={t("searchPlaceholder")}
                    />
                    <Checkbox
                      checked={filters.hideZero}
                      onChange={onHideZeroBalance}
                      labelProps={{ style: { whiteSpace: "nowrap" } }}
                    >
                      {t("hideSmallBalances")}
                    </Checkbox>
                  </S.Filters>
                </S.Title>
                <S.Content>
                  {showLoader ? (
                    <TableSkeleton />
                  ) : userHasSelectedAccount ? (
                    <BalancesTable assets={assets} />
                  ) : (
                    <EmptyMyAccount balances hasLimit {...connectWalletData} />
                  )}
                </S.Content>
              </S.Container>
              <S.Support>
                <SupportCard
                  title={t("troubleTitle")}
                  description={t("troubleDescription")}
                  href="https://discord.com/channels/859180272335323166/1034160372954964089"
                  buttonTitle={t("troubleButton")}
                  icon="Trouble"
                />
                <IntroCard />
              </S.Support>
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </Intro>
  );
};

const SupportCard = ({
  title,
  description,
  href,
  buttonTitle,
  icon,
  onClick,
}: {
  title: string;
  description: string;
  href?: string;
  buttonTitle: string;
  icon: "Trouble" | "TokenListing";
  onClick?: () => void;
}) => {
  const IconComponent = Icons[icon];
  return (
    <S.SupportCard>
      <S.SupportCardContainer>
        <div>
          <IconComponent />
        </div>
        <h4>{title}</h4>
        <p>{description}</p>
      </S.SupportCardContainer>
      {href ? (
        <Link href={href} target="_blank">
          {buttonTitle}
        </Link>
      ) : (
        <button type="button" onClick={onClick}>
          {buttonTitle}
        </button>
      )}
    </S.SupportCard>
  );
};

const IntroCard = () => {
  const { setIsOpen } = useTour();
  const { t } = useTranslation("balances");

  return (
    <SupportCard
      title={t("contributeTitle")}
      description={t("contributeDescription")}
      buttonTitle={t("contributeButton")}
      icon="TokenListing"
      onClick={() => setIsOpen(true)}
    />
  );
};
