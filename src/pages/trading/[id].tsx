import { AssetsProvider } from "@polkadex/orderbook/providers/public/assetsProvider/provider";
import dynamic from "next/dynamic";

const TradingTemplate = dynamic(
  () => import("@polkadex/orderbook-ui/templates/Trading").then((mod) => mod.Trading),
  {
    ssr: false,
  }
);

const Trading = () => (
  <AssetsProvider>
    <TradingTemplate />
  </AssetsProvider>
);
export default Trading;
