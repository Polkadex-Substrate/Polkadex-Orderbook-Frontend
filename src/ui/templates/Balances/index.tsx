import Head from "next/head";
import { useMemo, useState } from "react";
import Link from "next/link";

import * as S from "./styles";

import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import {
  Checkbox,
  EmptyMyAccount,
  Footer,
  Icon,
  Search,
  Table,
} from "@polkadex/orderbook-ui/molecules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { selectAllAssets } from "@polkadex/orderbook/modules/public/assets";
import { selectUserBalance, selectHasUsingAccount } from "@polkadex/orderbook-modules";
import { toCapitalize } from "@polkadex/web-helpers";

export const BalancesTemplate = () => {
  const [state, setState] = useState(false);
  const assets = useReduxSelector(selectAllAssets);
  const balances = useReduxSelector(selectUserBalance);

  const userBalances = useMemo(
    () => balances?.filter((value) => assets.some((item) => item.asset_id === value.asset_id)),
    [assets, balances]
  );
  const userHasSelectedAccount = useReduxSelector(selectHasUsingAccount);

  return (
    <>
      <Head>
        <title>Balances | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.ContainerMain>
            <S.Title>
              <h1>Balances.</h1>
            </S.Title>
            <S.Container>
              {userHasSelectedAccount ? (
                <>
                  <S.Header>
                    <h2>Overview</h2>
                    <S.HeaderBox>
                      <Search isFull placeholder="Search" />
                      <Checkbox>Hide small balances</Checkbox>
                    </S.HeaderBox>
                  </S.Header>
                  <S.Content>
                    <Table aria-label="Polkadex assets" style={{ width: "100%" }}>
                      <Table.Header fill="none">
                        <Table.Column>
                          <S.Column style={{ paddingLeft: 10 }}>Name</S.Column>
                        </Table.Column>
                        <Table.Column>
                          <S.Column>Available</S.Column>
                        </Table.Column>
                        <Table.Column>
                          <S.Column>Locked</S.Column>
                        </Table.Column>
                        <Table.Column>
                          <S.Column>In Orders</S.Column>
                        </Table.Column>
                        <Table.Column>
                          <S.Column>Actions</S.Column>
                        </Table.Column>
                      </Table.Header>
                      <Table.Body striped>
                        {assets.map((item) => {
                          const balance = userBalances?.find(
                            (value) => value.asset_id === item.asset_id
                          );
                          return (
                            <Table.Row key={item.asset_id}>
                              <Table.Cell>
                                <S.CellFlex>
                                  <S.TokenIcon>
                                    <Icon isToken name={item.symbol} size="extraSmall" />
                                  </S.TokenIcon>
                                  <S.Cell>
                                    <span>
                                      {toCapitalize(item.name)} <small> {item.symbol}</small>
                                    </span>
                                  </S.Cell>
                                </S.CellFlex>
                              </Table.Cell>
                              <Table.Cell>
                                <S.Cell>
                                  <span>{Number(balance?.free_balance || 0).toFixed(8)} </span>
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
                                <S.Actions>
                                  <Link href={`/deposit/${item.symbol}`}>
                                    <S.DepositLink>Deposit</S.DepositLink>
                                  </Link>
                                  <Link href={`/withdraw/${item.symbol}`}>
                                    <S.WithdrawLink>Withdraw</S.WithdrawLink>
                                  </Link>
                                </S.Actions>
                              </Table.Cell>
                            </Table.Row>
                          );
                        })}
                      </Table.Body>
                    </Table>
                  </S.Content>
                </>
              ) : (
                <EmptyMyAccount hasLimit {...connectWalletData} />
              )}
            </S.Container>
          </S.ContainerMain>
          <Footer />
        </S.Wrapper>
      </S.Main>
    </>
  );
};

const connectWalletData = {
  image: "emptyWallet",
  title: "Connect your Trading Account",
  description: "Import your existing wallet, or create a new wallet",
  primaryLink: "/createAccount",
  primaryLinkTitle: "Create Account",
  secondaryLink: "/settings",
  secondaryLinkTitle: "Select Account",
};
