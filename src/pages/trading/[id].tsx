import dynamic from "next/dynamic";

import { RecentTradesProvider } from "@polkadex/orderbook/providers/public/recentTradesProvider";
const TradingTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Trading").then((mod) => mod.Trading),
  {
    ssr: false,
  }
);

const Trading = () => (
  <RecentTradesProvider>
    <TradingTemplate />
  </RecentTradesProvider>
);
export default Trading;
