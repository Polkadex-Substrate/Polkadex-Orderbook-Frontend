import Head from "next/head";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import * as S from "./styles";

import { Checkbox, Icon, Table } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
import { selectHasUser, selectUserFetching } from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { useFunds } from "@polkadex/orderbook/v2/hooks";
import { EmptyData } from "@polkadex/orderbook/v2/ui/molecules";

export const AssetsTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();
  const user = useReduxSelector(selectHasUser);
  const isLoading = useReduxSelector(selectUserFetching);

  const { searchState, handleChange, balances } = useFunds();

  useEffect(() => {
    if (!isLoading && !user) router.push("/signIn");
  }, [isLoading, user, router]);

  if (!user) return <div />;

  return (
    <>
      <Head>
        <title>Assets | Polkadex Orderbook</title>
        <meta name="description" content="A new era in DeFi" />
      </Head>
      <S.Main>
        <Menu handleChange={() => setState(!state)} />
        <S.Wrapper>
          <S.Title type="button" onClick={() => router.back()}>
            <div>
              <Icons.SingleArrowLeft />
            </div>
            Overview
          </S.Title>
          <S.Container>
            <S.Header>
              <h1>Assets</h1>
              <S.HeaderWrapper>
                <S.Search>
                  <Icon name="Search" size="extraSmall" stroke="text" />
                  <input
                    type="text"
                    placeholder="Search.."
                    onChange={handleChange}
                    value={searchState}
                  />
                </S.Search>
                <Checkbox name="hide">Hide small balances</Checkbox>
              </S.HeaderWrapper>
            </S.Header>
            {balances?.length ? (
              <S.Content>
                <Table aria-label="Polkadex assets" style={{ width: "100%" }}>
                  <Table.Header fill="none">
                    <Table.Column>
                      <S.Column>Name</S.Column>
                    </Table.Column>
                    <Table.Column>
                      <S.Column>Locked</S.Column>
                    </Table.Column>
                    <Table.Column>
                      <S.Column>Available</S.Column>
                    </Table.Column>
                    <Table.Column>
                      <S.Column>In Orders</S.Column>
                    </Table.Column>
                    <Table.Column>
                      <S.Column>Actions</S.Column>
                    </Table.Column>
                  </Table.Header>
                  <Table.Body striped>
                    {balances.map((item) => (
                      <Table.Row key={item.assetId}>
                        <Table.Cell>
                          <S.CellFlex>
                            <S.TokenIcon>
                              <Icon isToken name={item.symbol} size="extraSmall" />
                            </S.TokenIcon>
                            <S.Cell>
                              <span>
                                {item.name} <small>{item.name}</small>
                              </span>
                            </S.Cell>
                          </S.CellFlex>
                        </Table.Cell>
                        <Table.Cell>
                          <S.Cell>
                            <span>
                              {Number(item.reserved_balance).toFixed(8)} <small>$0.00</small>
                            </span>
                          </S.Cell>
                        </Table.Cell>
                        <Table.Cell>
                          <S.Cell>
                            <span>
                              {Number(item.free_balance).toFixed(8)} <small>$0.00</small>
                            </span>
                          </S.Cell>
                        </Table.Cell>
                        <Table.Cell>
                          <S.Cell>
                            <span>
                              {Number(item.reserved_balance).toFixed(8)} <small>$0.00</small>
                            </span>
                          </S.Cell>
                        </Table.Cell>
                        <Table.Cell>
                          <S.Actions>
                            <Link href={`/deposit/${item.assetId}`}>Deposit</Link>
                            <Link href={`/withdraw/${item.assetId}`}>Withdraw</Link>
                          </S.Actions>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </S.Content>
            ) : (
              <EmptyData title="Empty data" />
            )}
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
