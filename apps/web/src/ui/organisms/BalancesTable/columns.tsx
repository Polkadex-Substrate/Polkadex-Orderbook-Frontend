import { createColumnHelper } from "@tanstack/react-table";
import Link from "next/link";
import { AssetsProps } from "@orderbook/core/hooks";
import classNames from "classnames";
import { getChainFromTicker } from "@orderbook/core/helpers";

import * as S from "./styles";

import { Icons, Tokens } from "@/ui/atoms";
import { Tooltip, TooltipContent, TooltipHeader } from "@/ui/molecules";

const columnHelper = createColumnHelper<AssetsProps>();
export const columns = (headers: string[]) => [
  columnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      const TokenComponent = Tokens[e.getValue().ticker] || Tokens.UNKN;
      return (
        <S.Token>
          <div>
            <TokenComponent />
          </div>
          <div>
            <span>{e.getValue().ticker}</span>
            <p> {e.getValue().name}</p>
          </div>
        </S.Token>
      );
    },
    header: () => <span>{headers[0]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.onChainBalance, {
    id: "tradingAccount",
    cell: (e) => (
      <S.Box>
        <span>{e.getValue()}</span>
      </S.Box>
    ),
    header: () => <span>{headers[1]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.free_balance, {
    id: "fundingAccount",
    cell: (e) => (
      <S.Box>
        <span>{e.getValue()}</span>
      </S.Box>
    ),
    header: () => <span>{headers[2]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row.inOrdersBalance, {
    id: "inOrders",
    cell: (e) => (
      <S.Box>
        <span>{e.getValue()}</span>
      </S.Box>
    ),
    header: () => <span>{headers[3]}</span>,
    footer: (e) => e.column.id,
  }),
  columnHelper.accessor((row) => row, {
    id: "actions",
    cell: (e) => {
      const tdClassName = {
        deposit: classNames({ depositButton: e.row.index === 0 }),
        withdraw: classNames({ withdrawButton: e.row.index === 0 }),
        transfer: classNames({ transferButton: e.row.index === 0 }),
      };
      const chainName = getChainFromTicker(e.getValue().ticker);

      return (
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
                className={tdClassName.deposit}
              >
                Deposit
              </Link>
            </TooltipHeader>
            <TooltipContent
              style={{ transform: "translateY(-0.8rem)" }}
              background="text"
            >
              <S.TooltipMessage>Extenal link</S.TooltipMessage>
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
                className={tdClassName.withdraw}
              >
                Withdraw
              </Link>
            </TooltipHeader>
            <TooltipContent
              style={{ transform: "translateY(-0.8rem)" }}
              background="text"
            >
              <S.TooltipMessage>Extenal link</S.TooltipMessage>
            </TooltipContent>
          </Tooltip>
          <Link
            href={{
              pathname: "/transfer",
              query: { token: e.getValue().ticker },
            }}
            className={tdClassName.transfer}
          >
            <S.Icon>
              <Icons.Trading />
            </S.Icon>
            Transfer
          </Link>
        </S.Actions>
      );
    },
    header: () => <span>{headers[4]}</span>,
    footer: (e) => e.column.id,
  }),
];
