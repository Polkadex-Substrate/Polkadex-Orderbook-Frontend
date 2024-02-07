import { Order, Trade } from "@orderbook/core/utils/orderbookService/types";
import { createColumnHelper } from "@tanstack/react-table";
import classNames from "classnames";
import {
  ArrowLeftCircleIcon,
  ArrowRightCircleIcon,
} from "@heroicons/react/24/solid";
import { Button, truncateString, Tokens, Typography } from "@polkadex/ux";
import { OrderCancellation } from "@orderbook/core/providers/user/orders";
import { AssetsProps } from "@orderbook/core/hooks";
import { getChainFromTicker } from "@orderbook/core/helpers";

import { ActionsCard } from "@/components/balances/Table/actionsCard";
import { TokenCard } from "@/components/ui/ReadyToUse";
import { AmountCard } from "@/components/ui/ReadyToUse/amountCard";

const openOrderColumnHelper = createColumnHelper<Order>();
const orderHistoryColumnHelper = createColumnHelper<Order>();
const tradeHistoryColumnHelper = createColumnHelper<Trade>();
const balanceColumnHelper = createColumnHelper<AssetsProps>();

export const openOrderColumns = ({
  onCancelOrder,
}: {
  onCancelOrder: (value: OrderCancellation) => void;
}) => [
  openOrderColumnHelper.accessor((row) => row, {
    id: "pair",
    cell: (e) => {
      const isSell = e.getValue().side === "Ask";
      const Icon = isSell ? ArrowRightCircleIcon : ArrowLeftCircleIcon;
      return (
        <span className="flex items-center gap-1">
          <Icon
            className={classNames(
              "w-5 h-5",
              isSell ? "text-primary-base" : "text-success-base"
            )}
          />
          {e.getValue().market.name}
        </span>
      );
    },
    header: () => <span>Pair</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => {
      return <span>{e.getValue().timestamp.toLocaleString()}</span>;
    },
    header: () => <span>Date</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "type",
    cell: (e) => {
      return <span>{e.getValue().type}</span>;
    },
    header: () => <span>Type</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      return <span>{e.getValue().price}</span>;
    },
    header: () => <span>Price</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "total",
    cell: (e) => {
      return <span>{e.getValue().quantity}</span>;
    },
    header: () => <span>Total</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "filled",
    cell: (e) => {
      return <span>{e.getValue().filledQuantity}</span>;
    },
    header: () => <span>Filled</span>,
    footer: (e) => e.column.id,
  }),
  openOrderColumnHelper.accessor((row) => row, {
    id: "cancel order",
    cell: (e) => {
      return (
        <Button.Solid
          className="py-0.5 h-auto"
          size="xs"
          onClick={() =>
            onCancelOrder({
              orderId: e.getValue().orderId,
              base: e.getValue().market.baseAsset.id,
              quote: e.getValue().market.quoteAsset.id,
            })
          }
        >
          Cancel Order
        </Button.Solid>
      );
    },
    header: () => <></>,
    footer: (e) => e.column.id,
  }),
];

export const orderHistoryColumns = () => [
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "id",
    cell: (e) => {
      return <span>{truncateString(e.getValue().orderId, 4)}</span>;
    },
    header: () => <span>Id</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "pair",
    cell: (e) => {
      const isSell = e.getValue().side === "Ask";
      const Icon = isSell ? ArrowRightCircleIcon : ArrowLeftCircleIcon;
      return (
        <span className="flex items-center gap-1">
          <Icon
            className={classNames(
              "w-5 h-5",
              isSell ? "text-primary-base" : "text-success-base"
            )}
          />
          {e.getValue().market.name}
        </span>
      );
    },
    header: () => <span>Pair</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => {
      return <span>{e.getValue().timestamp.toLocaleString()}</span>;
    },
    header: () => <span>Date</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "type",
    cell: (e) => {
      return <span>{e.getValue().type}</span>;
    },
    header: () => <span>Type</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "status",
    cell: (e) => {
      return <span>{e.getValue().status}</span>;
    },
    header: () => <span>Status</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      return <span>{e.getValue().price}</span>;
    },
    header: () => <span>Price</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "amount",
    cell: (e) => {
      return <span>{e.getValue().quantity}</span>;
    },
    header: () => <span>Amount</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "filled",
    cell: (e) => {
      return <span>{e.getValue().filledQuantity}</span>;
    },
    header: () => <span>Filled</span>,
    footer: (e) => e.column.id,
  }),
  orderHistoryColumnHelper.accessor((row) => row, {
    id: "fee",
    cell: (e) => {
      return <span>{e.getValue().fee}</span>;
    },
    header: () => <span>Fee</span>,
    footer: (e) => e.column.id,
  }),
];

export const tradeHistoryColumns = () => [
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "id",
    cell: (e) => {
      return <span>{truncateString(e.getValue().tradeId, 4)}</span>;
    },
    header: () => <span>Id</span>,
    footer: (e) => e.column.id,
  }),
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "pair",
    cell: (e) => {
      const isSell = e.getValue().side === "Ask";
      const Icon = isSell ? ArrowRightCircleIcon : ArrowLeftCircleIcon;
      return (
        <span className="flex items-center gap-1">
          <Icon
            className={classNames(
              "w-5 h-5",
              isSell ? "text-primary-base" : "text-success-base"
            )}
          />
          {e.getValue().market.name}
        </span>
      );
    },
    header: () => <span>Pair</span>,
    footer: (e) => e.column.id,
  }),
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "date",
    cell: (e) => {
      return <span>{e.getValue().timestamp.toLocaleString()}</span>;
    },
    header: () => <span>Date</span>,
    footer: (e) => e.column.id,
  }),
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "price",
    cell: (e) => {
      return <span>{e.getValue().price}</span>;
    },
    header: () => <span>Price</span>,
    footer: (e) => e.column.id,
  }),
  tradeHistoryColumnHelper.accessor((row) => row, {
    id: "quantity",
    cell: (e) => {
      return <span>{e.getValue().quantity}</span>;
    },
    header: () => <span>Quantity</span>,
    footer: (e) => e.column.id,
  }),
];

export const balanceColumns = () => [
  balanceColumnHelper.accessor((row) => row, {
    id: "token",
    cell: (e) => {
      return (
        <TokenCard
          tokenName={e.getValue().name}
          ticker={e.getValue().ticker}
          icon={e.getValue().ticker as keyof typeof Tokens}
        />
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
    id: "tradingAccount",
    cell: (e) => <AmountCard>{e.getValue()}</AmountCard>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Trading account
      </Typography.Text>
    ),
    footer: (e) => e.column.id,
  }),
  balanceColumnHelper.accessor((row) => row.free_balance, {
    id: "fundingAccount",
    cell: (e) => <AmountCard>{e.getValue()}</AmountCard>,
    header: () => (
      <Typography.Text size="xs" appearance="primary">
        Funding account
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
