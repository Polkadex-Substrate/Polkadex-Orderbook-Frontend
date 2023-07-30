import Head from "next/head";
import Link from "next/link";
import { useMemo, useState } from "react";
import { useTranslation } from "react-i18next";

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
import { toCapitalize } from "@polkadex/web-helpers";
import { useProfile } from "@polkadex/orderbook/providers/user/profile";
import { useAssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/useAssetsProvider";
import { useBalancesProvider } from "@polkadex/orderbook/providers/user/balancesProvider/useBalancesProvider";

export const BalancesTemplate = () => {
  const { t } = useTranslation("balances");
  const { t: tc } = useTranslation("common");

  const [filters, setFilters] = useState({ search: "", hideZero: false });

  const { list } = useAssetsProvider();
  const { balances: userBalances } = useBalancesProvider();
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

        return matchesNameOrTicker && !hasZeroAmount && e.symbol !== "CUSDT";
      }),
    [filters.search, list, userBalances, filters.hideZero]
  );
  allAssets.sort((a, b) => {
    const nameA = a.name.toUpperCase();
    const nameB = b.name.toUpperCase();

    if (nameA < nameB) {
      return -1;
    }
    if (nameA > nameB) {
      return 1;
    }
    return 0;
  });

  const connectWalletData = {
    image: "emptyWallet",
    title: tc("connectTradingAccount.title"),
    description: tc("connectTradingAccount.description"),
    primaryLink: "/createAccount",
    primaryLinkTitle: tc("connectTradingAccount.primaryLinkTitle"),
    secondaryLink: "/settings",
    secondaryLinkTitle: tc("connectTradingAccount.secondaryLinkTitle"),
  };

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
                <h1>{t("heading")}</h1>
              </S.Title>
              <S.Container>
                {userHasSelectedAccount ? (
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
                              <S.Column>{t("available")}</S.Column>
                            </Table.Column>
                            <Table.Column>
                              <S.Column>{t("locked")}</S.Column>
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
                                          {toCapitalize(item.name)}{" "}
                                          <small> {item.symbol}</small>
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
                                    <S.Cell>
                                      <span>
                                        {Number(balance?.reserved_balance || 0).toFixed(8)}{" "}
                                      </span>
                                    </S.Cell>
                                  </Table.Cell>
                                  <Table.Cell>
                                    <S.Cell>
                                      <span>
                                        {Number(balance?.reserved_balance || 0).toFixed(8)}{" "}
                                      </span>
                                    </S.Cell>
                                  </Table.Cell>
                                  <Table.Cell>
                                    {item.symbol !== "PDEX" && (
                                      <S.Actions>
                                        <Link href={`/deposit/${item.symbol}`}>
                                          <S.DepositLink>{tc("deposit")}</S.DepositLink>
                                        </Link>
                                        <Link href={`/withdraw/${item.symbol}`}>
                                          <S.WithdrawLink>{tc("withdraw")}</S.WithdrawLink>
                                        </Link>
                                      </S.Actions>
                                    )}
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
