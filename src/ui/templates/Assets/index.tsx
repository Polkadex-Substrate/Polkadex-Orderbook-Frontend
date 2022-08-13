import Head from "next/head";
import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import dynamic from "next/dynamic";

import * as S from "./styles";

import { Checkbox, Icon, Table } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import {
  selectHasUser,
  selectUserBalance,
  selectUserFetching,
} from "@polkadex/orderbook-modules";
import { useReduxSelector } from "@polkadex/orderbook-hooks";
import { EmptyData } from "@polkadex/orderbook/v2/ui/molecules";
import { selectAllAssets } from "@polkadex/orderbook/modules/public/assets";
const Menu = dynamic(() => import("@polkadex/orderbook/v3/ui/organisms/Menu"), {
  ssr: false,
});
export const AssetsTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();
  const user = useReduxSelector(selectHasUser);
  const isLoading = useReduxSelector(selectUserFetching);

  const assets = useReduxSelector(selectAllAssets);
  const balances = useReduxSelector(selectUserBalance);

  const userBalances = useMemo(
    () => balances.filter((value) => assets.some((item) => item.assetId === value.assetId)),
    [assets, balances]
  );

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
                  <input type="text" placeholder="Search.." />
                </S.Search>
                <Checkbox name="hide">Hide small balances</Checkbox>
              </S.HeaderWrapper>
            </S.Header>
            {assets?.length ? (
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
                    {assets.map((item) => {
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
                                  {item.name} <small>{item.name}</small>
                                </span>
                              </S.Cell>
                            </S.CellFlex>
                          </Table.Cell>
                          <Table.Cell>
                            <S.Cell>
                              <span>
                                {Number(balance?.reserved_balance || 0).toFixed(8)}{" "}
                                <small>$0.00</small>
                              </span>
                            </S.Cell>
                          </Table.Cell>
                          <Table.Cell>
                            <S.Cell>
                              <span>
                                {Number(balance?.free_balance || 0).toFixed(8)}{" "}
                                <small>$0.00</small>
                              </span>
                            </S.Cell>
                          </Table.Cell>
                          <Table.Cell>
                            <S.Cell>
                              <span>
                                {Number(balance?.reserved_balance || 0).toFixed(8)}{" "}
                                <small>$0.00</small>
                              </span>
                            </S.Cell>
                          </Table.Cell>
                          <Table.Cell>
                            <S.Actions>
                              <Link href={`/deposit/${item.symbol}`}>Deposit</Link>
                              <Link href={`/withdraw/${item.symbol}`}>Withdraw</Link>
                            </S.Actions>
                          </Table.Cell>
                        </Table.Row>
                      );
                    })}
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
