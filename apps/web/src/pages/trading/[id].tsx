import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { OrdersProvider, OrderBookProvider } from "@orderbook/core/providers";
import { GetServerSideProps } from "next";
import { useMarketsData } from "@orderbook/core/hooks";

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
  const router = useRouter();
  const { id } = router?.query;

  const { currentMarket } = useMarketsData(id as string);

  return (
    //   <OrderBookProvider>
    <OrdersProvider>
      <TradingTemplate market={currentMarket?.id as string} />
    </OrdersProvider>
    //   </OrderBookProvider>
  );
};

export default Trading;

const translations = ["common", "trading", "organisms", "molecules"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
