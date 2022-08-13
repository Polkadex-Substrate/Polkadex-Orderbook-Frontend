import dynamic from "next/dynamic";

const TradingTemplate = dynamic(
  () => import("@orderbook/v3/ui/templates/Trading").then((mod) => mod.Trading),
  {
    ssr: false,
  }
);

const Trading = () => <TradingTemplate />;
export default Trading;
