import Head from "next/head";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { BalancesTable, Header, Menu } from "@polkadex/orderbook-ui/organisms";
import {
  Checkbox,
  EmptyMyAccount,
  Footer,
  Search,
} from "@polkadex/orderbook-ui/molecules";
import { useProfile } from "@orderbook/core/providers/user/profile";
import { useNativeApi } from "@orderbook/core/providers/public/nativeApi";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { useMemo } from "react";
import { useAssets } from "@orderbook/core/hooks";

import * as S from "./styles";
import { TableSkeleton } from "./skeleton";

export const BalancesTemplate = () => {
  const { t } = useTranslation("balances");
  const { t: tc } = useTranslation("common");

  const { connecting } = useNativeApi();
  const { auth, selectedAccount } = useProfile();

  const userHasSelectedAccount = selectedAccount?.mainAddress?.length > 0;

  const connectWalletData = {
    image: "emptyWallet",
    title: tc("connectTradingAccount.title"),
    description: tc("connectTradingAccount.description"),
    primaryLink: "/createAccount",
    primaryLinkTitle: tc("connectTradingAccount.primaryLinkTitle"),
    secondaryLink: "/wallets",
    secondaryLinkTitle: tc("connectTradingAccount.secondaryLinkTitle"),
  };

  const { assets, filters, loading, onHideZeroBalance, onSearchToken } =
    useAssets();

  const showLoader = useMemo(
    () => auth.isLoading || connecting || loading,
    [connecting, loading, auth?.isLoading]
  );

  return (
    <>
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
                  title="Having trouble"
                  description="We're available through Discord, so feel free to get in touch."
                  href="https://discord.com/invite/Uvua83QAzk"
                  buttonTitle="Contact us"
                  icon="Trouble"
                />
                <SupportCard
                  title="Contribute to Orderbook's growth!"
                  description="Share with us which tokens you'd like to see."
                  href="https://t.me/Polkadex"
                  buttonTitle="Send feedback"
                  icon="TokenListing"
                />
              </S.Support>
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};

const SupportCard = ({
  title,
  description,
  href,
  buttonTitle,
  icon,
}: {
  title: string;
  description: string;
  href: string;
  buttonTitle: string;
  icon: "Trouble" | "TokenListing";
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
      <Link href={href} target="_blank">
        {buttonTitle}
      </Link>
    </S.SupportCard>
  );
};
