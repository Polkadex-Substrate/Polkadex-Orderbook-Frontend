import { useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "next-i18next";
import { useFunds } from "@orderbook/core/hooks";
import {
  EmptyData,
  Icon,
  Table,
  Tooltip,
  TooltipContent,
  TooltipHeader,
} from "@polkadex/orderbook-ui/molecules";
import {
  toCapitalize,
  filterBlockedAssets,
  getChainFromTicker,
} from "@orderbook/core/helpers";
import { BalanceFormatter } from "@orderbook/format";
import { useRouter } from "next/router";

import { TransactionsSkeleton } from "../Transactions";

import * as S from "./styles";

import { Icons } from "@/ui/atoms";

export const Funds = ({ onHideFilters }) => {
  const formatter = new BalanceFormatter();
  const { locale } = useRouter();
  const { balances, isLoading } = useFunds();
  const allBalances = filterBlockedAssets(balances);
  useEffect(() => {
    onHideFilters(false);
    return () => onHideFilters(true);
  }, [onHideFilters]);

  const { t: translation } = useTranslation("organisms");
  const t = (key: string) => translation(`funds.${key}`);
  const { t: tc } = useTranslation("common");

  if (isLoading) return <TransactionsSkeleton />;

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
              <S.Column>{t("reserved")}</S.Column>
            </Table.Column>
            <Table.Column>
              <S.Column>{t("actions")}</S.Column>
            </Table.Column>
          </Table.Header>
          <Table.Body striped border="squared">
            {allBalances.map((item) => {
              const chainName = getChainFromTicker(item.symbol);
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
                        {formatter.toHuman(
                          Number(item?.free_balance),
                          4,
                          locale || "en"
                        )}
                      </span>
                    </S.Cell>
                  </Table.Cell>
                  <Table.Cell>
                    <S.Cell>
                      <span>
                        {formatter.toHuman(
                          Number(item?.reserved_balance),
                          4,
                          locale || "en"
                        )}
                      </span>
                    </S.Cell>
                  </Table.Cell>
                  <Table.Cell>
                    <S.Actions>
                      <Tooltip>
                        <TooltipHeader>
                          <Link
                            href={{
                              pathname: "https://thea.polkadex.trade/",
                              query: chainName && {
                                chain: encodeURIComponent(chainName),
                              },
                            }}
                            target="_blank"
                          >
                            <S.DepositLink>{tc("deposit")}</S.DepositLink>
                          </Link>
                        </TooltipHeader>
                        <TooltipContent
                          style={{ transform: "translateY(-0.8rem)" }}
                          background="text"
                        >
                          <S.TooltipMessage>
                            {tc("externalLink")}
                          </S.TooltipMessage>
                        </TooltipContent>
                      </Tooltip>

                      <Tooltip>
                        <TooltipHeader>
                          <Link
                            href={{
                              pathname: "https://thea.polkadex.trade/withdraw",
                              query: chainName && {
                                chain: encodeURIComponent(chainName),
                              },
                            }}
                            target="_blank"
                          >
                            <S.WithdrawLink>{tc("withdraw")}</S.WithdrawLink>
                          </Link>
                        </TooltipHeader>
                        <TooltipContent
                          style={{ transform: "translateY(-0.8rem)" }}
                          background="text"
                        >
                          <S.TooltipMessage>
                            {tc("externalLink")}
                          </S.TooltipMessage>
                        </TooltipContent>
                      </Tooltip>

                      <Link href={`/transfer?token=${item.symbol}`}>
                        <S.TransferLink>
                          <S.Icon>
                            <Icons.Trading />
                          </S.Icon>
                          {tc("transfer")}
                        </S.TransferLink>
                      </Link>
                    </S.Actions>
                  </Table.Cell>
                </Table.Row>
              );
            })}
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
