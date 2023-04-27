import dynamic from "next/dynamic";

import { RecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
import { OrderBookProvider } from "@polkadex/orderbook/providers/public/orderBook";
import { MarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/provider";

const TradingTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Trading").then((mod) => mod.Trading),
  {
    ssr: false,
  }
);

const Trading = () => (
  <OrderBookProvider>
    <MarketsProvider>
      <OrderBookProvider>
        <RecentTradesProvider>
          <TradingTemplate />
        </RecentTradesProvider>
      </OrderBookProvider>
    </MarketsProvider>
  </OrderBookProvider>
);
export default Trading;
