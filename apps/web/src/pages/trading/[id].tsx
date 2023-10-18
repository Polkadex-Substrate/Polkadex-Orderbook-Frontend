import dynamic from "next/dynamic";
import {
  RecentTradesProvider,
  OrdersProvider,
  OrderBookProvider,
  BalancesProvider,
} from "@orderbook/core/providers";
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

const Trading = () => {
  return (
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
};

export default Trading;

const translations = ["common", "trading", "organisms", "molecules"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
