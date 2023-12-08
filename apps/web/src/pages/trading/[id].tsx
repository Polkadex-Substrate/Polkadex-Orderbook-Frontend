import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import { OrdersProvider } from "@orderbook/core/providers";
import { GetServerSideProps } from "next";
import { useMarkets } from "@orderbook/core/hooks";
import { getCurrentMarket } from "@orderbook/core/helpers";

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

  const { list } = useMarkets();
  const currentMarket = getCurrentMarket(list, id as string);

  return (
    <OrdersProvider>
      <TradingTemplate market={currentMarket?.id as string} />
    </OrdersProvider>
  );
};

export default Trading;

const translations = ["common", "trading", "organisms", "molecules"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
