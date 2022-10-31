import { useEffect } from "react";
import Link from "next/link";

import * as S from "./styles";

import { useFunds } from "@polkadex/orderbook/hooks";
import { EmptyData, Icon, Table } from "@polkadex/orderbook-ui/molecules";
import { toCapitalize } from "@polkadex/web-helpers";

export const Funds = ({ onHideFilters }) => {
  const { balances } = useFunds();

  useEffect(() => {
    onHideFilters(false);
    return () => onHideFilters(true);
  }, [onHideFilters]);

  return (
    <S.Wrapper>
      {balances.length ? (
        <Table aria-label="Polkadex assets" style={{ width: "100%" }}>
          <Table.Header fill="none">
            <Table.Column>
              <S.Column style={{ paddingLeft: 10 }}>Token</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>Available</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>Locked</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>Reserved</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>Actions</S.Column>
            </Table.Column>
          </Table.Header>
          <Table.Body striped>
            {balances.map((item) => (
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
                    <span>{Number(item?.free_balance || 0).toFixed(8)} </span>
                  </S.Cell>
                </Table.Cell>
                <Table.Cell>
                  <S.Cell>
                    <span>{Number(item?.reserved_balance || 0).toFixed(8)} </span>
                  </S.Cell>
                </Table.Cell>
                <Table.Cell>
                  <S.Cell>
                    <span>{Number(item?.reserved_balance || 0).toFixed(8)} </span>
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
            ))}
          </Table.Body>
        </Table>
      ) : (
        <S.EmptyWrapper>
          <EmptyData />
        </S.EmptyWrapper>
      )}
    </S.Wrapper>
  );
};
