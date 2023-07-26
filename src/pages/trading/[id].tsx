import dynamic from "next/dynamic";

import { RecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
import { OrderBookProvider } from "@polkadex/orderbook/providers/public/orderBook";
import { OrdersProvider } from "@polkadex/orderbook/providers/user/orders";
import {
  AssetsProvider,
  BalancesProvider,
  MarketsProvider,
} from "@polkadex/orderbook/providers";
import { useDisabledPages } from "@polkadex/orderbook-hooks";

const TradingTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Trading").then((mod) => mod.Trading),
  {
    ssr: false,
  }
);

const Trading = () => {
  const { disabled } = useDisabledPages();
  if (disabled) return <div />;

  return (
    <MarketsProvider>
      <BalancesProvider>
        <OrderBookProvider>
          <OrdersProvider>
            <RecentTradesProvider>
              <TradingTemplate />
            </RecentTradesProvider>
          </OrdersProvider>
        </OrderBookProvider>
      </BalancesProvider>
    </MarketsProvider>
  );
};

export default Trading;
