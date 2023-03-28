import { MarketsProvider } from "@polkadex/orderbook/providers/public/marketsProvider/provider";
import { AssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/provider";
import dynamic from "next/dynamic";
import { toast } from "react-toastify";
const TradingTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Trading").then((mod) => mod.Trading),
  {
    ssr: false,
  }
);

const Trading = () => (
  <MarketsProvider>
    <TradingTemplate />
  </MarketsProvider>
);
export default Trading;
