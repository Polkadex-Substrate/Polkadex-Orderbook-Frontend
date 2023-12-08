import dynamic from "next/dynamic";
import LoadingScreen from "@polkadex/orderbook-ui/molecules/LoadingScreen";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";

const WalletsTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Wallets").then(
      (mod) => mod.WalletsTemplate
    ),
  {
    ssr: false,
    loading: () => <LoadingScreen />,
  }
);
const Wallets = () => {
  return <WalletsTemplate />;
};

export default Wallets;

const translations = ["molecules", "organisms", "common", "settings"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
