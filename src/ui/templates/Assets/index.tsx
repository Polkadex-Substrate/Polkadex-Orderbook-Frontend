import Head from "next/head";
import { useState } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

import * as S from "./styles";

import { Checkbox, Icon, Table } from "@polkadex/orderbook-ui/molecules";
import { Icons } from "@polkadex/orderbook-ui/atoms";
import Menu from "@polkadex/orderbook/v3/ui/organisms/Menu";
const balances = [
  {
    id: 1,
    name: "Polkadot",
    ticker: "DOT",
    locked: 0.0,
    available: 0.0,
    inOrders: 0.0,
  },
  {
    id: 2,
    name: "Polkadex",
    ticker: "PDEX",
    locked: 0.0,
    available: 0.0,
    inOrders: 0.0,
  },
  {
    id: 3,
    name: "Ethereum",
    ticker: "ETH",
    locked: 0.0,
    available: 0.0,
    inOrders: 0.0,
  },
  {
    id: 4,
    name: "Uniswap",
    ticker: "UNI",
    locked: 0.0,
    available: 0.0,
    inOrders: 0.0,
  },
];
export const AssetsTemplate = () => {
  const [state, setState] = useState(false);

  const router = useRouter();

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
                    <Table.Row key={item.id}>
                      <Table.Cell>
                        <S.CellFlex>
                          <S.TokenIcon>
                            <Icon isToken name={item.ticker} size="extraSmall" />
                          </S.TokenIcon>
                          <S.Cell>
                            <span>
                              {item.name} <small>{item.ticker}</small>
                            </span>
                          </S.Cell>
                        </S.CellFlex>
                      </Table.Cell>
                      <Table.Cell>
                        <S.Cell>
                          <span>
                            {item.locked.toFixed(8)} <small>$0.00</small>
                          </span>
                        </S.Cell>
                      </Table.Cell>
                      <Table.Cell>
                        <S.Cell>
                          <span>
                            {item.available.toFixed(8)} <small>$0.00</small>
                          </span>
                        </S.Cell>
                      </Table.Cell>
                      <Table.Cell>
                        <S.Cell>
                          <span>
                            {item.inOrders.toFixed(8)} <small>$0.00</small>
                          </span>
                        </S.Cell>
                      </Table.Cell>
                      <Table.Cell>
                        <S.Actions>
                          <Link href={`/deposit/${item.id}`}>Deposit</Link>
                          <Link href={`/withdraw/${item.id}`}>Withdraw</Link>
                        </S.Actions>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
            </S.Content>
          </S.Container>
        </S.Wrapper>
      </S.Main>
    </>
  );
};
