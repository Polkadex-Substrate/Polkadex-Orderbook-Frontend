import dynamic from "next/dynamic";
import { GetServerSideProps } from "next";

import { getServerSidePropsWithTranslations } from "@/utils";
const LandingTemplate = dynamic(
  () =>
    import("@polkadex/orderbook-ui/templates/Landing").then(
      (mod) => mod.LandingTemplate
    ),
  {
    ssr: false,
  }
);
const Home = () => <LandingTemplate />;

export default Home;

const translations = ["molecules", "organisms", "common", "landing"];
export const getServerSideProps: GetServerSideProps =
  getServerSidePropsWithTranslations(translations);
