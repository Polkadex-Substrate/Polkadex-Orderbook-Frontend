import dynamic from "next/dynamic";
import {
  RecentTradesProvider,
  OrdersProvider,
  OrderBookProvider,
  BalancesProvider,
} from "@orderbook/core/providers";
import { serverSideTranslations } from "next-i18next/serverSideTranslations";
import { GetServerSideProps } from "next";

import LoadingScreen from "@/ui/molecules/LoadingScreen";
import { useDisabledPages } from "@/hooks";

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
  const { disabled } = useDisabledPages();

  if (disabled) return <div />;

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

export const getServerSideProps: GetServerSideProps = async ({ locale }) => ({
  props: {
    ...(await serverSideTranslations(locale as string, [
      "common",
      "trading",
      "organisms",
      "molecules",
    ])),
  },
});
