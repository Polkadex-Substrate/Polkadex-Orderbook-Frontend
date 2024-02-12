import { createColumnHelper } from "@tanstack/react-table";
import { Typography, Token } from "@polkadex/ux";
import { AssetsProps } from "@orderbook/core/hooks";
import { getChainFromTicker } from "@orderbook/core/helpers";

import { ActionsCard } from "@/components/balances/Table/actionsCard";
import { AmountCard } from "@/components/ui/ReadyToUse/amountCard";

const balanceColumnHelper = createColumnHelper<AssetsProps>();

export const columns = [
  balanceColumnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      const ticker = e.getValue().ticker;
      return (
        <div className="flex items-center gap-1">
          <Token
            name={ticker}
            size="sm"
            className="rounded-full border border-secondary"
          />
          <Typography.Text size="xs" className="uppercase">
            {e.getValue().ticker}
          </Typography.Text>
        </div>
      );
    },
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Asset
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  balanceColumnHelper.accessor((row) => row.onChainBalance, {
    id: "fundingAccount",
    cell: (e) => <AmountCard>{e.getValue()}</AmountCard>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Funding account
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  balanceColumnHelper.accessor((row) => row.free_balance, {
    id: "tradingAccount",
    cell: (e) => <AmountCard>{e.getValue()}</AmountCard>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Trading account
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  balanceColumnHelper.accessor((row) => row.inOrdersBalance, {
    id: "inOrders",
    cell: (e) => <AmountCard>{e.getValue()}</AmountCard>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        In orders
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  balanceColumnHelper.accessor((row) => row, {
    id: "actions",
    cell: (e) => {
      const chainName = getChainFromTicker(e.getValue().ticker);
      return (
        <ActionsCard
          withdrawLink={{
            pathname: "https://thea.polkadex.trade/withdraw",
            query: chainName && {
              chain: encodeURIComponent(chainName),
            },
          }}
          depositLink={{
            pathname: "https://thea.polkadex.trade/",
            query: chainName && {
              chain: encodeURIComponent(chainName),
            },
          }}
          tradeLink={`/trading/${e.getValue().ticker}`}
          transferLink={{
            pathname: "/transfer",
            query: { token: e.getValue().ticker },
          }}
        />
      );
    },
    header: () => <></>,
    footer: (e) => e.column.id,
  }),
];
