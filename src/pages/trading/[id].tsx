import dynamic from "next/dynamic";

import { RecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
import { OrderBookProvider } from "@polkadex/orderbook/providers/public/orderBook";

const TradingTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Trading").then((mod) => mod.Trading),
  {
    ssr: false,
  }
);

const Trading = () => (
  <OrderBookProvider>
    <OrderBookProvider>
      <RecentTradesProvider>
        <TradingTemplate />
      </RecentTradesProvider>
    </OrderBookProvider>
  </OrderBookProvider>
);
export default Trading;
