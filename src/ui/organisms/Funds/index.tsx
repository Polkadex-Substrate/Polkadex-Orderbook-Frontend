import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";

import * as S from "./styles";

import { useFunds } from "@polkadex/orderbook/hooks";
import { EmptyData, Icon, Table } from "@polkadex/orderbook-ui/molecules";
import { toCapitalize } from "@polkadex/web-helpers";
import { filterAssets } from "@polkadex/orderbook/helpers/filterAssets";

export const Funds = ({ onHideFilters }) => {
  const { balances } = useFunds();
  const allBalances = filterAssets(balances);
  useEffect(() => {
    onHideFilters(false);
    return () => onHideFilters(true);
  }, [onHideFilters]);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`funds.${key}`);
  const { t: tc } = useTranslation("common");

  return (
    <S.Wrapper>
      {allBalances.length ? (
        <Table aria-label="Polkadex assets" style={{ width: "100%" }}>
          <Table.Header fill="none">
            <Table.Column>
              <S.Column style={{ paddingLeft: 10 }}>{t("token")}</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>{t("available")}</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>{t("locked")}</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>{t("reserved")}</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>{t("actions")}</S.Column>
            </Table.Column>
          </Table.Header>
          <Table.Body striped>
            {allBalances.map((item) => (
              <Table.Row key={item.assetId}>
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
                      <S.DepositLink>{tc("deposit")}</S.DepositLink>
                    </Link>
                    <Link href={`/withdraw/${item.symbol}`}>
                      <S.WithdrawLink>{tc("withdraw")}</S.WithdrawLink>
                    </Link>
                  </S.Actions>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      ) : (
        <S.EmptyWrapper>
          <EmptyData title="You do not have any funds in your trading account" />
        </S.EmptyWrapper>
      )}
    </S.Wrapper>
  );
};
