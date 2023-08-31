import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/router";

import * as S from "./styles";

import { Header, Menu } from "@polkadex/orderbook-ui/organisms";
import {
  Checkbox,
  EmptyMyAccount,
  Footer,
  Icon,
  ResultFound,
  Search,
  Table,
} from "@polkadex/orderbook-ui/molecules";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useBalancesProvider } from "@polkadex/orderbook/providers/user/balancesProvider/useBalancesProvider";
import { useNativeApi } from "@polkadex/orderbook/providers/public/nativeApi";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import { defaultConfig } from "@polkadex/orderbook-config";
import { POLKADEX_ASSET } from "@polkadex/web-constants";
import { Keyboard } from "@polkadex/orderbook-ui/molecules/LoadingIcons";

export const BalancesTemplate = () => {
  const { t } = useTranslation("balances");
  const { t: tc } = useTranslation("common");

  const [filters, setFilters] = useState({ search: "", hideZero: false });

  const { list, loading: isAssetsFetching } = useAssetsProvider();
  const { balances: userBalances, loading: isBalanceFetching } = useBalancesProvider();
  const { connecting } = useNativeApi();
  const profileState = useProfile();

  const userHasSelectedAccount = profileState?.selectedAccount?.mainAddress?.length > 0;

  const allAssets = useMemo(
    () =>
      list?.filter((e) => {
        const tokenBalance = userBalances?.find((value) => value.assetId === e.assetId);
        // TODO: Define small amount based on the decimals of the token.
        const hasZeroAmount =
          filters.hideZero && Number(tokenBalance?.free_balance || 0) < 0.001;

        const matchesNameOrTicker =
          e.name.toLowerCase().includes(filters.search.toLowerCase()) ||
          e.symbol.toLowerCase().includes(filters.search.toLowerCase());
        return (
          (matchesNameOrTicker &&
            !hasZeroAmount &&
            !defaultConfig.blockedAssets?.some((value) => e.assetId === value)) ||
          e.assetId === POLKADEX_ASSET.assetId
        );
      }),
    [filters.search, list, userBalances, filters.hideZero]
  );

  const pdexIndex = allAssets.findIndex(
    (obj) =>
      obj.symbol.toUpperCase() === POLKADEX_ASSET.symbol ||
      obj.name.toUpperCase() === POLKADEX_ASSET.name
  );
  const pdexObj = pdexIndex >= 0 && allAssets.splice(pdexIndex, 1)[0];
  allAssets.sort((a, b) => a.name.localeCompare(b.name));

  if (pdexObj) {
    allAssets.unshift(pdexObj);
  }

  const connectWalletData = {
    image: "emptyWallet",
    title: tc("connectTradingAccount.title"),
    description: tc("connectTradingAccount.description"),
    primaryLink: "/createAccount",
    primaryLinkTitle: tc("connectTradingAccount.primaryLinkTitle"),
    secondaryLink: "/settings",
    secondaryLinkTitle: tc("connectTradingAccount.secondaryLinkTitle"),
  };
  const router = useRouter();

  const showLoader =
    isAssetsFetching || isBalanceFetching || profileState.auth.isLoading || connecting;

  return (
    <>
      <Head>
        <title>{t("title")}</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Header />
        <S.Flex>
          <Menu />
          <S.Wrapper>
            <S.ContainerMain>
              <S.Title>
                <S.Back onClick={() => router.back()}>
                  <Icons.SingleArrowLeft />
                </S.Back>
                <h1>{t("heading")}</h1>
              </S.Title>
              <S.Container>
                {showLoader ? (
                  <S.LoadingWrapper>
                    <Keyboard color="primary" />
                  </S.LoadingWrapper>
                ) : userHasSelectedAccount ? (
                  <>
                    <S.Header>
                      <h2>{t("overview")}</h2>
                      <S.HeaderBox>
                        <Search
                          value={filters.search}
                          onChange={(e) => setFilters({ ...filters, search: e.target.value })}
                          isFull
                          placeholder={t("searchPlaceholder")}
                        />
                        <Checkbox
                          checked={filters.hideZero}
                          onChange={() =>
                            setFilters({ ...filters, hideZero: !filters.hideZero })
                          }>
                          {t("hideSmallBalances")}
                        </Checkbox>
                      </S.HeaderBox>
                    </S.Header>
                    <S.Content>
                      {allAssets?.length ? (
                        <Table aria-label="Polkadex assets" style={{ width: "100%" }}>
                          <Table.Header fill="none">
                            <Table.Column>
                              <S.Column style={{ paddingLeft: 10 }}>{t("name")}</S.Column>
                            </Table.Column>
                            <Table.Column>
                              <S.Column>{t("tradingAccount")}</S.Column>
                            </Table.Column>
                            <Table.Column>
                              <S.Column>{t("fundingAccount")}</S.Column>
                            </Table.Column>
                            <Table.Column>
                              <S.Column>{t("inOrders")}</S.Column>
                            </Table.Column>
                            <Table.Column>
                              <S.Column>{t("actions")}</S.Column>
                            </Table.Column>
                          </Table.Header>
                          <Table.Body striped border="squared">
                            {allAssets?.map((item) => {
                              const balance = userBalances?.find(
                                (value) => value.assetId === item.assetId
                              );
                              return (
                                <Table.Row key={item.assetId}>
                                  <Table.Cell>
                                    <S.CellFlex>
                                      <S.TokenIcon>
                                        <Icon isToken name={item.symbol} size="extraSmall" />
                                      </S.TokenIcon>
                                      <S.Cell>
                                        <span>
                                          {item.name} <small> {item.symbol}</small>
                                        </span>
                                      </S.Cell>
                                    </S.CellFlex>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <S.Cell>
                                      <span>
                                        {Number(balance?.free_balance || 0).toFixed(8)}{" "}
                                      </span>
                                    </S.Cell>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <S.Cell
                                      className={
                                        item.symbol === POLKADEX_ASSET.symbol && "pdexCell"
                                      }>
                                      <span>
                                        {Number(balance?.onChainBalance || 0).toFixed(8)}{" "}
                                      </span>
                                    </S.Cell>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <S.Cell
                                      className={
                                        item.symbol === POLKADEX_ASSET.symbol && "pdexCell"
                                      }>
                                      <span>
                                        {Number(balance?.reserved_balance || 0).toFixed(8)}{" "}
                                      </span>
                                    </S.Cell>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <S.Actions>
                                      <Link href={`/deposit/${item.symbol}`}>
                                        <S.DepositLink
                                          className={
                                            item.symbol === POLKADEX_ASSET.symbol && "disabled"
                                          }>
                                          {tc("deposit")}
                                        </S.DepositLink>
                                      </Link>
                                      <Link href={`/withdraw/${item.symbol}`}>
                                        <S.WithdrawLink
                                          className={
                                            item.symbol === POLKADEX_ASSET.symbol && "disabled"
                                          }>
                                          {tc("withdraw")}
                                        </S.WithdrawLink>
                                      </Link>
                                    </S.Actions>
                                  </Table.Cell>
                                </Table.Row>
                              );
                            })}
                          </Table.Body>
                        </Table>
                      ) : (
                        <ResultFound />
                      )}
                    </S.Content>
                  </>
                ) : (
                  <EmptyMyAccount balances hasLimit {...connectWalletData} />
                )}
              </S.Container>
            </S.ContainerMain>
            <Footer />
          </S.Wrapper>
        </S.Flex>
      </S.Main>
    </>
  );
};
