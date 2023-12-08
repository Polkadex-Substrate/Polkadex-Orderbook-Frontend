import dynamic from "next/dynamic";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const BalancesTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Balances").then(
      (mod) => mod.BalancesTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const Balances = () => {
  return <BalancesTemplate />;
};

export default Balances;

const translations = ["molecules", "organisms", "common", "balances"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
