import dynamic from "next/dynamic";

import { RecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
import { OrderBookProvider } from "@polkadex/orderbook/providers/public/orderBook";
import { OrdersProvider } from "@polkadex/orderbook/providers/user/orders";
import { BalancesProvider } from "@polkadex/orderbook/providers";

const TradingTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Trading").then((mod) => mod.Trading),
  {
    ssr: false,
  }
);

const Trading = () => (
  <BalancesProvider>
    <OrderBookProvider>
      <OrdersProvider>
        <RecentTradesProvider>
          <TradingTemplate />
        </RecentTradesProvider>
      </OrdersProvider>
    </OrderBookProvider>
  </BalancesProvider>
);
export default Trading;
