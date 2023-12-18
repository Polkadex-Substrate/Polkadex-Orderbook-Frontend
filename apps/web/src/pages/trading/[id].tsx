import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

import LoadingScreen from "@/ui/molecules/LoadingScreen";
import { getServerSidePropsWithTranslations } from "@/utils";

const TradingTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Trading").then(
      (mod) => mod.Trading
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);

const OrdersProvider = dynamic(
  () => import("@orderbook/core/providers").then((mod) => mod.OrdersProvider),
  {
    ssr: false,
  }
);

const Trading = () => {
  return (
    <OrdersProvider>
      <TradingTemplate />
    </OrdersProvider>
  );
};

export default Trading;

const translations = ["common", "trading", "organisms", "molecules"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
